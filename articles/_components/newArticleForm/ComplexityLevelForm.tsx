"use client";

import React, { useEffect, useState } from "react";
import { Card, Flex, Heading, Text, Box, Grid, Slider } from "@radix-ui/themes";
import { Skills } from "@/app/utils/article_consts";

interface ComplexityLevelFormProps {
  isVisible: boolean;
  fileName: string;
  selectedSkills: number[]; // Array of relevance values from previous step
  onChange: (fileName: string, complexityValues: number[]) => void;
}

// Calculate total number of skills
const totalSkills = Skills.map(group => group.skills.length).reduce((a, b) => a + b, 0);
const jobCount = 7;

const ComplexityLevelForm = ({
  isVisible,
  fileName,
  selectedSkills,
  onChange
}: ComplexityLevelFormProps) => {
  const [complexityValues, setComplexityValues] = useState<number[]>(() =>
    Array(totalSkills * jobCount).fill(1) // Default complexity is 1
  );

  // Get the flat index for a skill
  const getSkillIndex = (groupIndex: number, skillIndex: number): number => {
    let index = 0;
    for (let i = 0; i < groupIndex; i++) {
      index += Skills[i].skills.length;
    }
    return index + skillIndex;
  };

  // Handle complexity change for a skill
  const handleComplexityChange = (groupIndex: number, skillIndex: number, value: number) => {
    const index = getSkillIndex(groupIndex, skillIndex);
    setComplexityValues(prev => {
      const updated = [...prev];
      const indices = Array.from({ length: jobCount }, (_, i) => i);
      indices.forEach(jobIndex => {
        const jobSkillIndex = index + (jobIndex * totalSkills);
        updated[jobSkillIndex] = value;
      });
      return updated;
    });
  };

  // Update parent component when complexity values change
  useEffect(() => {
    onChange(fileName, complexityValues);
  }, [complexityValues, fileName, onChange]);

  return (
    <Flex direction="column" gap="4" style={{ display: isVisible ? 'block' : 'none' }}>
      <Heading size="3">Skills Complexity Level</Heading>

      <Grid columns="1" gap="4">
        {Skills.map((skillGroup, groupIndex) => {
          // Check if this skill group has any selected skills
          const hasSelectedSkills = skillGroup.skills.some((_, skillIndex) => {
            const index = getSkillIndex(groupIndex, skillIndex);
            return selectedSkills[index] > 0;
          });

          // Skip skill groups with no selected skills
          if (!hasSelectedSkills) return null;

          return (
            <Card key={skillGroup.title}>
              <Heading size="4" mb="3" style={{ color: skillGroup.color }}>{skillGroup.title}</Heading>
              <Flex direction="column" gap="4">
                {skillGroup.skills.map((skillName, skillIndex) => {
                  const index = getSkillIndex(groupIndex, skillIndex);

                  // Only show skills that were selected in the previous step
                  if (selectedSkills[index] === 0) return null;

                  return (
                    <Flex key={`${groupIndex}-${skillIndex}`} direction="column" gap="1">
                      <Flex justify="between" align="center">
                        <Text size="2" weight="medium">{skillName}</Text>
                        <Text size="2" weight="medium" style={{ color: skillGroup.color }}>
                          {complexityValues[index] || 1}
                        </Text>
                      </Flex>

                      <Box style={{ padding: '0 4px' }}>
                        <Slider
                          value={[complexityValues[index] || 1]}
                          onValueChange={(values) => handleComplexityChange(groupIndex, skillIndex, values[0])}
                          min={1}
                          max={4}
                          step={1}
                          color="ruby"
                        />
                      </Box>

                      <Flex justify="between" mt="1">
                        <Text size="1" color="gray">Least Complex</Text>
                        <Text size="1" color="gray">Most Complex</Text>
                      </Flex>
                    </Flex>

                  );
                })}
              </Flex>
            </Card>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default ComplexityLevelForm;
