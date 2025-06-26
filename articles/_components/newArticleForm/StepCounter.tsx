"use client";

import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface StepCounterProps {
  currentStep: number;
  steps: string[];
  showLabels?: { initial: boolean; md: boolean } | boolean;
  order?: { initial: number; md: number };
}

const StepCounter = ({ currentStep, steps, showLabels = true, order }: StepCounterProps) => {
  const lineColor = '#e4e4e7';
  const completedColor = '#4a5568';
  const stepWidth = 100; // Width for each step container
  
  return (
    <Flex 
      direction="row" 
      mb="4" 
      justify="center" 
      style={{ position: 'relative', width: 'fit-content' }}
      order={order}
    >
      {/* Single connecting line behind all steps */}
      <Box 
        style={{
          position: 'absolute',
          height: '2px',
          backgroundColor: lineColor,
          width: `${(steps.length - 1) * stepWidth}px`,
          top: '20px',
          left: '40px',
          zIndex: 0,
        }}
      />
      
      {/* Step counters with labels */}
      {steps.map((step, index) => {
        // Determine the state of this step
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isFuture = index > currentStep;
        
        return (
          <Flex 
            key={index} 
            direction="column" 
            align="center" 
            style={{ 
              zIndex: 1,
              width: `${stepWidth}px`,
            }}
          >
            <Flex 
              align="center" 
              justify="center" 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: isCompleted ? completedColor : isCurrent ? '#e2e8f0' : 'white',
                color: isCompleted ? 'white' : completedColor,
                fontWeight: 'bold',
                marginBottom: '10px',
                padding: '4px',
                border: `${isCurrent ? '2px' : '1px'} solid ${isFuture ? lineColor : completedColor}`,
              }}
            >
              {index + 1}
            </Flex>
            {(typeof showLabels === 'boolean' ? showLabels : showLabels.initial || showLabels.md) && (
              <Text 
                size="2" 
                weight={isCurrent ? "bold" : "regular"}
                style={{
                  color: completedColor,
                  textAlign: 'center',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: typeof showLabels === 'boolean' 
                    ? (showLabels ? 'block' : 'none') 
                    : undefined,
                }}
                display={typeof showLabels === 'object' ? showLabels : undefined}
              >
                {step}
              </Text>
            )}
          </Flex>
        );
      })}
    </Flex>
  );
};

export default StepCounter;