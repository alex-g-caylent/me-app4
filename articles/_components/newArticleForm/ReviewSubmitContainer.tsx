// app/articles/_components/ReviewSubmitContainer.tsx
"use client";

import React from "react";
import { Flex, Heading, Text, Box } from "@radix-ui/themes";
import { ArticleMetadata } from "@/app/utils/models/article/articleMetadata";
import ReviewSubmitForm from "./ReviewSubmitForm";
import { FileWithUuid } from "@/app/utils/models/article/fileWithUuid";

interface ReviewSubmitContainerProps {
  files: FileWithUuid[];
  fileGroups: {
    id: string;
    files: FileWithUuid[];
  }[];
  formData: Record<string, ArticleMetadata>;
  medias: IdWithName[];
  sources: IdWithName[];
  educationalMethodologies: IdWithName[];
  educationalTools: IdWithName[];
  languages: IdWithName[];
  regions: IdWithName[];
  courses: IdWithName[];
  businessUnits: IdWithName[];
}

const ReviewSubmitContainer = ({
  files,
  fileGroups,
  formData,
  medias,
  sources,
  educationalMethodologies,
  educationalTools,
  languages,
  regions,
  courses,
  businessUnits
}: ReviewSubmitContainerProps) => {
  return (
    <Flex direction="column" gap="4">
      <Heading size="3">Review & Submit</Heading>
      
      {/* Render file groups */}
      {fileGroups.map((group) => (
        <Box key={group.id} style={{ marginBottom: '24px' }}>
          <Heading size="4" mb="2">{group.id}</Heading>
          <Flex direction="column" gap="2">
            {group.files.map((file) => (
              <ReviewSubmitForm
                key={file.name}
                id={file.name}
                file={file}
                formData={formData[group.id]}
                medias={medias}
                sources={sources}
                educationalMethodologies={educationalMethodologies}
                educationalTools={educationalTools}
                languages={languages}
                regions={regions}
                courses={courses}
                businessUnits={businessUnits}
              />
            ))}
          </Flex>
        </Box>
      ))}
      
      {/* Render ungrouped files */}
      {files.length > 0 && (
        <Box style={{ marginBottom: '24px' }}>
          <Heading size="4" mb="2">Ungrouped Files</Heading>
          <Flex direction="column" gap="2">
            {files.map((file) => (
              <ReviewSubmitForm
                key={file.name}
                id={file.name}
                file={file}
                formData={formData[file.name]}
                medias={medias}
                sources={sources}
                educationalMethodologies={educationalMethodologies}
                educationalTools={educationalTools}
                languages={languages}
                regions={regions}
                courses={courses}
                businessUnits={businessUnits}
              />
            ))}
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default ReviewSubmitContainer;