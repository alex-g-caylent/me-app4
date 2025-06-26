// app/articles/_components/FileGroupModal.tsx
"use client";

import React, { useState } from "react";
import { Dialog, Button, Flex, Text, Heading, Box } from "@radix-ui/themes";
import { FileWithUuid } from "@/app/utils/models/article/fileWithUuid";

interface FileGroupModalProps {
  files: FileWithUuid[];
  onGroupFiles: (selectedFiles: FileWithUuid[]) => void;
}

const FileGroupModal = ({ files, onGroupFiles }: FileGroupModalProps) => {
  const [selectedFiles, setSelectedFiles] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);
  
  const handleCheckboxChange = (fileName: string, checked: boolean) => {
    setSelectedFiles(prev => ({
      ...prev,
      [fileName]: checked
    }));
  };
  
  const handleGroupFiles = () => {
    const filesToGroup = files.filter(file => selectedFiles[file.name]);
    if (filesToGroup.length > 1) {
      onGroupFiles(filesToGroup);
      setIsOpen(false);
      setSelectedFiles({});
    }
  };
  
  const selectedCount = Object.values(selectedFiles).filter(Boolean).length;
  
  return (
    <>
      {files.length > 1 && (
        <Button 
          variant="soft" 
          color="blue" 
          onClick={() => setIsOpen(true)}
          style={{ marginTop: '8px' }}
        >
          Group Files
        </Button>
      )}
      
      <Dialog.Root open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setSelectedFiles({});
        }
      }}>
        <Dialog.Content style={{ maxWidth: '450px' }}>
          <Dialog.Title>Group Files</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Select files to group together. Grouped files will share the same metadata.
          </Dialog.Description>
          
          <Flex direction="column" gap="2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {files.map((file) => (
              <Flex key={file.name} align="center" gap="2">
                <input
                  type="checkbox"
                  id={`group-${file.name}`}
                  checked={!!selectedFiles[file.name]}
                  onChange={(e) => handleCheckboxChange(file.name, e.target.checked)}
                  style={{ width: '16px', height: '16px' }}
                />
                <Text as="label" htmlFor={`group-${file.name}`} size="2">
                  {file.name}
                </Text>
              </Flex>
            ))}
          </Flex>
          
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button 
              onClick={handleGroupFiles}
              disabled={selectedCount < 2}
            >
              Group {selectedCount} Files
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default FileGroupModal;
