import { Box, Divider, Flex, Spacer } from "@chakra-ui/react";
import { Head } from "../Components/Element/Card/card";

import { RightBar } from "../features/home/components/right-bar";

import "../index.css";
import { Sidebar } from "../features/home/components/side-bar";

import { HomeThreads } from "../features/home/components/home-threads";

import { useHomePage } from "../features/home/hook/use-home";

function Home() {
  const { threads } = useHomePage();

  console.log("Home threads:", threads);
  return (
    <div>
      <Box display={"flex"} gap={"2"}>
        <Sidebar />
        <Divider orientation="vertical" />
        <Spacer />
        <Flex direction="column" gap="2">
          <Head />
          <Box>
            {threads?.map((thread) => (
              <HomeThreads key={thread.id} thread={thread} />
            ))}
          </Box>
        </Flex>
        <Divider orientation="vertical" />
        <Spacer />
        <RightBar />
      </Box>
    </div>
  );
}

export default Home;

{
  /* {Array.isArray(threads) ? (
                threads.map((thread) => <HomeThreads thread={thread} />)
              ) : (
                <div>Loading...</div>
              )} */
}
{
  /* {users.map((user) => (
            <ThreadCard
              key={user.id}
              name={user.name}
              username={user.username}
              avatar={user.avatar}
              image={user.image}
              post={user.post}
              like={user.like}
              comment={user.comment}
            />
          ))} */
}
