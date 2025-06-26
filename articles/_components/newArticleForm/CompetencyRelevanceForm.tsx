"use client";

import React, { useEffect, useState } from "react";
import { Card, Flex, Heading, Text, Box, Grid, Checkbox } from "@radix-ui/themes";
import { Skills } from "@/app/utils/article_consts";

interface CompetencyRelevanceFormProps {
  isVisible: boolean;
  fileName: string;
  onChange: (fileName: string, selectedSkills: number[]) => void;
}

// Calculate total number of skills
const totalSkills = Skills.map(group => group.skills.length).reduce((a, b) => a + b, 0);
const jobCount = 7;

const CompetencyRelevanceForm = ({ isVisible, fileName, onChange }: CompetencyRelevanceFormProps) => {
  const [relevanceValues, setRelevanceValues] = useState<number[]>(() => Array(totalSkills * jobCount).fill(0));

  // Get the flat index for a skill
  const getSkillIndex = (groupIndex: number, skillIndex: number): number => {
    let index = 0;
    for (let i = 0; i < groupIndex; i++) {
      index += Skills[i].skills.length;
    }
    return index + skillIndex;
  };

  // Handle individual skill checkbox change
  const handleSkillChange = (groupIndex: number, skillIndex: number, checked: boolean) => {
    const index = getSkillIndex(groupIndex, skillIndex);
    setRelevanceValues(prev => {
      const updated = [...prev];
      const indices = Array.from({ length: jobCount }, (_, i) => i);
      indices.forEach(jobIndex => {
        const jobSkillIndex = index + (jobIndex * totalSkills);
        updated[jobSkillIndex] = checked ? 1 : 0;
      });
      return updated;
    });
  };

  // Toggle all skills in a group
  const toggleGroupSkills = (groupIndex: number, checked: boolean) => {
    setRelevanceValues(prev => {
      const updated = [...prev];
      for (let i = 0; i < Skills[groupIndex].skills.length; i++) {
        const index = getSkillIndex(groupIndex, i);
        for (let j = 0; j < jobCount; j++) {
          const jobSkillIndex = index + (j * totalSkills);
          updated[jobSkillIndex] = checked ? 1 : 0;
        }
      }
      return updated;
    });
  };

  // Check if all skills in a group are selected
  const areAllGroupSkillsSelected = (groupIndex: number): boolean => {
    for (let i = 0; i < Skills[groupIndex].skills.length; i++) {
      const index = getSkillIndex(groupIndex, i);
      if (relevanceValues[index] === 0) return false;
    }
    return true;
  };

  // Update parent component when relevance values change
  useEffect(() => {
    onChange(fileName, relevanceValues);
  }, [relevanceValues, fileName, onChange]);

  return (
    <Flex direction="column" gap="4" style={{ display: isVisible ? 'block' : 'none' }}>
      <Heading size="3">Competency Relevance</Heading>

      <Grid columns="1" gap="4">
        {Skills.map((skillGroup, groupIndex) => (
          <Card key={skillGroup.title}>
            <Flex align="center" gap="2" mb="2">
              <Checkbox
                id={`group-${groupIndex}`}
                checked={areAllGroupSkillsSelected(groupIndex)}
                onCheckedChange={(checked) => toggleGroupSkills(groupIndex, checked === true)}
              />
              <Heading size="4" as="label" htmlFor={`group-${groupIndex}`} style={{ cursor: 'pointer', color: skillGroup.color }}>
                {skillGroup.title}
              </Heading>
            </Flex>
            <Flex direction="column" gap="2">
              {skillGroup.skills.map((skillName, skillIndex) => {
                const index = getSkillIndex(groupIndex, skillIndex);
                return (
                  <Flex key={`${groupIndex}-${skillIndex}`} justify="between" align="center">
                    <Flex align="center" gap="2">
                      <Checkbox
                        id={`skill-${groupIndex}-${skillIndex}`}
                        checked={relevanceValues[index] > 0}
                        onCheckedChange={(checked) => handleSkillChange(groupIndex, skillIndex, checked === true)}
                      />
                      <Text as="label" htmlFor={`skill-${groupIndex}-${skillIndex}`} size="2" style={{ cursor: 'pointer' }}>
                        {skillName}
                      </Text>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          </Card>
        ))}
      </Grid>
    </Flex>
  );
};

export default CompetencyRelevanceForm;
