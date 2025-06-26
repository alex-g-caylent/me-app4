export interface CreateArticleDto {
  title: string;
  description: string;
  coverFileMimeType: string;
  contentFileMimeType: string;
  duration: number;
  aiGenerated: boolean;
  internalUseOnly: boolean;
  revokedAt: Date | null;
  mediaId: string;
  sourceId: string;
  educationalMethodologyId: string;
  educationalToolId: string;
  educationalFrameworkId: string;
  languageId: string;
  articleBusinessUnits: string[];
  articleCourses: string[];
  articleRegions: string[];
  size: number;
  fileUuid: string;
  coverImage?: string;
}

export interface CreateArticlesDto {
  articles: CreateArticleDto[];
}