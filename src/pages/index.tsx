import { Flex, Button, Stack, FormControl, FormLabel } from '@chakra-ui/react'

import { Input } from '../components/Form'

export default function SignIn() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4">

          <FormControl>
            <Input
              id="email"
              name="email"
              type="email"
              label="E-mail"
            />
          </FormControl>

          <FormControl>
            <Input
              id="password"
              name="password"
              type="password"
              label="Senha"
            />
          </FormControl>
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink">Entrar</Button>
      </Flex>
    </Flex>
  )
}
