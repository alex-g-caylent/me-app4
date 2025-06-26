import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon, Flex, Heading, Separator, Text } from "@radix-ui/themes";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  variant?: "default" | "bordered";
}

const FAQItem = ({ question, answer, index, variant = "default" }: FAQItemProps) => {
  const bgClass = variant === "default" ? "bg-slate-100" : "border-slate-100 border-[1px]";

  return (
    <Accordion.Root type="single" collapsible className={`${bgClass} p-5`}>
      <Accordion.Item value={`item-${index}`}>
        <Accordion.Header>
          <Accordion.Trigger className="w-[100%]">
            <Flex justify={"between"} align={"center"} width={"100%"}>
              <Heading as="h3" size="5" weight="light">
                {index}. {question}
              </Heading>
              <ChevronDownIcon width={15} height={15} />
            </Flex>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <Separator my="3" size="4" />
          <Text className="readable" mb="5">
            {answer}
          </Text>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default FAQItem;
