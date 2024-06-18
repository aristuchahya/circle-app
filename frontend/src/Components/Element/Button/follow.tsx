import { Button } from "@chakra-ui/react";
import { useFollows } from "../../../features/follows/hook/use-follows";
import { FollowsCardProps } from "../Card/follows-card";

export function Follow({ userId, initialIsFollowing }: FollowsCardProps) {
  const { handleFollow, isFollowing } = useFollows({
    userId,
    initialIsFollowing,
  });

  return (
    <>
      <Button
        px="12"
        py="3"
        boxSize="6"
        rounded="20"
        position="relative"
        fontSize="12"
        border="1px solid white"
        bg="#262626"
        color="white"
        fontWeight="md"
        _hover={{ bg: "white", color: "black" }}
        onClick={handleFollow}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </>
  );
}
