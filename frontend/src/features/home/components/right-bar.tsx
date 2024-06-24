import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

import { EditProfile } from "../../../Components/Element/Button/edit";
import { EditModal } from "../../../Components/Element/Modal/edit-modal";

import { Suggested } from "../../../Components/Element/Card/suggest-card";
import { HeadProfile } from "../../../Components/Element/Heading/head-profile";
import { useUpdate } from "../../profile/hook/use-update";

export function RightBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useUpdate();

  return (
    <>
      <Box m="5" maxW="sm">
        <Card bg="#262626">
          <CardBody>
            <Heading fontSize="xl" m="3" ms="1" color="white" fontWeight="bold">
              My Profile
            </Heading>
            <HeadProfile />
            <Flex justify="flex-end">
              <EditProfile
                fontSize="12"
                px="12"
                py="3"
                bottom="6"
                onClick={onOpen}
              />
              <EditModal isOpen={isOpen} onClose={onClose} />
            </Flex>
            <Flex direction="column" position="relative" bottom="4">
              <Text color="white" fontSize="xl" fontWeight="semibold">
                {user?.fullName}
              </Text>
              <Text color="grey" fontSize="12" mb="2">
                @{user?.username}
              </Text>
              <Text color="white" fontSize="12" fontWeight="medium">
                {user?.bio}
              </Text>
              <HStack spacing={"2"}>
                <Text color="white" fontSize="12">
                  2
                </Text>
                <Text color="grey" fontSize="12">
                  Following
                </Text>
                <Text color="white" fontSize="12">
                  100
                </Text>
                <Text color="grey" fontSize="12">
                  Likes
                </Text>
              </HStack>
            </Flex>
          </CardBody>
        </Card>
        <Card bg="#262626" mt="3">
          <Suggested />
        </Card>

        <Card bg="#262626" mt="3">
          <CardBody>
            <HStack spacing="3">
              <Text color="white" fontWeight="medium" fontSize="14">
                Developed By Aristu
              </Text>
              <Spacer />
              <Icon color="grey" as={FaGithub} />
              <Icon color="grey" as={FaLinkedin} />
              <Icon color="grey" as={FaInstagram} />
              <Icon color="grey" as={FaFacebook} />
            </HStack>
            <Text color="grey" fontSize={"12"}>
              Powered by Dumbways Indonesia Coding Bootcamp #1 Indonesia
            </Text>
          </CardBody>
        </Card>
      </Box>
    </>
  );
}

// export function UserFollow() {
//   const [isFollowing, setIsFollowing] = useState<boolean>(false);

//   const handleFollow = () => {
//     setIsFollowing((prev) => !prev);
//   };
//   return (
//     <>
//       <HStack>
//         <Avatar boxSize="2em" />
//         <VStack spacing="0">
//           <Text color="white" fontSize="14" ms="3">
//             Ahmad Yahya
//           </Text>
//           <Text color="grey" fontSize="12" me="6">
//             @ahmad
//           </Text>
//         </VStack>
//         <Spacer />
//         <Follow></Follow>
//       </HStack>
//       <HStack>
//         <Avatar boxSize="2em" />
//         <VStack spacing="0">
//           <Text color="white" fontSize="14" ms="3">
//             Fajar Satrio
//           </Text>
//           <Text color="grey" fontSize="12" me="6">
//             @fajar
//           </Text>
//         </VStack>
//         <Spacer />
//         <Follow></Follow>
//       </HStack>
//       <HStack>
//         <Avatar boxSize="2em" />
//         <VStack spacing="0">
//           <Text color="white" fontSize="14" ms="3">
//             Cahyo Pratama
//           </Text>
//           <Text color="grey" fontSize="12" me="10">
//             @cahyo
//           </Text>
//         </VStack>
//         <Spacer />
//         <Follow
//           fontSize="14"
//           onClick={handleFollow}
//           isFollowing={isFollowing}
//         ></Follow>
//       </HStack>
//     </>
//   );
// }
