
interface Article {
	id: String;
	title: String;
	description: String;
	cover: String;
	content: String;
	duration: String;
	educationalFrameworkId: String;
	educationalToolId: String;
	educationalMethodologyId: String;
	sourceId: String;
	mediaId: String;
	languageId: String;
	aiGenerated: boolean;
	internalUseOnly: boolean;
	articleBusinessUnits: BusinessUnit[]
	articleCourses: Course[]
	articleRegions: Region[]
};

interface Competency {
	id: string;
	name: string;
	description: string;
	color: string;
}

interface EducationalFramework {
	id: String;
	name: String;
};

interface EducationalMethodology {
	id: String;
	name: String;
};

interface Media {
	id: String;
	name: String;
};

interface Language {
	id: String;
	name: String;
};

interface Source {
	id: String;
	name: String;
};

interface EducationalTool {
	id: String;
	name: String;
};

interface User {
	id: String;
	firstName: String;
	lastName: String;
	email: String;
	roleUsers: RoleUser[];
	roleIds: String[];
	regionId: String;
	region: Region;
	jobTitleId: String;
	jobTitle: JobTitle;
	languageId: String;
	language: Language;
	businessUnitId: String;
	businessUnit: BusinessUnit;
};

interface RoleUser{
	id: String;
    role: Role;
}

interface Role {
	role: any;
	id: String;
	name: String;
};

interface BusinessUnit {
	id: String;
	name: String;
}
interface Language {
	id: String;
	name: String;
}
interface Region {
	id: String;
	name: String;
}
interface JobTitle {
	id: String;
	name: String;
}

interface Chat {
	id: string;
	name: string;
	createdAt: string;
	deletedAt: string | null;
	updatedAt: string;
	userId: string;
	messages?: Message[]
}

interface Message{
	id: String;
	interface: String;
	text: String;
	citations: Citation[];
};

interface Citation {
	id: String;
	text: String;
	references: Reference[]
};

interface Reference{
	id: String;
	article: Article;
}

type Skill = {
	id: string;
	name: string;
	target: number;
	jobTitleSkills: JobTitleSkill[];
};

type JobTitleSkill = {
	id: string;
	jobTitleId: string;
	target: number;
	jobTitle: JobTitle;
};

type Assessment = {
	id: string;
	name: string;
}

interface Props {
	params: { id: string };
	assessmentResults: AssessmentResult[];
}

type AssessmentResult = {
	jobTitleSkillId: string;
	value: number;
};

interface IngestionJob{
	id: string;
	locked: boolean;
}

interface Course{
	id: string;
	name: string;
}