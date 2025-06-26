"use client";

import React, { useEffect } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormCallout from "@/app/components/FormCallout";
import { Flex, Heading, Box, Text, TextField, TextArea, Select, Checkbox, Switch, Card, Button } from "@radix-ui/themes";
import { FileWithUuid } from "@/app/utils/models/article/fileWithUuid";


// Calculate date 3 years from now for default revoked date
  const getDefaultRevokedDate = () => {
    const today = new Date();
    const threeYearsLater = new Date(today);
    threeYearsLater.setFullYear(today.getFullYear() + 3);
    return threeYearsLater.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

interface ArticleMetadataFormGroupProps {
  fileGroup: {
    id: string;
    files: FileWithUuid[];
  };
  isVisible: boolean;
  onChange: (id: string, data: any) => void;
  checkFormValidity: (id: string, isValid: boolean | undefined) => void;
  educationalMethodologies: IdWithName[];
  educationalFrameworks: IdWithName[];
  medias: IdWithName[];
  educationalTools: IdWithName[];
  sources: IdWithName[];
  languages: IdWithName[];
  businessUnits: IdWithName[];
  courses: IdWithName[];
  regions: IdWithName[];
  fileStatuses?: Record<string, any>;
}

// Schema for file group with individual file metadata
const createArticleGroupSchema = (files: FileWithUuid[]) => {

  //TODO: fix to remove any type
  const fileMetadataFields: any = {};

  files.forEach((file, index) => {
    fileMetadataFields[`fileMetadata.${index}.title`] = Yup.string()
      .required(`Title for ${file.name} is required`)
      .min(3, `Title for ${file.name} must be at least 3 characters`);


    fileMetadataFields[`fileMetadata.${index}.description`] = Yup.string()
      .required(`Description for ${file.name} is required`)
      .min(10, `Description for ${file.name} must be at least 10 characters`);


    fileMetadataFields[`fileMetadata.${index}.pageCount`] = Yup.number()
      .required(`Page count for ${file.name} is required`)
      .min(1, `Page count for ${file.name} must be at least 1`);


    fileMetadataFields[`fileMetadata.${index}.coverImage`] = Yup.string();
  });


  return Yup.object().shape({
    fileMetadata: Yup.array().of(
      Yup.object().shape({
        fileId: Yup.string().required(),
        fileName: Yup.string().required(),
        title: Yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
        description: Yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
        pageCount: Yup.number().required("Page count is required").min(1, "Page count must be at least 1"),
        coverImage: Yup.string().optional(),
      })
    ).length(files.length),

    revokedAt: Yup.string().required("Revoked date is required"),
    aiGenerated: Yup.boolean().required("AI generated is required"),
    internalUseOnly: Yup.boolean().required("Internal use only is required"),
    mediaId: Yup.string().required("Please select media type"),
    sourceId: Yup.string().required("Please select source type"),
    languageId: Yup.string().required("Please select the language"),
    educationalMethodologyId: Yup.string().required("Please select the educational methodology"),
    educationalFrameworkId: Yup.string().required("Please select the educational framework"),
    educationalToolId: Yup.string().required("Please select the educational tool"),
    articleBusinessUnits: Yup.array().min(1, "Please select at least one business unit"),
    articleCourses: Yup.array().min(1, "Please select at least one course"),
    articleRegions: Yup.array().min(1, "Please select at least one region"),
  });
};

const ArticleMetadataFormGroup = ({
  fileGroup,
  isVisible,
  onChange,
  checkFormValidity,
  educationalMethodologies,
  medias,
  educationalFrameworks,
  educationalTools,
  sources,
  languages,
  businessUnits,
  courses,
  regions,
  fileStatuses = {}
}: ArticleMetadataFormGroupProps) => {

  const [coverFiles, setCoverFiles] = React.useState<{ [key: number]: File | null }>({});
  const [coverPreviews, setCoverPreviews] = React.useState<{ [key: number]: string | null }>({});
  // Initialize file metadata array with default values
  const initialFileMetadata = fileGroup.files.map(file => ({
    fileId: file.name,
    fileName: file.name,
    title: file.name,
    description: "",
    pageCount: 1,
    coverImage: ""
  }));

  const { register, control, setValue, formState: { errors, isValid, isDirty, touchedFields } } = useForm({
    defaultValues: {
      fileMetadata: initialFileMetadata,
      aiGenerated: false,
      internalUseOnly: false,
      revokedAt: getDefaultRevokedDate(),
      mediaId: "",
      sourceId: "",
      educationalMethodologyId: "",
      educationalFrameworkId: "",
      educationalToolId: "",
      languageId: "",
      articleBusinessUnits: [],
      articleCourses: [],
      articleRegions: [],
    },
    resolver: yupResolver(createArticleGroupSchema(fileGroup.files)),
    mode: "onChange",
  });

  const watchedValues = useWatch({ control });

  useEffect(() => {
    const isFormTouched = isDirty;
    const validityValue = (isFormTouched === true) ? isValid : undefined;
    
    checkFormValidity(fileGroup.id, validityValue);
  }, [isValid, isDirty, touchedFields, fileGroup.id, checkFormValidity]);

  // Update form with analysis data when it becomes available
  useEffect(() => {
    if (fileStatuses && fileGroup.files) {
      // Use a timeout to prevent immediate state updates that could cause infinite loops
      const timer = setTimeout(() => {
        fileGroup.files.forEach((file, index) => {
          if (file.uuid && fileStatuses[file.uuid]?.analysis) {
            const analysis = fileStatuses[file.uuid].analysis;
            if (analysis.title) setValue(`fileMetadata.${index}.title`, analysis.title);
            if (analysis.description) setValue(`fileMetadata.${index}.description`, analysis.description);
            if (analysis.pages) setValue(`fileMetadata.${index}.pageCount`, analysis.pages);
          }
        });
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [fileStatuses]);

  useEffect(() => {
    onChange(fileGroup.id, watchedValues);
  }, [watchedValues, fileGroup.id, onChange]);


  const handleCoverFileChange = (fileIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        alert(`Cover image for ${fileGroup.files[fileIndex].name} must be smaller than 2MB`);
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a JPEG, PNG, or WebP image');
        return;
      }

      setCoverFiles(prev => ({ ...prev, [fileIndex]: file }));

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setCoverPreviews(prev => ({ ...prev, [fileIndex]: previewUrl }));
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];

        setValue(`fileMetadata.${fileIndex}.coverImage`, base64, { shouldDirty: true });
      };
      reader.onerror = () => {
        console.error('Failed to process cover image');
        alert('Failed to process cover image');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverImage = (fileIndex: number) => {
    // Clear the form value
    setValue(`fileMetadata.${fileIndex}.coverImage`, "", { shouldDirty: true });
    
    setCoverFiles(prev => {
      const updated = { ...prev };
      delete updated[fileIndex];
      return updated;
    });
  
    if (coverPreviews[fileIndex]) {
      URL.revokeObjectURL(coverPreviews[fileIndex]!);
      setCoverPreviews(prev => {
        const updated = { ...prev };
        delete updated[fileIndex];
        return updated;
      });
    }
  };

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(coverPreviews).forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [coverPreviews]);

  return (
    <Flex direction="column" gap="4" style={{ display: isVisible ? 'block' : 'none' }}>
      <Heading size="3">Article Metadata for File Group</Heading>

      <form>
        {/* Individual File Metadata */}
        <Box mb="4">
          <Heading size="2" mb="2">File Details</Heading>
          {fileGroup.files.map((file, index) => {
            const [isExpanded, setIsExpanded] = React.useState(false);
            const fileStatus = file.uuid ? fileStatuses[file.uuid]?.status : undefined;
            const isProcessing = fileStatus === 'processing';
            return (
              <Card key={file.name} mb="3" p="3">
                <Flex
                  justify="between"
                  align="center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <Flex align="center" gap="2">
                    {isExpanded ?
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg> :
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    }
                    <Heading size="4">{file.name}</Heading>
                  </Flex>
                  <Text size="2" color="gray">
                    {Math.round(file.size / 1024)} KB
                  </Text>
                </Flex>

                {isExpanded && (
                  <Flex direction="column" gap="3" mt="3">
                    <Box>
                      <Text as="label" size="2" weight="bold" htmlFor={`fileMetadata.${index}.title`}>Title</Text>
                      <Controller
                        name={`fileMetadata.${index}.title`}
                        control={control}
                        render={({ field }) => (
                          <TextField.Root
                            id={`fileMetadata.${index}.title`}
                            placeholder={isProcessing ? "Processing..." : `Add title for ${file.name}`}
                            style={{ width: '100%', marginTop: '4px' }}
                            disabled={isProcessing}
                            {...field}
                          />
                        )}
                      />
                      {errors.fileMetadata?.[index]?.title && (
                        <FormCallout msg={errors.fileMetadata[index].title.message} />
                      )}
                    </Box>

                    <Box>
                      <Text as="label" size="2" weight="bold" htmlFor={`fileMetadata.${index}.description`}>Description</Text>
                      <Controller
                        name={`fileMetadata.${index}.description`}
                        control={control}
                        render={({ field }) => (
                          <TextArea
                            id={`fileMetadata.${index}.description`}
                            placeholder={isProcessing ? "Processing..." : `Add description for ${file.name}`}
                            style={{ width: '100%', marginTop: '4px', minHeight: '100px' }}
                            disabled={isProcessing}
                            {...field}
                          />
                        )}
                      />
                      {errors.fileMetadata?.[index]?.description && (
                        <FormCallout msg={errors.fileMetadata[index].description.message} />
                      )}
                    </Box>

                    <Box>
                      <Text as="label" size="2" weight="bold" htmlFor={`fileMetadata.${index}.pageCount`}>Page Count</Text>
                      <Controller
                        name={`fileMetadata.${index}.pageCount`}
                        control={control}
                        render={({ field }) => (
                          <TextField.Root
                            id={`fileMetadata.${index}.pageCount`}
                            type="number"
                            placeholder={isProcessing ? "Processing..." : "Number of pages"}
                            style={{ width: '100%', marginTop: '4px' }}
                            disabled={isProcessing}
                            {...field}
                            value={field.value?.toString() || ""}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        )}
                      />
                      {errors.fileMetadata?.[index]?.pageCount && (
                        <FormCallout msg={errors.fileMetadata[index].pageCount.message} />
                      )}
                    </Box>

                    {/* <Box>
                      <Text as="label" size="2" weight="bold" htmlFor={`fileMetadata.${index}.coverImage`}>Cover Image</Text>
                      <Controller
                        name={`fileMetadata.${index}.coverImage`}
                        control={control}
                        render={({ field }) => (
                          <Flex align="center" gap="2" mt="1">
                            <Button variant="soft" type="button" onClick={() => console.log('Upload cover for', file.name)}>
                              Upload Cover
                            </Button>
                            <Text size="2">{field.value || "No cover image selected"}</Text>
                          </Flex>
                        )}
                      />
                    </Box> */}
                    {/* Enhanced Cover Image Upload */}
                    <Box>
                      <Text as="label" size="2" weight="bold">Cover Image</Text>
                      <Text size="1" color="gray" style={{ display: 'block', marginBottom: '8px' }}>
                        Optional. Upload JPEG, PNG, or WebP. Max size: 2MB
                      </Text>

                      <Flex direction="column" gap="2" mt="1">
                        {!coverFiles[index] && (
                          <Box>
                            <input
                              type="file"
                              accept="image/jpeg,image/jpg,image/png,image/webp"
                              onChange={(e) => handleCoverFileChange(index, e)}
                              style={{
                                display: 'block',
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '14px'
                              }}
                            />
                          </Box>
                        )}

                        {coverFiles[index] && (
                          <Box>
                            <Flex align="center" gap="3" p="2" style={{
                              border: '1px solid #e0e0e0',
                              borderRadius: '6px',
                              backgroundColor: '#f8f9fa'
                            }}>
                              {coverPreviews[index] && (
                                <Box>
                                  <img
                                    src={coverPreviews[index]!}
                                    alt="Cover preview"
                                    style={{
                                      width: '60px',
                                      height: '60px',
                                      objectFit: 'cover',
                                      borderRadius: '4px'
                                    }}
                                  />
                                </Box>
                              )}
                              <Flex direction="column" style={{ flex: 1 }}>
                                <Text size="2" weight="medium">{coverFiles[index]!.name}</Text>
                                <Text size="1" color="gray">
                                  {(coverFiles[index]!.size / 1024 / 1024).toFixed(2)} MB
                                </Text>
                              </Flex>
                              <Button
                                type="button"
                                variant="soft"
                                color="red"
                                size="1"
                                onClick={() => removeCoverImage(index)}
                              >
                                Remove
                              </Button>
                            </Flex>
                          </Box>
                        )}
                      </Flex>
                    </Box>
                  </Flex>
                )}
              </Card>
            );
          })}
        </Box>



        {/* Classification */}
        <Box mb="4">
          <Heading size="4" mb="2">Article Metadata</Heading>
          <Flex direction="column" gap="3">
            <Flex direction="row" gap="3" mb="3">
              <Box style={{ flex: 1 }}>
                <Text as="label" size="2" weight="bold" htmlFor="revokedAt">Date Revoked</Text>
                <Controller
                  name="revokedAt"
                  control={control}
                  render={({ field }) => (
                    <TextField.Root
                      id="revokedAt"
                      type="date"
                      style={{ width: '100%', marginTop: '4px' }}
                      {...field}
                    />
                  )}
                />
                {errors.revokedAt && <FormCallout msg={errors.revokedAt.message} />}
              </Box>

              <Box style={{ flex: 1 }}>
                <Text as="label" size="2" weight="bold" htmlFor="educationalMethodologyId">Educational Methodology</Text>
                <Controller
                  name="educationalMethodologyId"
                  control={control}
                  render={({ field }) => (
                    <Select.Root
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <Select.Trigger
                        placeholder="Select a methodology"
                        style={{ width: '100%', marginTop: '4px' }}
                      />
                      <Select.Content>
                        <Select.Group>
                          <Select.Label>Methodologies</Select.Label>
                          {educationalMethodologies.map((method) => (
                            <Select.Item key={method.id} value={method.id}>
                              {method.name}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  )}
                />
                {errors.educationalMethodologyId && <FormCallout msg={errors.educationalMethodologyId.message} />}
              </Box>
            </Flex>

            {/* Second row: Educational Framework and Media Type */}
            <Flex direction="row" gap="3" mb="3">
              <Box style={{ flex: 1 }}>
                <Text as="label" size="2" weight="bold" htmlFor="educationalFrameworkId">Educational Framework</Text>
                <Controller
                  name="educationalFrameworkId"
                  control={control}
                  render={({ field }) => (
                    <Select.Root
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <Select.Trigger
                        placeholder="Select a framework"
                        style={{ width: '100%', marginTop: '4px' }}
                      />
                      <Select.Content>
                        <Select.Group>
                          <Select.Label>Frameworks</Select.Label>
                          {educationalFrameworks.map((framework) => (
                            <Select.Item key={framework.id} value={framework.id}>
                              {framework.name}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  )}
                />
                {errors.educationalFrameworkId && <FormCallout msg={errors.educationalFrameworkId.message} />}
              </Box>

              <Box style={{ flex: 1 }}>
                <Text as="label" size="2" weight="bold" htmlFor="mediaId">Media Type</Text>
                <Controller
                  name="mediaId"
                  control={control}
                  render={({ field }) => (
                    <Select.Root
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <Select.Trigger
                        placeholder="Select a media type"
                        style={{ width: '100%', marginTop: '4px' }}
                      />
                      <Select.Content>
                        <Select.Group>
                          <Select.Label>Media Types</Select.Label>
                          {medias.map((media) => (
                            <Select.Item key={media.id} value={media.id}>
                              {media.name}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  )}
                />
                {errors.mediaId && <FormCallout msg={errors.mediaId.message} />}
              </Box>
            </Flex>

            {/* Third row: Educational Tool and Source */}
            <Flex direction="row" gap="3" mb="3">
              <Box style={{ flex: 1 }}>
                <Text as="label" size="2" weight="bold" htmlFor="educationalToolId">Educational Tool</Text>
                <Controller
                  name="educationalToolId"
                  control={control}
                  render={({ field }) => (
                    <Select.Root
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <Select.Trigger
                        placeholder="Select an educational tool"
                        style={{ width: '100%', marginTop: '4px' }}
                      />
                      <Select.Content>
                        <Select.Group>
                          <Select.Label>Educational Tools</Select.Label>
                          {educationalTools.map((tool) => (
                            <Select.Item key={tool.id} value={tool.id}>
                              {tool.name}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  )}
                />
                {errors.educationalToolId && <FormCallout msg={errors.educationalToolId.message} />}
              </Box>

              <Box style={{ flex: 1 }}>
                <Text as="label" size="2" weight="bold" htmlFor="sourceId">Source</Text>
                <Controller
                  name="sourceId"
                  control={control}
                  render={({ field }) => (
                    <Select.Root
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <Select.Trigger
                        placeholder="Select a source"
                        style={{ width: '100%', marginTop: '4px' }}
                      />
                      <Select.Content>
                        <Select.Group>
                          <Select.Label>Sources</Select.Label>
                          {sources.map((source) => (
                            <Select.Item key={source.id} value={source.id}>
                              {source.name}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  )}
                />
                {errors.sourceId && <FormCallout msg={errors.sourceId.message} />}
              </Box>
            </Flex>

            {/* Fourth row: Language and Switches */}
            <Flex direction="row" gap="3" mb="3">
              <Box style={{ flex: 1 }}>
                <Text as="label" size="2" weight="bold" htmlFor="languageId">Language</Text>
                <Controller
                  name="languageId"
                  control={control}
                  render={({ field }) => (
                    <Select.Root
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <Select.Trigger
                        placeholder="Select a language"
                        style={{ width: '100%', marginTop: '4px' }}
                      />
                      <Select.Content>
                        <Select.Group>
                          <Select.Label>Languages</Select.Label>
                          {languages.map((language) => (
                            <Select.Item key={language.id} value={language.id}>
                              {language.name}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  )}
                />
                {errors.languageId && <FormCallout msg={errors.languageId.message} />}
              </Box>

              {/* Switches for internalUseOnly and aiGenerated */}
              <Box style={{ flex: 1 }}>
                <Flex gap="4" align="center" style={{ marginTop: '29px' }}>
                  <Flex align="center" gap="2">
                    <Controller
                      name="internalUseOnly"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          id="internalUseOnly"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Text as="label" size="2" htmlFor="internalUseOnly" style={{ cursor: 'pointer' }}>
                      Internal Use Only
                    </Text>
                  </Flex>

                  <Flex align="center" gap="2">
                    <Controller
                      name="aiGenerated"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          id="aiGenerated"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Text as="label" size="2" htmlFor="aiGenerated" style={{ cursor: 'pointer' }}>
                      AI Generated
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>

            {/* Multi-select fields with improved styling in a horizontal row */}
            <Flex direction="row" gap="3">
              <Box style={{ flex: 1 }}>
                <Text as="label" size="2" weight="bold">Business Units</Text>
                <div style={{ padding: '8px', marginTop: '4px', height: '100px', overflowY: 'auto' }}>
                  <Flex direction="column" gap="2">
                    {businessUnits.map((unit) => (
                      <Flex key={unit.id} align="center">
                        <Controller
                          name="articleBusinessUnits"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              checked={field.value?.includes(unit.id)}
                              onCheckedChange={(checked) => {
                                const currentValues = field.value || [];
                                if (checked) {
                                  field.onChange([...currentValues, unit.id]);
                                } else {
                                  field.onChange(currentValues.filter(id => id !== unit.id));
                                }
                              }}
                              style={{ marginRight: '8px' }}
                            />
                          )}
                        />
                        <Text size="2">{unit.name}</Text>
                      </Flex>
                    ))}
                  </Flex>
                </div>
                {errors.articleBusinessUnits && <FormCallout msg={errors.articleBusinessUnits.message} />}
              </Box>

              <Box style={{ flex: 1 }}>
                <Text as="label" size="2" weight="bold">Courses</Text>
                <div style={{ padding: '8px', marginTop: '4px', height: '100px', overflowY: 'auto' }}>
                  <Flex direction="column" gap="2">
                    {courses.map((course) => (
                      <Flex key={course.id} align="center">
                        <Controller
                          name="articleCourses"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              checked={field.value?.includes(course.id)}
                              onCheckedChange={(checked) => {
                                const currentValues = field.value || [];
                                if (checked) {
                                  field.onChange([...currentValues, course.id]);
                                } else {
                                  field.onChange(currentValues.filter(id => id !== course.id));
                                }
                              }}
                              style={{ marginRight: '8px' }}
                            />
                          )}
                        />
                        <Text size="2">{course.name}</Text>
                      </Flex>
                    ))}
                  </Flex>
                </div>
                {errors.articleCourses && <FormCallout msg={errors.articleCourses.message} />}
              </Box>

              <Box style={{ flex: 1 }}>
                <Text as="label" size="2" weight="bold">Regions</Text>
                <div style={{ padding: '8px', marginTop: '4px', height: '100px', overflowY: 'auto' }}>
                  <Flex direction="column" gap="2">
                    {regions.map((region) => (
                      <Flex key={region.id} align="center">
                        <Controller
                          name="articleRegions"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              checked={field.value?.includes(region.id)}
                              onCheckedChange={(checked) => {
                                const currentValues = field.value || [];
                                if (checked) {
                                  field.onChange([...currentValues, region.id]);
                                } else {
                                  field.onChange(currentValues.filter(id => id !== region.id));
                                }
                              }}
                              style={{ marginRight: '8px' }}
                            />
                          )}
                        />
                        <Text size="2">{region.name}</Text>
                      </Flex>
                    ))}
                  </Flex>
                </div>
                {errors.articleRegions && <FormCallout msg={errors.articleRegions.message} />}
              </Box>
            </Flex>
          </Flex>
        </Box>
      </form>
    </Flex>
  );
};

export default ArticleMetadataFormGroup;