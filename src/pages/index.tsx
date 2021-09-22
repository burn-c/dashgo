import { Flex, Button, Stack, FormControl, FormLabel } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../components/Form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória')
})


export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })
  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    console.log(values)
  }

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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">

          <FormControl>
            <Input
              id="email"
              name="email"
              type="email"
              label="E-mail"
              error={errors.email}
              {...register('email')}
            />
          </FormControl>

          <FormControl>
            <Input
              id="password"
              name="password"
              type="password"
              label="Senha"
              error={errors.password}
              {...register('password')}
            />
          </FormControl>
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" isLoading={formState.isSubmitting}>Entrar</Button>
      </Flex>
    </Flex>
  )
}
