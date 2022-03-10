import { Button } from '@chakra-ui/react'

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export default function PaginationItem({ number, isCurrent = false, onPageChange }: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bgColor: 'pink.500',
          cursor: 'default'
        }}
      >
        {number}
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      colorScheme="gray.700"
      bg="gray.500"
      _hover={{
        bg: 'gray.300'
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}