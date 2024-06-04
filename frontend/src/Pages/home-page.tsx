import { Divider, Flex, Spacer } from "@chakra-ui/react";
import { Head, ThreadCard, ThreadProps } from "../Components/Element/Card/card";
import { Sidebar } from "../Components/Sidebar/side-bar";
import { RightBar } from "../Components/Sidebar/right-bar";
import { useEffect, useState } from "react";
import "../index.css";

function Home() {
  const [users, setUsers] = useState<ThreadProps[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/data.json");
      const data: ThreadProps[] = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <Flex gap="5">
        <Sidebar />
        <Divider orientation="vertical" />
        <Spacer />
        <Flex direction="column" gap="2">
          <Head />
          {users.map((user) => (
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
          ))}
        </Flex>
        <Divider orientation="vertical" />
        <Spacer />
        <RightBar />
      </Flex>
    </div>
  );
}

export default Home;
