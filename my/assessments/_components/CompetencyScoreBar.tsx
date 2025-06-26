import { Box, Flex, Text } from "@radix-ui/themes";

interface CompetencyScoreBarProps {
  currentLevel: number;
  averageLevel: number;
}

const CompetencyScoreBar = ({ currentLevel, averageLevel }: CompetencyScoreBarProps) => {
  return (
    <Flex>
      <Box position="relative" width="500px" height="30px">
        {/* Background line */}
        <Box 
          position="absolute" 
          top="50%" 
          left="0" 
          width="100%" 
          height="2px" 
          style={{ backgroundColor: 'var(--gray-6)' }}
        />
        
        {/* Score markers */}
        {[0, 1, 2, 3, 4, 5].map((score) => (
          <Box
            key={score}
            position="absolute"
            top="50%"
            style={{ 
              left: `${(score / 5) * 100}%`,
              transform: 'translateY(-50%)'
            }}
          >
            <Box 
              height="12px" 
              width="2px" 
              style={{ backgroundColor: 'var(--gray-6)' }}
            />
            <Text
              size="1"
              color="gray"
              position="absolute"
              style={{
                bottom: '-24px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              {score}
            </Text>
          </Box>
        ))}

        {/* Current Level dot */}
        <Box
          position="absolute"
          top="50%"
          width="16px"
          height="16px"
          style={{
            left: `${(currentLevel / 5) * 100}%`,
            transform: 'translate(-8px, -50%)',
            backgroundColor: '#2B4C7E',
            borderRadius: '50%',
            zIndex: 2
          }}
        />

        {/* Average Level dot */}
        <Box
          position="absolute"
          top="50%"
          width="16px"
          height="16px"
          style={{
            left: `${(averageLevel / 5) * 100}%`,
            transform: 'translate(-8px, -50%)',
            backgroundColor: '#C5A572',
            borderRadius: '50%',
            zIndex: 1
          }}
        />
      </Box>
    </Flex>
  );
};

export default CompetencyScoreBar;
