"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Article } from "@/types/article";
import { JobTitleSkill } from "@/types/jobTitleSkill";
import { getCookie } from "cookies-next";
// import { mockBusinessUnits, mockCourses, mockRegions } from "../_data/mockData";
import { Flex, Container, Grid, Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const EditArticleForm = ({
	article,
	medias,
	languages,
	businessUnits,
	courses,
	regions,
	jobTitleSkills,
	jobTitles,
	sources,
	educationalMethodologies,
	educationalFrameworks,
	educationalTools,
	onSubmit,
}: {
	article: Article;
	medias: Array<{ id: string; name: string }>;
	languages: Array<{ id: string; name: string }>;
	businessUnits: Array<{ id: string; name: string }>;
	courses: Array<{ id: string; name: string }>;
	regions: Array<{ id: string; name: string }>;
	jobTitleSkills: JobTitleSkill[];
	jobTitles: Array<{ id: string; name: string }>;
	sources: Array<{ id: string; name: string }>;
	educationalMethodologies: Array<{ id: string; name: string }>;
	educationalFrameworks: Array<{ id: string; name: string }>;
	educationalTools: Array<{ id: string; name: string }>;
	onSubmit: (data: any) => void;
}) => {
	const jwt = getCookie("jwt") as string;

	const [formData, setFormData] = useState({
		title: article?.title || "",
		description: article?.description || "",
		duration: article?.duration || 0,
		internalUseOnly: article?.internalUseOnly || false,
		aiGenerated: article?.aiGenerated || false,
		revokedAt: article?.revokedAt
			? new Date(article.revokedAt).toISOString().split("T")[0]
			: "",
		mediaId: article?.mediaId || "",
		sourceId: article?.sourceId || "",
		languageId: article?.languageId || "",
		educationalMethodologyId: article?.educationalMethodologyId || "",
		educationalFrameworkId: article?.educationalFrameworkId || "",
		educationalToolId: article?.educationalToolId || "",
		businessUnits:
			article?.articleBusinessUnits?.map((abu) => abu.businessUnitId) || [],
		courses: article?.articleCourses?.map((ac) => ac.courseId) || [],
		regions: article?.articleRegions?.map((ar) => ar.regionId) || [],
		relevance: article?.articleJobTitleSkills
			? jobTitleSkills.map((skill) => {
					const relevance = article.articleJobTitleSkills.find(
						(ajts) => ajts.jobTitleSkillId === skill.id
					);
					return relevance ? relevance.relevance : 0;
			  })
			: jobTitleSkills.map(() => 0),
	});

	const [relevanceValues, setRelevanceValues] = useState<Record<string, number>>(() => {
		const initialValues: Record<string, number> = {};
		jobTitleSkills.forEach((skill) => {
			const existingRelevance = article?.articleJobTitleSkills?.find(
				(ajts) => ajts.jobTitleSkillId === skill.id
			)?.relevance;
			initialValues[skill.id] = existingRelevance || 1;
		});
		return initialValues;
	});

	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submissionStatus, setSubmissionStatus] = useState<{
		message: string;
		type: "info" | "error";
	} | null>(null);

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target;
		if (type === "number") {
			setFormData((prev) => ({
				...prev,
				[name]: parseInt(value) || 0,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	const handleMultiCheckboxChange = (
		name: string,
		value: string,
		checked: boolean
	) => {
		setFormData((prev) => ({
			...prev,
			[name]: checked
				? [...prev[name], value]
				: prev[name].filter((v: string) => v !== value),
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setError(null);
			setIsSubmitting(true);
			setSubmissionStatus({ message: "Updating article...", type: "info" });

			// Transform the data back to the expected format
			const { businessUnits, courses, regions, relevance, ...restFormData } =
				formData;
			const submissionData = {
				...restFormData,
			};

			// Update the article
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_APIBASE}/articles/${article?.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${jwt}`,
					},
					body: JSON.stringify(submissionData),
				}
			);

			if (!res.ok) {
				throw new Error("Failed to update article");
			}

			// Sync business units
			setSubmissionStatus({
				message: "Syncing business units...",
				type: "info",
			});
			const businessUnitsRes = await fetch(
				`${process.env.NEXT_PUBLIC_APIBASE}/articles/${article?.id}/sync/business-units`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${jwt}`,
					},
					body: JSON.stringify({ businessUnits: businessUnits }),
				}
			);

			if (!businessUnitsRes.ok) {
				throw new Error("Failed to sync business units");
			}

			// Sync courses
			setSubmissionStatus({ message: "Syncing courses...", type: "info" });
			const coursesRes = await fetch(
				`${process.env.NEXT_PUBLIC_APIBASE}/articles/${article?.id}/sync/courses`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${jwt}`,
					},
					body: JSON.stringify({ courses: courses }),
				}
			);

			if (!coursesRes.ok) {
				throw new Error("Failed to sync courses");
			}

			// Sync regions
			setSubmissionStatus({ message: "Syncing regions...", type: "info" });
			const regionsRes = await fetch(
				`${process.env.NEXT_PUBLIC_APIBASE}/articles/${article?.id}/sync/regions`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${jwt}`,
					},
					body: JSON.stringify({ regions: regions }),
				}
			);

			if (!regionsRes.ok) {
				throw new Error("Failed to sync regions");
			}

			// Sync job title skills
			setSubmissionStatus({
				message: "Syncing job title skills...",
				type: "info",
			});
			const jobTitleSkillsData = jobTitleSkills.map((skill) => ({
				jobTitleSkillId: skill.id,
				relevance: relevanceValues[skill.id] || 1,
			}));
			const jobTitleSkillsRes = await fetch(
				`${process.env.NEXT_PUBLIC_APIBASE}/articles/${article?.id}/sync/job-title-skills`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${jwt}`,
					},
					body: JSON.stringify({ jobTitleSkills: jobTitleSkillsData }),
				}
			);

			if (!jobTitleSkillsRes.ok) {
				throw new Error("Failed to sync job title skills");
			}

			setSubmissionStatus({
				message: "Article updated successfully!",
				type: "info",
			});
			onSubmit(submissionData);
		} catch (err) {
			console.error("Error updating article:", err);
			setError(
				err instanceof Error
					? err.message
					: "An error occurred while updating the article"
			);
			setSubmissionStatus({
				message: "Failed to update article",
				type: "error",
			});
		} finally {
			setIsSubmitting(false);
			router.push(`/articles/${article?.id}`);
		}
	};

	return (
		<Container>
			<Flex direction="column" gap="3">
				<form onSubmit={handleSubmit} className="space-y-4">
					{submissionStatus && (
						<div
							className={`mb-4 p-4 rounded ${
								submissionStatus.type === "info" ? "bg-blue-100" : "bg-red-100"
							}`}
						>
							{submissionStatus.message}
						</div>
					)}
					{error && <div className="mb-4 p-4 rounded bg-red-100">{error}</div>}
					<Grid columns={{ initial: "1", sm: "2" }} gap="3">
						<Flex direction="column" gap="3">
							<div className="space-y-2">
								<label htmlFor="title" className="block font-bold">
									Title
								</label>
								<input
									type="text"
									id="title"
									name="title"
									value={formData.title}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
									required
								/>
							</div>

							<div className="space-y-2">
								<label htmlFor="description" className="block font-bold">
									Description
								</label>
								<textarea
									id="description"
									name="description"
									value={formData.description}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
									required
								/>
							</div>

							<div className="space-y-2">
								<label htmlFor="duration" className="block font-bold">
									Duration
								</label>
								<input
									type="number"
									id="duration"
									name="duration"
									value={formData.duration}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
									required
									min="1"
								/>
							</div>

							<div className="space-y-2">
								<label className="flex items-center space-x-2">
									<input
										type="checkbox"
										name="internalUseOnly"
										checked={formData.internalUseOnly}
										onChange={handleCheckboxChange}
									/>
									<span>Internal Use Only</span>
								</label>
							</div>

							<div className="space-y-2">
								<label className="flex items-center space-x-2">
									<input
										type="checkbox"
										name="aiGenerated"
										checked={formData.aiGenerated}
										onChange={handleCheckboxChange}
									/>
									<span>AI Generated</span>
								</label>
							</div>

							<div className="space-y-2">
								<label htmlFor="revokedAt" className="block font-bold">
									Revoked At
								</label>
								<input
									type="date"
									id="revokedAt"
									name="revokedAt"
									value={formData.revokedAt}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
								/>
							</div>
						</Flex>
						<Flex direction="column" gap="3">
							<div className="space-y-2">
								<label htmlFor="mediaId" className="block font-bold">
									Media Type
								</label>
								<select
									id="mediaId"
									name="mediaId"
									value={formData.mediaId}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
									required
								>
									<option value="">Select media type</option>
									{medias.map((media) => (
										<option key={media.id} value={media.id}>
											{media.name}
										</option>
									))}
								</select>
							</div>

							<div className="space-y-2">
								<label htmlFor="sourceId" className="block font-bold">
									Source Type
								</label>
								<select
									id="sourceId"
									name="sourceId"
									value={formData.sourceId}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
									required
								>
									<option value="">Select source type</option>
									{sources.map((source) => (
										<option key={source.id} value={source.id}>
											{source.name}
										</option>
									))}
								</select>
							</div>

							<div className="space-y-2">
								<label htmlFor="languageId" className="block font-bold">
									Language
								</label>
								<select
									id="languageId"
									name="languageId"
									value={formData.languageId}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
									required
								>
									<option value="">Select language</option>
									{languages.map((language) => (
										<option key={language.id} value={language.id}>
											{language.name}
										</option>
									))}
								</select>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="educationalMethodologyId"
									className="block font-bold"
								>
									Educational Methodology
								</label>
								<select
									id="educationalMethodologyId"
									name="educationalMethodologyId"
									value={formData.educationalMethodologyId}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
									required
								>
									<option value="">Select educational methodology</option>
									{educationalMethodologies.map((methodology) => (
										<option key={methodology.id} value={methodology.id}>
											{methodology.name}
										</option>
									))}
								</select>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="educationalFrameworkId"
									className="block font-bold"
								>
									Educational Framework
								</label>
								<select
									id="educationalFrameworkId"
									name="educationalFrameworkId"
									value={formData.educationalFrameworkId}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
									required
								>
									<option value="">Select educational framework</option>
									{educationalFrameworks.map((framework) => (
										<option key={framework.id} value={framework.id}>
											{framework.name}
										</option>
									))}
								</select>
							</div>

							<div className="space-y-2">
								<label htmlFor="educationalToolId" className="block font-bold">
									Educational Tool
								</label>
								<select
									id="educationalToolId"
									name="educationalToolId"
									value={formData.educationalToolId}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
									required
								>
									<option value="">Select educational tool</option>
									{educationalTools.map((tool) => (
										<option key={tool.id} value={tool.id}>
											{tool.name}
										</option>
									))}
								</select>
							</div>

							<div className="space-y-2">
								<span className="block font-bold">Business Units</span>
								<div className="space-y-1">
									{businessUnits.map((bu) => {
										const isSelected = formData.businessUnits.includes(bu.id);
										return (
											<label
												key={bu.id}
												className="flex items-center space-x-2"
											>
												<input
													type="checkbox"
													checked={isSelected}
													onChange={(e) =>
														handleMultiCheckboxChange(
															"businessUnits",
															bu.id,
															e.target.checked
														)
													}
												/>
												<span>{bu.name}</span>
											</label>
										);
									})}
								</div>
							</div>

							<div className="space-y-2">
								<span className="block font-bold">Courses</span>
								<div className="space-y-1">
									{courses.map((course) => {
										const isSelected = formData.courses.includes(course.id);
										return (
											<label
												key={course.id}
												className="flex items-center space-x-2"
											>
												<input
													type="checkbox"
													checked={isSelected}
													onChange={(e) =>
														handleMultiCheckboxChange(
															"courses",
															course.id,
															e.target.checked
														)
													}
												/>
												<span>{course.name}</span>
											</label>
										);
									})}
								</div>
							</div>

							<div className="space-y-2">
								<span className="block font-bold">Regions</span>
								<div className="space-y-1">
									{regions.map((region) => {
										const isSelected = formData.regions.includes(region.id);
										return (
											<label
												key={region.id}
												className="flex items-center space-x-2"
											>
												<input
													type="checkbox"
													checked={isSelected}
													onChange={(e) =>
														handleMultiCheckboxChange(
															"regions",
															region.id,
															e.target.checked
														)
													}
												/>
												<span>{region.name}</span>
											</label>
										);
									})}
								</div>
							</div>
						</Flex>
					</Grid>

					<Flex direction="column" gap="3">
						<div className="space-y-4">
							<Heading size="3">Relevance per Job Title</Heading>
						</div>
						<Grid columns={{ initial: "1", md: "2" }} gap="3">
							{jobTitles.length > 0 &&
								jobTitles.map((jobTitle) => (
									<Flex key={jobTitle.id} direction="column" gap="3">
										<Heading size="2">{jobTitle.name}</Heading>
										<Flex direction="column">
											{(jobTitleSkills || []).map(
												(jobTitleSkill) =>
													jobTitleSkill.jobTitle.name === jobTitle.name && (
														<div key={jobTitleSkill.id} className="space-y-2">
															<div className="space-y-1">
																<div className="flex justify-between items-center">
																	<span>
																		{jobTitleSkill.skill?.name ||
																			"Unknown Skill"}
																	</span>
																	<select
																		value={relevanceValues[jobTitleSkill.id]}
																		onChange={(e) => {
																			const newValue = parseInt(e.target.value);
																			setRelevanceValues(prev => ({
																				...prev,
																				[jobTitleSkill.id]: newValue
																			}));
																			
																			// Update formData to keep it in sync
																			const newRelevance = jobTitleSkills.map(skill => 
																				relevanceValues[skill.id] || 1
																			);
																			setFormData(prev => ({
																				...prev,
																				relevance: newRelevance
																			}));
																		}}
																		className="ml-2 p-1 border rounded"
																	>
																		{[1, 2, 3, 4, 5].map((value) => (
																			<option key={value} value={value}>
																				{value}
																			</option>
																		))}
																	</select>
																</div>
															</div>
														</div>
													)
											)}
										</Flex>
									</Flex>
								))}
						</Grid>
					</Flex>

					<button
						type="submit"
						disabled={isSubmitting}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						{article ? "Update Article" : "Create Article"}
					</button>
				</form>
			</Flex>
		</Container>
	);
};

export default EditArticleForm;
