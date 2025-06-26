// app/articles/_components/ReviewSubmitForm.tsx
"use client";

import React, { useState } from "react";
import { Card, Flex, Heading, Text, Box, Grid } from "@radix-ui/themes";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { ArticleMetadata } from "@/app/utils/models/article/articleMetadata";

interface ReviewSubmitFormProps {
  id: string;
  file: File;
  formData: ArticleMetadata;
  medias: IdWithName[];
  sources: IdWithName[];
  educationalMethodologies: IdWithName[];
  educationalTools: IdWithName[];
  languages: IdWithName[];
  regions: IdWithName[];
  courses: IdWithName[];
  businessUnits: IdWithName[];
}

const ReviewSubmitForm = ({ 
  id, 
  file, 
  formData, 
  medias, 
  sources, 
  educationalMethodologies, 
  educationalTools, 
  languages, 
  regions, 
  courses, 
  businessUnits 
}: ReviewSubmitFormProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  // Helper function to map IDs to names
  const getNameFromId = (id: string | undefined, collection: IdWithName[]): string => {
    if (!id) return 'Not provided';
    const item = collection.find(item => item.id === id);
    return item ? item.name : 'Unknown';
  };

  // Get file-specific metadata if available
  const getFileMetadata = () => {
    if (formData.fileMetadata && Array.isArray(formData.fileMetadata)) {
      return formData.fileMetadata.find(fm => fm.fileId === id);
    }
    return null;
  };

  const fileMetadata = getFileMetadata();
  const title = fileMetadata?.title || formData.title || 'Not provided';
  const description = fileMetadata?.description || formData.description || 'Not provided';
  const pageCount = fileMetadata?.pageCount || formData.pageCount || 'Not provided';
  const coverImage = fileMetadata?.coverImage || formData.coverImage || 'Not provided';

  return (
    <Card style={{ overflow: 'hidden' }}>
      <Flex
        justify="between"
        align="center"
        style={{ padding: '12px', cursor: 'pointer' }}
        onClick={toggleExpand}
      >
        <Flex align="center" gap="2">
          {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
          <Heading size="4">{file.name}</Heading>
        </Flex>
        <Text size="2" color="gray">
          {Math.round(file.size / 1024)} KB
        </Text>
      </Flex>

      {isExpanded && (
        <Box style={{ padding: '0 12px 12px 12px' }}>
          <Grid columns="1" gap="4">
            {/* Metadata Section */}
            {formData && (
              <Box>
                <Heading size="2" mb="2">Metadata</Heading>
                <Grid columns="2" gap="4">
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="1" color="gray" mb="1">File Name</Text>
                    <Text>{file.name}</Text>
                  </Box>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="1" color="gray" mb="1">Educational Tool</Text>
                    <Text>{getNameFromId(formData.educationalToolId, educationalTools) || 'Not provided'}</Text>
                  </Box>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="1" color="gray" mb="1">Title</Text>
                    <Text>{title}</Text>
                  </Box>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="1" color="gray" mb="1">Language</Text>
                    <Text>{getNameFromId(formData.languageId, languages) || 'Not provided'}</Text>
                  </Box>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="1" color="gray" mb="1">Page Count</Text>
                    <Text>{pageCount}</Text>
                  </Box>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="1" color="gray" mb="1">Business Units</Text>
                    <Text>{formData.articleBusinessUnits.map((businessUnitId) => getNameFromId(businessUnitId, businessUnits))?.join(', ') || 'Not provided'}</Text>
                  </Box>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="1" color="gray" mb="1">Date Revoked</Text>
                    <Text>{formData.revokedAt || 'Not provided'}</Text>
                  </Box>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="1" color="gray" mb="1">Courses</Text>
                    <Text>{formData.articleCourses.map((courseId) => getNameFromId(courseId, courses))?.join(', ') || 'Not provided'}</Text>
                  </Box>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="1" color="gray" mb="1">Media Type</Text>
                    <Text>{getNameFromId(formData.mediaId, medias) || 'Not provided'}</Text>
                  </Box>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="1" color="gray" mb="1">Regions</Text>
                    <Text>{formData.articleRegions.map((regionId) => getNameFromId(regionId, regions))?.join(', ') || 'Not provided'}</Text>
                  </Box>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="1" color="gray" mb="1">Source</Text>
                    <Text>{getNameFromId(formData.sourceId, sources) || 'Not provided'}</Text>
                  </Box>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="1" color="gray" mb="1">Internal Use Only</Text>
                    <Text>{formData.internalUseOnly ? 'Yes' : 'No'}</Text>
                  </Box>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="1" color="gray" mb="1">Educational Methodology</Text>
                    <Text>{getNameFromId(formData.educationalMethodologyId, educationalMethodologies) || 'Not provided'}</Text>
                  </Box>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text size="1" color="gray" mb="1">AI Generated</Text>
                    <Text>{formData.aiGenerated ? 'Yes' : 'No'}</Text>
                  </Box>
                  <Box style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / span 2' }}>
                    <Text size="1" color="gray" mb="1">Description</Text>
                    <Text>{description}</Text>
                  </Box>
                </Grid>
              </Box>
            )}
          </Grid>
        </Box>
      )}
    </Card>
  );
};

export default ReviewSubmitForm;