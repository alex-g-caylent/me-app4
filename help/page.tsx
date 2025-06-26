import { Flex, Tabs } from "@radix-ui/themes";
import React, { Suspense } from "react";
import AboutMaestro from "./_components/AboutMaestro";
import GettingStarted from "./_components/GettingStarted";
import FeaturesChatMaestro from "./_components/FeaturesChatMaestro";
import FeaturesHomePage from "./_components/FeaturesHomePage";
import FeaturesProfile from "./_components/FeaturesProfile";
import FeaturesLibrary from "./_components/FeaturesLibrary";
import FAQ from "./_components/FAQ";
import PromptIntro from "./_components/PromptIntro";
import PromptTips from "./_components/PromptTips";
import PromptTable from "./_components/PromptTable";

const HelpPage = async () => {
	return (
		<div>
			<Suspense>
				<Flex direction="column" mt="5" mx="auto" gap="5">
					<Tabs.Root defaultValue="about-maestro">
						<Tabs.List className="max-w-[1100px] mx-auto">
							<Tabs.Trigger value="about-maestro">About Maestro</Tabs.Trigger>
							<Tabs.Trigger value="prompt-engineering">
								Prompt Engineering
							</Tabs.Trigger>
							<Tabs.Trigger value="faq">FAQ</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="about-maestro">
							<AboutMaestro />
							<GettingStarted />
							<FeaturesChatMaestro />
							<FeaturesHomePage />
							<FeaturesProfile />
							<FeaturesLibrary />
						</Tabs.Content>
						<Tabs.Content value="prompt-engineering">
							<PromptIntro />
							<PromptTips />
							<PromptTable />
						</Tabs.Content>
						<Tabs.Content value="faq">
							<FAQ />
						</Tabs.Content>
					</Tabs.Root>
				</Flex>
			</Suspense>
		</div>
	);
};

export default HelpPage;
