"use client";

import React, { useEffect, useRef } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormCallout from "@/app/components/FormCallout";
import { Flex, Heading, Box, Button, Grid, Text, TextField, TextArea, Select, Checkbox, Switch } from "@radix-ui/themes";



interface ArticleMetadataFormProps {
  fileName: string;
  fileUuid?: string;
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

const articleSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  pageCount: Yup.number()
    .default(1)
    .required("Page count is required")
    .min(1, "Page count must be at least 1"),
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
  coverImage: Yup.string().optional(),
});

const ArticleMetadataForm = ({
  fileName,
  fileUuid,
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
}: ArticleMetadataFormProps) => {
  const [coverFile, setCoverFile] = React.useState<File | null>(null);
  const [coverPreview, setCoverPreview] = React.useState<string | null>(null);
  // Track if we've applied the analysis data
  const analysisAppliedRef = useRef(false);

  // Get processing status and analysis data directly from fileStatuses
  const fileStatus = fileUuid ? fileStatuses[fileUuid]?.status : undefined;
  const isProcessing = fileStatus === 'processing';
  const fileAnalysis = fileUuid ? fileStatuses[fileUuid]?.analysis : null;

  // Calculate date 3 years from now for default revoked date
  const getDefaultRevokedDate = () => {
    const today = new Date();
    const threeYearsLater = new Date(today);
    threeYearsLater.setFullYear(today.getFullYear() + 3);
    return threeYearsLater.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const { control, formState: { errors, isValid, isDirty, touchedFields }, setValue } = useForm({
    defaultValues: {
      title: fileName,
      description: "",
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
      pageCount: 1,
      coverImage: "",
    },
    resolver: yupResolver(articleSchema),
    mode: "onChange",
  });

  // Apply analysis data once when it becomes available and not processing
  useEffect(() => {
    if (fileAnalysis && !isProcessing && !analysisAppliedRef.current) {
      analysisAppliedRef.current = true;
      if (fileAnalysis.title) setValue('title', fileAnalysis.title);
      if (fileAnalysis.description) setValue('description', fileAnalysis.description);
      if (fileAnalysis.pages) setValue('pageCount', fileAnalysis.pages);
    }
  }, [fileAnalysis, isProcessing, setValue]);

  const watchedValues = useWatch({ control });

  useEffect(() => {
    const isFormTouched = isDirty;
    const validityValue = (isFormTouched == true) ? isValid : undefined;
    checkFormValidity(fileName, validityValue);
  }, [isValid, isDirty, touchedFields, fileName, checkFormValidity]);

  useEffect(() => {
    onChange(fileName, watchedValues);
  }, [watchedValues, fileName, onChange]);


  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        alert('Cover image must be smaller than 2MB');
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a JPEG, PNG, or WebP image');
        return;
      }

      setCoverFile(file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setCoverPreview(previewUrl);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];

        setValue('coverImage', base64, { shouldDirty: true });
    };
      reader.onerror = () => {
        console.error('Failed to process cover image');
        alert('Failed to process cover image');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverImage = () => {
    setCoverFile(null);
    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
      setCoverPreview(null);
    }
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (coverPreview) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [coverPreview]);
  return (
    <Flex direction="column" gap="4" style={{ display: isVisible ? 'block' : 'none' }}>
      <Heading size="3">Article Metadata for {fileName}</Heading>

      <form>
        {/* Document Details */}
        <Box mb="4">
          <Heading size="2" mb="2">Document Details</Heading>
          <Flex direction="column" gap="3">
            <Box>
              <Text as="label" size="2" weight="bold" htmlFor="title">Title</Text>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField.Root
                    id="title"
                    placeholder={isProcessing ? "Processing..." : "Add the article's title"}
                    style={{ width: '100%', marginTop: '4px' }}
                    disabled={isProcessing}
                    {...field}
                  />
                )}
              />
              {errors.title && <FormCallout msg={errors.title.message} />}
            </Box>

            <Box>
              <Text as="label" size="2" weight="bold" htmlFor="description">Description</Text>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextArea
                    id="description"
                    placeholder={isProcessing ? "Processing..." : "Add article's description"}
                    style={{ width: '100%', marginTop: '4px', minHeight: '100px' }}
                    disabled={isProcessing}
                    {...field}
                  />
                )}
              />
              {errors.description && <FormCallout msg={errors.description.message} />}
            </Box>

            <Box>
              <Text as="label" size="2" weight="bold" htmlFor="pageCount">Page Count</Text>
              <Controller
                name="pageCount"
                control={control}
                render={({ field }) => (
                  <TextField.Root
                    id="pageCount"
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
              {errors.pageCount && <FormCallout msg={errors.pageCount.message} />}
            </Box>

            <Box>
              <Text as="label" size="2" weight="bold">Cover Image</Text>
              <Text size="1" color="gray" style={{ display: 'block', marginBottom: '8px' }}>
                Optional. Upload JPEG, PNG, or WebP. Max size: 2MB
              </Text>

              <Flex direction="column" gap="2" mt="1">
                {!coverFile && (
                  <Box>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleCoverFileChange}
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

                {coverFile && (
                  <Box>
                    <Flex align="center" gap="3" p="2" style={{
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      backgroundColor: '#f8f9fa'
                    }}>
                      {coverPreview && (
                        <Box>
                          <img
                            src={coverPreview}
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
                        <Text size="2" weight="medium">{coverFile.name}</Text>
                        <Text size="1" color="gray">
                          {(coverFile.size / 1024 / 1024).toFixed(2)} MB
                        </Text>
                      </Flex>
                      <Button
                        type="button"
                        variant="soft"
                        color="red"
                        size="1"
                        onClick={removeCoverImage}
                      >
                        Remove
                      </Button>
                    </Flex>
                  </Box>
                )}
              </Flex>
            </Box>
          </Flex>
        </Box>

        {/* Classification */}
        <Box mb="4">
          <Heading size="4" mb="2">Article Metadata</Heading>
          <Flex direction="column" gap="3">
            <Grid columns="2" gap="3" mb="3">
              <Box>
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

              <Box>
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
            </Grid>

            {/* Second row: Educational Framework and Media Type */}
            <Grid columns="2" gap="3" mb="3">
              <Box>
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

              <Box>
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
            </Grid>

            {/* Third row: Educational Tool and Source */}
            <Grid columns="2" gap="3" mb="3">
              <Box>
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

              <Box>
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
            </Grid>

            {/* Fourth row: Language and Switches */}
            <Grid columns="2" gap="3" mb="3">
              <Box>
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
              <Box>

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
            </Grid>

            {/* Multi-select fields with improved styling in a horizontal row */}
            <Grid columns="3" gap="3">
              <Box>
                <Text as="label" size="2" weight="bold">Business Units</Text>
                <div style={{ padding: '8px', marginTop: '4px', height: '100px', overflowY: 'auto' }}>
                  <Grid columns="1" gap="2">
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
                  </Grid>
                </div>
                {errors.articleBusinessUnits && <FormCallout msg={errors.articleBusinessUnits.message} />}
              </Box>

              <Box>
                <Text as="label" size="2" weight="bold">Courses</Text>
                <div style={{ padding: '8px', marginTop: '4px', height: '100px', overflowY: 'auto' }}>
                  <Grid columns="1" gap="2">
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
                  </Grid>
                </div>
                {errors.articleCourses && <FormCallout msg={errors.articleCourses.message} />}
              </Box>

              <Box>
                <Text as="label" size="2" weight="bold">Regions</Text>
                <div style={{ padding: '8px', marginTop: '4px', height: '100px', overflowY: 'auto' }}>
                  <Grid columns="1" gap="2">
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
                  </Grid>
                </div>
                {errors.articleRegions && <FormCallout msg={errors.articleRegions.message} />}
              </Box>
            </Grid>
          </Flex>
        </Box>
      </form>
    </Flex>
  );
};

export default ArticleMetadataForm;