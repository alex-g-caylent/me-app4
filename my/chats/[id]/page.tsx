import { getChat } from "../../../utils/api/requests"
import { Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { Suspense } from "react";
import Sidebar from "../_components/Sidebar";
import MobileChatsMenu from "../_components/MobileChatsMenu";
import ChatContainer from "../_components/ChatContainer";
import { useSearchParams } from "next/navigation";

const ChatPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const chat = await getChat((await params).id);
  const initialPrompt = (await searchParams)?.prompt as string | undefined;

  return (
    <Flex height={"80vh"} overflowX={"hidden"}>
      <Sidebar />
      <Flex id="chatArea" align="center" height="100%" width="100%">
        <Suspense>
          <Flex
            direction="column"
            width="100%"
            height="100%"
            style={{
              backgroundImage: "url(/bgchat.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundColor: "white",
              backgroundPositionY: "100px",
            }}
          >
            {/* Header */}
            <Flex justify={"between"} align={"center"} px="3">
              <Flex direction={"column"}>
                <Heading mb="2" size="4">
                  {chat.name}
                </Heading>
                {chat?.messages?.length === 0 && !initialPrompt && (
                  <Text>Let me help you with your research</Text>
                )}
              </Flex>
              <MobileChatsMenu />
            </Flex>
            <Separator my="3" size="4" />

            {/* Messages + Chatbot with shared streaming state */}
            <ChatContainer chat={chat} initialPrompt={initialPrompt} />
          </Flex>
        </Suspense>
      </Flex>
    </Flex>
  );
};

export default ChatPage;