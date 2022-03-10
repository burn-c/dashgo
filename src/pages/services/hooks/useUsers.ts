import { useQuery } from 'react-query'
import { api } from "../api"

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

export async function getUsers(currentPage: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('users', {
    params: {
      page: currentPage,
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map(({ id, name, email, createdAt }) => {
    return {
      id, name, email, createdAt: new Date(createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return { users, totalCount }
}


export function useUsers(currentPage: number) {
  return useQuery(['users', currentPage], () => getUsers(currentPage), {
    staleTime: 1000 * 5, // 5 seconds
  },
  )
}