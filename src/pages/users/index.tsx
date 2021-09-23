import { Button, Icon, Box, Flex, Heading, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Link from 'next/link'
import { useQuery } from 'react-query'

import { Sidebar, Pagination, Header } from "../../components";
import { useEffect } from "react";
import { api } from "../services/api";

export default function UserList() {
  const { data, isLoading, isFetching, error } = useQuery('users', async () => {
    const { data } = await api.get('users')

    const users = data.users.map(({ id, name, email, createdAt }) => {
      return {
        id, name, email, createdAt: new Date(createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    })
    return users
  },
    {
      staleTime: 1000 * 5, // 5 seconds
    }
  )

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })


  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {
                !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />
              }
            </Heading>
            <Link href="/users/create" passHref >
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>

          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex>
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (<>
            <Table colorScheme="witeAlpha">
              <Thead>
                <Tr>
                  <Th px={['4', '4', '6']} color="gray.300" width="8">
                    <Checkbox colorScheme="pink" />
                  </Th>
                  <Th>Usuários</Th>
                  {isWideVersion && <Th>Data de cadastro</Th>}
                  <Th width="8">Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  data.map(({ id, name, email, createdAt }) => {
                    return (
                      <Tr key={id}>
                        <Td px={['4', '4', '6']}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{name}</Text>
                            <Text fontWeight="sm" color="gray.300">{email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{createdAt}</Td>}
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            Editar
                          </Button>
                        </Td>
                      </Tr>
                    )
                  })
                }


              </Tbody>
            </Table>
            <Pagination />
          </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}