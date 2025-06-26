"use client";

import { Box, Button, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";
import React, { useState, useEffect, useCallback } from "react";
import NewArticleForm from "../_components/newArticleForm/NewArticleForm";
import CompetencyRelevanceForm from "../_components/newArticleForm/CompetencyRelevanceForm";
import ComplexityLevelForm from "../_components/newArticleForm/ComplexityLevelForm";
import StepCounter from "../_components/newArticleForm/StepCounter";
import { fetchApi } from "@/app/utils/fetchInterceptor";
import ArticleMetadataForm from "../_components/newArticleForm/ArticleMetadataForm";
import ArticleMetadataFormGroup from "../_components/newArticleForm/ArticleMetadataFormGroup";
import FileGroupModal from "../_components/newArticleForm/FileGroupModal";
import { ArticleMetadata } from "@/app/utils/models/article/articleMetadata";
import { CreateArticleDto } from "@/app/utils/models/article/create-article.dto";
import ReviewSubmitContainer from "../_components/newArticleForm/ReviewSubmitContainer";
import ValidationStatusIcon from "../_components/newArticleForm/ValidationStatusIcon";
import { getCookie } from "cookies-next";
import { FileWithUuid } from "@/app/utils/models/article/fileWithUuid";
import { useFileProcessing, FileAnalysis } from "@/app/utils/api/fileUploadPoll";

interface ArticleSubmissionData extends ArticleMetadata {
  relevance: number[];
}

interface ArticleSkillsRelevance {
  id: string;
  relevance: number[];
  isTouched: boolean;
}
interface ArticleSkillsComplexity {
  id: string;
  complexity: number[];
}
interface FileGroup {
  id: string;
  files: FileWithUuid[];
}

const steps = [
  "Upload Files",
  "Article Metadata",
  "Competency Relevance",
  "Complexity Level",
  "Review & Submit"
];

const NewArticle = () => {

  const [currentStep, setCurrentStep] = useState(0);
  // TODO: Consolidate
  const [formData, setFormData] = useState<ArticleMetadata[]>([]);
  const [skillsRelevance, setSkillsRelevance] = useState<ArticleSkillsRelevance[]>([]);
  const [skillsComplexity, setSkillsComplexity] = useState<ArticleSkillsComplexity[]>([]);

  const [files, setFiles] = useState<FileWithUuid[]>([]);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const [fileGroups, setFileGroups] = useState<FileGroup[]>([]);

  const [areMetadataFormsValid, setAreMetadataFormsValid] = useState<{ id: string; isValid: boolean | undefined }[]>([]);

  // Form data loaded from API
  const [educationalFrameworks, setEducationalFrameworks] = useState<IdWithName[]>([]);
  const [educationalMethodologies, setEducationalMethodologies] = useState<IdWithName[]>([]);
  const [medias, setMedias] = useState<IdWithName[]>([]);
  const [languages, setLanguages] = useState<IdWithName[]>([]);
  const [sources, setSources] = useState<IdWithName[]>([]);
  const [educationalTools, setEducationalTools] = useState<IdWithName[]>([]);
  const [businessUnits, setBusinessUnits] = useState<IdWithName[]>([]);
  const [courses, setCourses] = useState<IdWithName[]>([]);
  const [regions, setRegions] = useState<IdWithName[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File processing hook
  const { fileStatuses, trackFile, stopTracking } = useFileProcessing();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          frameworks,
          methodologies,
          mediaTypes,
          languageTypes,
          sourceTypes,
          tools,
          units,
          courseList,
          regionList,
        ] = await Promise.all([
          fetchApi("/educational-frameworks"),
          fetchApi("/educational-methodologies"),
          fetchApi("/media"),
          fetchApi("/languages"),
          fetchApi("/sources"),
          fetchApi("/educational-tools"),
          fetchApi("/business-units"),
          fetchApi("/courses"),
          fetchApi("/regions"),
        ]);
        setEducationalFrameworks(frameworks);
        setEducationalMethodologies(methodologies);
        setMedias(mediaTypes);
        setLanguages(languageTypes);
        setSources(sourceTypes);
        setEducationalTools(tools);
        setBusinessUnits(units);
        setCourses(courseList);
        setRegions(regionList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-select the first file when moving to step 1 or when files are added
  useEffect(() => {

    if (currentStep > 0 && fileGroups.length > 0 && !selectedFileName) {
      setSelectedFileName(fileGroups[0].id);
    } else if (currentStep > 0 && files.length > 0 && !selectedFileName) {
      setSelectedFileName(files[0].name);
    }
  }, [currentStep, files, selectedFileName]);


  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      // If moving to step 1 and no file is selected, select the first file
      if (currentStep === 0 && files.length > 0 && !selectedFileName) {
        setSelectedFileName(files[0].name);
      }

      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUploaded = async (newFiles: FileWithUuid[]) => {
    // Filter out files that already exist
    const uniqueNewFiles = newFiles.filter(newFile =>
      !files.find(f => f.name === newFile.name)
    );

    if (uniqueNewFiles.length === 0) return;

    // Add files to state immediately for UI
    setFiles(prev => [...prev, ...newFiles]);

    // Start tracking each file for processing
    for (const file of uniqueNewFiles) {
      if (file.uuid) {
        // Small delay to ensure backend is ready
        await new Promise(resolve => setTimeout(resolve, 500));
        trackFile(file.uuid);
      }
    }
  };

  const removeFile = (fileToRemove: FileWithUuid) => {
    setFiles(files => files.filter(file => file !== fileToRemove));

    if (fileToRemove.uuid) {
      // Stop tracking the file
      stopTracking(fileToRemove.uuid);
    }

    // If the removed file was selected, select another file
    if (selectedFileName === fileToRemove.name) {
      const remainingFiles = files.filter(file => file !== fileToRemove);
      setSelectedFileName(remainingFiles.length > 0 ? remainingFiles[0].name : "");
    }
    // Remove form data for the removed file
    setFormData(prev => prev.filter(item => item.id !== fileToRemove.name));
  };

  const selectFile = (fileName: string) => {
    setSelectedFileName(fileName);
  };

  const getFileStatus = (file: FileWithUuid): 'processing' | 'completed' | 'failed' | 'uploading' => {
    if (!file.uuid) return 'uploading';
    return fileStatuses[file.uuid]?.status || 'processing';
  };

  const canAdvanceFromRelevancy = (): boolean => {
    // Check if all files and file groups have at least one skill selected
    const allFileIds = [...files.map(file => file.name), ...fileGroups.map(group => group.id)];

    // Every file/group must have a corresponding entry in skillsRelevance with at least one skill
    return allFileIds.every(isRelevanceValid);
  };
  // false if invalid, undefined if form untouched
  const isRelevanceValid = (id: string): boolean | undefined => {
    const relevance = skillsRelevance.find(item => item.id === id);
    if (!relevance) return undefined;
    if (!relevance.isTouched) return undefined;
    return relevance && relevance.relevance.some(r => r !== 0);
  };




  // TODO: This is the same logic everywhere. Squash this into one giant state variable?
  const updateMetadata = useCallback((fileId: string, newData: ArticleMetadata) => {
    setFormData(prev => {
      const index = prev.findIndex(item => item.id === fileId);
      if (index >= 0) {
        // Update existing item
        const updated = [...prev];
        updated[index] = { ...newData, id: fileId };
        return updated;
      } else {
        // Add new item
        return [...prev, { ...newData, id: fileId }];
      }
    });
  }, []);

  const checkIsMetadataValid = useCallback((fileId: string, isValid: boolean | undefined) => {
    setAreMetadataFormsValid(prev => {
      const index = prev.findIndex(item => item.id === fileId);
      if (index >= 0) {
        // Update existing item
        const updated = [...prev];
        updated[index] = { id: fileId, isValid: isValid };
        return updated;
      } else {
        // Add new item
        return [...prev, { id: fileId, isValid: isValid }];
      }
    })
  }, []);



  const onRelevancyChange = useCallback((fileName: string, selectedSkills: number[]) => {
    setSkillsRelevance(prev => {
      const index = prev.findIndex(item => item.id === fileName);
      // Check if any skills are selected (non-zero values)
      const hasSelectedSkills = selectedSkills.some(skill => skill !== 0);
      
      if (index >= 0) {
        // Update existing item
        const updated = [...prev];
        // Only set isTouched to true if skills are selected or it was already true
        const isTouched = hasSelectedSkills || prev[index].isTouched;
        updated[index] = {
          id: fileName,
          relevance: selectedSkills,
          isTouched
        };
        return updated;
      } else {
        // Add new item - initially not touched unless skills are selected
        return [...prev, {
          id: fileName,
          relevance: selectedSkills,
          isTouched: hasSelectedSkills
        }];
      }
    });
  }, []);

  const onComplexityChange = useCallback((fileName: string, skillsComplexity: number[]) => {
    setSkillsComplexity(prev => {
      const index = prev.findIndex(item => item.id === fileName);
      if (index >= 0) {
        // Update existing item
        const updated = [...prev];
        updated[index] = { id: fileName, complexity: skillsComplexity };
        return updated;
      } else {
        // Add new item
        return [...prev, { id: fileName, complexity: skillsComplexity }];
      }
    })
  }, []);

  const handleGroupFiles = (selectedFiles: FileWithUuid[]) => {
    if (selectedFiles.length < 2) return;

    // Create a unique ID for the group
    const groupId = `group-${Date.now()}`;


    // Create the group
    const newGroup: FileGroup = {
      id: groupId,
      files: selectedFiles
    };

    // Add the group to state
    setFileGroups(prev => [...prev, newGroup]);

    // Remove the individual files from the files array
    setFiles(prev => prev.filter(file => !selectedFiles.includes(file)));

    // If the selected file was one of the grouped files, select the group instead
    if (selectedFiles.some(file => file.name === selectedFileName)) {
      setSelectedFileName(groupId);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const submissionData: ArticleSubmissionData[] = [];

    // Process file groups
    fileGroups.forEach(group => {
      const groupMetadata = formData.find(item => item.id === group.id);
      const groupComplexity = skillsComplexity.find(item => item.id === group.id);

      if (groupMetadata && groupComplexity) {
        // Create an entry for each file in the group with its individual metadata
        if (groupMetadata.fileMetadata && Array.isArray(groupMetadata.fileMetadata)) {
          groupMetadata.fileMetadata.forEach((fileData, index) => {
            const file = group.files[index];
            if (file) {
              const data = {
                ...groupMetadata,
                title: fileData.title,
                description: fileData.description,
                size: file.size,
                id: file.uuid,
                coverImage: fileData.coverImage || groupMetadata.coverImage || '',
                // This isn't a typo, back-end maps this as relevance
                relevance: groupComplexity.complexity,
              };
              delete data.fileMetadata;
              submissionData.push(data);
            }
          });
        } else {
          // Fallback to old behavior if fileMetadata is not available
          group.files.forEach(file => {
            submissionData.push({
              ...groupMetadata,
              // This isn't a typo, back-end maps this as relevance
              relevance: groupComplexity.complexity,
            });
          });
        }
      }
    });

    // Process individual files
    files.forEach(file => {
      const fileMetadata = formData.find(item => item.id === file.name);
      const fileComplexity = skillsComplexity.find(item => item.id === file.name);
      if (fileMetadata && fileComplexity) {
        submissionData.push({
          ...fileMetadata,
          relevance: fileComplexity.complexity,
          size: file.size,
          id: file.uuid,
          coverImage: fileMetadata.coverImage || '',
        });
      }
    });
    // Format the data according to the backend DTO structure
    const formattedData: CreateArticleDto[] = submissionData.map(item => ({
      title: item.title,
      description: item.description,
      coverFileMimeType: "image/jpeg", // Default MIME type for cover images
      contentFileMimeType: "application/pdf", // Default MIME type for PDF content
      duration: item.pageCount || 1, // Using pageCount as duration
      aiGenerated: item.aiGenerated || false,
      internalUseOnly: item.internalUseOnly || false,
      revokedAt: item.revokedAt || null,
      mediaId: item.mediaId,
      sourceId: item.sourceId,
      educationalMethodologyId: item.educationalMethodologyId,
      educationalFrameworkId: item.educationalFrameworkId,
      educationalToolId: item.educationalToolId,
      languageId: item.languageId,
      articleBusinessUnits: item.articleBusinessUnits || [],
      articleCourses: item.articleCourses || [],
      articleRegions: item.articleRegions || [],
      size: item.size,
      fileUuid: item.id,
      coverImage: item.coverImage
    }));
    try {
      // Send the data to the backend
      const jwt = getCookie("jwt");
      const response = await fetchApi("/articles/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ articles: formattedData }),
      });


      // Show success message or redirect
      if (response && response.success) {
        alert(`Successfully submitted ${response.count} articles`);
        // Redirect to articles list
        window.location.href = "/articles";
      } else {
        throw new Error("Failed to submit articles");
      }
    } catch (error) {
      console.error("Error submitting articles:", error);
      alert("Failed to submit articles. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const renderStep = () => {
    if (isLoading && currentStep > 0) {
      return (
        <Card>
          <Flex direction="column" gap="4" align="center" justify="center" style={{ minHeight: '200px' }}>
            <Text size="4">Loading data...</Text>
          </Flex>
        </Card>
      );
    }

    switch (currentStep) {
      case 0:
        return <NewArticleForm onFileSelect={handleFileUploaded} />;
      case 1:
        const multiFileMetadataForm = fileGroups.map((fileGroup) => {
          //TODO: This is a hairball. Refactor later to consolidate into one component
          // Use the new group form component for file groups
          return (
            <ArticleMetadataFormGroup
              key={fileGroup.id}
              isVisible={selectedFileName === fileGroup.id}
              fileGroup={fileGroup}
              onChange={updateMetadata}
              checkFormValidity={checkIsMetadataValid}
              educationalMethodologies={educationalMethodologies}
              medias={medias}
              educationalFrameworks={educationalFrameworks}
              educationalTools={educationalTools}
              sources={sources}
              languages={languages}
              businessUnits={businessUnits}
              courses={courses}
              regions={regions}
              fileStatuses={fileStatuses}
            />
          );
        })
        const singleFileMetadataForms = files.map((file) => {
          // Pass the file UUID and let the component handle the status and analysis
          return (
            <ArticleMetadataForm
              key={file.name}
              isVisible={selectedFileName === file.name}
              fileName={file.name}
              fileUuid={file.uuid}
              onChange={updateMetadata}
              checkFormValidity={checkIsMetadataValid}
              educationalMethodologies={educationalMethodologies}
              medias={medias}
              educationalFrameworks={educationalFrameworks}
              educationalTools={educationalTools}
              sources={sources}
              languages={languages}
              businessUnits={businessUnits}
              courses={courses}
              regions={regions}
              fileStatuses={fileStatuses}
            />
          );
        })
        return [...multiFileMetadataForm, ...singleFileMetadataForms];
      case 2:
        const multiFileRelevanceForms = fileGroups.map((fileGroup) => {
          return (<CompetencyRelevanceForm
            key={fileGroup.id}
            isVisible={selectedFileName === fileGroup.id}
            fileName={fileGroup.id}
            onChange={onRelevancyChange}
          />);
        })
        const singleFileRelevanceForms = files.map((file) => {
          return (<CompetencyRelevanceForm
            key={file.name}
            isVisible={selectedFileName === file.name}
            fileName={file.name}
            onChange={onRelevancyChange}
          />);
        })
        return [...multiFileRelevanceForms, ...singleFileRelevanceForms]
      case 3:
        const multiFileComplexityForm = fileGroups.map((fileGroup) => {
          return (<ComplexityLevelForm
            key={fileGroup.id}
            //TODO: fix and replace with record when we have article grouping
            selectedSkills={skillsRelevance.find(rev => rev.id === fileGroup.id)!.relevance}
            isVisible={selectedFileName === fileGroup.id}
            fileName={fileGroup.id}
            onChange={onComplexityChange}
          />);
        })
        const singleFileComplexityForm = files.map((file) => {
          return (<ComplexityLevelForm
            key={file.name}
            //TODO: fix and replace with record when we have article grouping
            selectedSkills={skillsRelevance.find(rev => rev.id === file.name)!.relevance}
            isVisible={selectedFileName === file.name}
            fileName={file.name}
            onChange={onComplexityChange}
          />);
        });
        return [...multiFileComplexityForm, ...singleFileComplexityForm];
      case 4:
        return (
          <ReviewSubmitContainer
            files={files}
            fileGroups={fileGroups}
            formData={formData.reduce((acc, item) => {
              acc[item.id] = item;
              return acc;
            }, {} as Record<string, ArticleMetadata>)}
            educationalMethodologies={educationalMethodologies}
            medias={medias}
            educationalTools={educationalTools}
            sources={sources}
            languages={languages}
            businessUnits={businessUnits}
            courses={courses}
            regions={regions}
          />
        );
      default:
        return <NewArticleForm onFileSelect={handleFileUploaded} />;
    }
  };

  return (
    <Container my="5">
      <Flex
        direction={{ initial: "column", md: "row" }}
        justify="between"
        align={{ initial: "center", md: "center" }}
        mb="4"
        gap="3"
      >
        <Flex
          direction="column"
          order={{ initial: 2, md: 1 }}
        >
          <Heading>New article</Heading>
          <Text>
            Add the required information to add content to the Knowledge base
          </Text>
        </Flex>
        <StepCounter
          currentStep={currentStep}
          steps={steps}
          showLabels={{ initial: false, md: true }}
          order={{ initial: 1, md: 2 }}
        />
      </Flex>

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <Flex gap="4">
        {/* Left column for PDF file cards */}
        {(files.length > 0 || fileGroups.length > 0) && (
          <Box style={{ width: '250px', flexShrink: 0 }}>
            <Flex direction="column" gap="2">
              <Flex justify="between" align="center">
                <Heading size="3">Selected Files</Heading>
                {currentStep === 0 && files.length > 1 && (
                  <FileGroupModal
                    files={files}
                    onGroupFiles={handleGroupFiles}
                  />
                )}
              </Flex>

              <Flex direction="column" gap="2">
                {/* Render file groups */}
                {fileGroups.map((group) => {
                  // Check if any file in the group is still processing
                  const isAnyFileProcessing = group.files.some(file =>
                    file.uuid && getFileStatus(file) === 'processing'
                  );

                  return (
                    <Card
                      key={group.id}
                      style={{
                        padding: '12px',
                        cursor: currentStep > 0 ? 'pointer' : 'default',
                        border: currentStep > 0 && selectedFileName === group.id
                          ? '2px solid #4a5568'
                          : '1px solid #e2e8f0',
                        backgroundColor: currentStep > 0 && selectedFileName === group.id
                          ? '#f3f3f3'
                          : 'white',
                        position: 'relative'
                      }}
                      onClick={() => currentStep > 0 && selectFile(group.id)}
                    >

                      <Flex direction="column" gap="2">
                        <Flex justify="between" align="center">
                          {currentStep > 0 && (
                            <Box
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: selectedFileName === group.id ? '#4a5568' : 'white',
                                border: '1px solid #4a5568',
                                marginRight: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '12px'
                              }}
                            >
                              {selectedFileName === group.id && '✓'}
                            </Box>
                          )}
                          <Text size="2" weight="bold">
                            {group.id}
                          </Text>

                          {isAnyFileProcessing ? (
                            <Box style={{
                              width: '16px',
                              height: '16px',
                              borderRadius: '50%',
                              borderTop: '2px solid #3b82f6',
                              borderRight: '2px solid transparent',
                              animation: 'spin 1s linear infinite',
                              marginRight: '4px'
                            }} />
                          ) : (
                            <ValidationStatusIcon
                              isValid={
                                currentStep === 2
                                  ? isRelevanceValid(group.id)
                                  : areMetadataFormsValid.find(form => form.id === group.id)?.isValid
                              }
                              showIcon={currentStep > 0}
                            />
                          )}
                          {currentStep === 0 && (
                            <Button
                              variant="soft"
                              color="red"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add logic to ungroup files
                                const filesFromGroup = group.files;
                                setFiles(prev => [...prev, ...filesFromGroup]);
                                setFileGroups(prev => prev.filter(g => g.id !== group.id));
                              }}
                              style={{ padding: '0 6px', height: '24px' }}
                            >
                              Ungroup
                            </Button>
                          )}
                        </Flex>

                        {/* List files in the group */}
                        <Box style={{ paddingLeft: '12px' }}>
                          {group.files.map((file, i) => {
                            const fileStatus = file.uuid ? getFileStatus(file) : 'uploading';
                            const isFileProcessing = fileStatus === 'processing';

                            return (
                              <Flex key={i} justify="between" align="center" mb="1">
                                <Text size="1" style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  flex: 1
                                }}>
                                  {file.name}
                                </Text>
                                <Flex align="center" gap="2">
                                  {isFileProcessing && (
                                    <Text size="1" color="blue">Processing...</Text>
                                  )}
                                  <Text size="1" color="gray">
                                    {Math.round(file.size / 1024)} KB
                                  </Text>
                                </Flex>
                              </Flex>
                            );
                          })}
                        </Box>
                      </Flex>
                    </Card>
                  );
                })}

                {/* Render individual files */}
                {files.map((file) => {
                  const fileStatus = getFileStatus(file);
                  const isProcessing = fileStatus === 'processing';

                  return (
                    <Card
                      key={file.name}
                      style={{
                        padding: '12px',
                        cursor: currentStep > 0 ? 'pointer' : 'default',
                        border: currentStep > 0 && selectedFileName === file.name
                          ? '2px solid #4a5568'
                          : '1px solid #e2e8f0',
                        backgroundColor: currentStep > 0 && selectedFileName === file.name
                          ? '#f3f3f3'
                          : 'white',
                        position: 'relative'
                      }}
                      onClick={() => currentStep > 0 && selectFile(file.name)}
                    >
                      <Flex direction="column" gap="1">
                        <Flex justify="between" align="center">
                          {currentStep > 0 && (
                            <Box
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: selectedFileName === file.name ? '#4a5568' : 'white',
                                border: '1px solid #4a5568',
                                marginRight: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '12px'
                              }}
                            >
                              {selectedFileName === file.name && '✓'}
                            </Box>
                          )}
                          <Text size="2" style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            flex: 1
                          }}>
                            {file.name}
                          </Text>

                          {isProcessing ? (
                            <Box style={{
                              width: '16px',
                              height: '16px',
                              borderRadius: '50%',
                              borderTop: '2px solid #3b82f6',
                              borderRight: '2px solid transparent',
                              animation: 'spin 1s linear infinite',
                              marginRight: '4px'
                            }} />
                          ) : (
                            <ValidationStatusIcon
                              isValid={
                                currentStep === 2
                                  ? isRelevanceValid(file.name)
                                  : areMetadataFormsValid.find(form => form.id === file.name)?.isValid
                              }
                              showIcon={currentStep > 0}
                            />
                          )}

                          {currentStep === 0 && (
                            <Button
                              variant="soft"
                              color="red"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(file);
                              }}
                              style={{ padding: '0 6px', height: '24px' }}
                            >
                              ✕
                            </Button>
                          )}
                        </Flex>
                        <Flex justify="between" align="center">
                          <Text size="1" weight="bold" color="gray">
                            {Math.round(file.size / 1024)} KB
                          </Text>
                          {isProcessing && (
                            <Text size="1" color="blue">Processing...</Text>
                          )}
                        </Flex>
                      </Flex>
                    </Card>
                  );
                })}
              </Flex>
            </Flex >
          </Box >
        )}

        {/* Right column for the current step form */}
        <Box style={{ padding: '4px', flexGrow: 1, minWidth: '700px' }}>
          {renderStep()}
        </Box>
      </Flex >

      <Flex justify="end" gap="2" mt="4">
        {currentStep > 0 && (
          <Button
            variant="soft"
            onClick={handlePrevious}
          >
            Previous
          </Button>
        )}
        <Button
          onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
          disabled={
            isSubmitting ||
            (currentStep === 0 && files.length === 0 && fileGroups.length === 0) ||
            (currentStep === 1 && ((areMetadataFormsValid.length != (files.length + fileGroups.length)) || areMetadataFormsValid.some(form => !form.isValid))) ||
            (currentStep === 2 && !canAdvanceFromRelevancy()) ||
            (isLoading && currentStep === 0)
          }
        >
          {currentStep === steps.length - 1
            ? (isSubmitting ? "Submitting..." : "Submit")
            : "Next"}
        </Button>
      </Flex>
    </Container>
  );
};

export default NewArticle;