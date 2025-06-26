export const mockBusinessUnits = [
  {
    id: "bu1",
    name: "Business Development",
    description: "Business Development Unit",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "bu2",
    name: "Human Resources",
    description: "Human Resources Unit",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "bu3",
    name: "Information Technology",
    description: "IT Department",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockCourses = [
  {
    id: "course1",
    name: "Leadership Fundamentals",
    description: "Basic leadership skills and principles",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "course2",
    name: "Project Management",
    description: "Project management methodologies and best practices",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "course3",
    name: "Digital Transformation",
    description: "Understanding digital transformation in modern business",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockRegions = [
  {
    id: "region1",
    name: "North America",
    description: "North American Region",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "region2",
    name: "Europe",
    description: "European Region",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "region3",
    name: "Asia Pacific",
    description: "Asia Pacific Region",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockArticle = {
  id: "article1",
  title: "Understanding Leadership in the Digital Age",
  description: "A comprehensive guide to modern leadership",
  duration: 30,
  internalUseOnly: false,
  aiGenerated: false,
  revokedAt: null,
  mediaId: "media1",
  sourceId: "source1",
  languageId: "language1",
  educationalMethodologyId: "methodology1",
  educationalFrameworkId: "framework1",
  educationalToolId: "tool1",
  cover: "https://example.com/cover.jpg",
  articleBusinessUnits: [
    {
      id: "abu1",
      articleId: "article1",
      businessUnitId: mockBusinessUnits[0].id,
      businessUnit: mockBusinessUnits[0],
    },
    {
      id: "abu2",
      articleId: "article1",
      businessUnitId: mockBusinessUnits[1].id,
      businessUnit: mockBusinessUnits[1],
    },
  ],
  articleCourses: [
    {
      id: "ac1",
      articleId: "article1",
      courseId: mockCourses[0].id,
      course: mockCourses[0],
    },
    {
      id: "ac2",
      articleId: "article1",
      courseId: mockCourses[1].id,
      course: mockCourses[1],
    },
  ],
  articleRegions: [
    {
      id: "ar1",
      articleId: "article1",
      regionId: mockRegions[0].id,
      region: mockRegions[0],
    },
    {
      id: "ar2",
      articleId: "article1",
      regionId: mockRegions[1].id,
      region: mockRegions[1],
    },
  ],
  jobTitleSkillRelevance: [
    {
      id: "jts1",
      articleId: "article1",
      jobTitleSkillId: "skill1",
      relevance: 4,
    },
    {
      id: "jts2",
      articleId: "article1",
      jobTitleSkillId: "skill2",
      relevance: 3,
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
