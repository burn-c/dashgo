import { useState } from "react";
import {
  Button,
  Icon,
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  Spinner,
  Link
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import NextLink from 'next/link'

import { Sidebar, Pagination, Header } from "../../components";

import { useUsers } from "../services/hooks/useUsers";
import { queryClient } from "../services/queryClient";
import { api } from "../services/api";

export default function UserList() {
  const [currentPage, setCurrentpage] = useState(1)
  const { data, isLoading, isFetching, error } = useUsers(currentPage)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data
    }, {
      staleTime: 1_000 * 60 * 10 // 10 minutes
    })
  }

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
            <NextLink href="/users/create" passHref >
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>

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
                  data?.users?.map(({ id, name, email, createdAt }) => {
                    return (
                      <Tr key={id}>
                        <Td px={['4', '4', '6']}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link color="purple" onMouseEnter={() => handlePrefetchUser(Number(id))}>
                              <Text fontWeight="bold">{name}</Text>
                            </Link>
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
            <Pagination
              totalCountOfRegisters={data?.totalCount}
              currentPage={currentPage}
              onPageChange={setCurrentpage}
            />
          </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}