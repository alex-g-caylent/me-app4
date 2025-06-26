export interface FileMetadata {
  fileId: string;
  fileName: string;
  title: string;
  description: string;
  pageCount?: number;
  coverImage?: string;
}

export interface ArticleMetadata {
  id: string;
  title: string;
  description: string;
  aiGenerated: boolean;
  internalUseOnly: boolean;
  revokedAt: Date;
  mediaId: string;
  sourceId: string;
  educationalMethodologyId: string;
  educationalFrameworkId: string;
  educationalToolId: string;
  languageId: string;
  articleBusinessUnits: string[];
  articleCourses: string[];
  articleRegions: string[];
  pageCount: number;
  coverImage?: string;
  fileMetadata?: FileMetadata[]; // For file groups with individual metadata
  size: number;
}