"use client";

import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getCookie } from "cookies-next";
import { FileWithUuid } from "@/app/utils/models/article/fileWithUuid";

interface Props {
  onFileSelect: (files: FileWithUuid[]) => void;
}

const NewArticleForm = ({
  onFileSelect,
}: Props): JSX.Element => {
  const jwt = getCookie("jwt");
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Filter for PDF files only
    const pdfFiles = acceptedFiles.filter(
      file => file.type === 'application/pdf'
    );

    if (pdfFiles.length > 0) {
      setIsUploading(true);


      const uploadPromises = pdfFiles.map(async (file: File) => {
        try {
          const response = await fetch(process.env.NEXT_PUBLIC_APIBASE + '/articles/upload/generate-url',
            {
              method: 'POST',
              headers: {
                Authorization: "Bearer " + jwt,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                contentFileMimeType: file.type
              }),
            });

          const responseData = await response.json();

          const fileWithUuid: FileWithUuid = { name: file.name, size: file.size, uuid: responseData.uuid }
          
          await fetch(responseData.uploadUrl, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
            },
          });

          return fileWithUuid;
        }
        catch (e) {
          console.error("Failed to upload: ", e);
          return null;
        }

      });

      const resolvedUploads = (await Promise.all(uploadPromises)).filter((upload): upload is FileWithUuid => upload !== null);

      setIsUploading(false);
      onFileSelect(resolvedUploads);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true,
    disabled: isUploading
  });

  return (
    <Card>
      <Flex direction="column" gap="2">
        <Heading size="3">Upload PDF Documents</Heading>
        <Box
          {...getRootProps()}
          style={{
            border: '2px dashed #ccc',
            borderRadius: '4px',
            padding: '20px',
            textAlign: 'center',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDragActive ? '#f0f9ff' : isUploading ? '#f5f5f5' : 'transparent',
            opacity: isUploading ? 0.7 : 1
          }}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <Text>Uploading files...</Text>
          ) : isDragActive ? (
            <Text>Drop PDF files here...</Text>
          ) : (
            <Text>Drag and drop PDF files here, or click to select files</Text>
          )}
        </Box>
      </Flex>
    </Card>
  );
};

export default NewArticleForm;