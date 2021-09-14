import { Flex, Box, Avatar, Text } from "@chakra-ui/react";

export default function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Carlos Oliveira</Text>
        <Text color="gray.300" fontSize="small">carlos.burndev@gmail.com</Text>
      </Box>
      <Avatar size="md" name="Carlos Oliveira" src="https://avatars.githubusercontent.com/u/54965836?v=4" />
    </Flex>
  )
}