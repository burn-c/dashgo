import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";

import PaginationItem from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const SIBLINGS_COUNT_PAGE = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  currentPage = 1,
  onPageChange,
  registersPerPage = 10
}: PaginationProps) {
  // Calculate the number of pages and round up
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage)


  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - SIBLINGS_COUNT_PAGE, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + SIBLINGS_COUNT_PAGE, lastPage))
    : []

  return (
    <Stack
      direction={['column', 'row']}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>

      <Stack direction="row" spacing="2">
        {currentPage > (1 + SIBLINGS_COUNT_PAGE) && (
          <>
            <PaginationItem number={1} />
            {currentPage > (2 + SIBLINGS_COUNT_PAGE) &&
              <Text color="gray.300" width={8} textAlign="center">...</Text>}
          </>
        )
        }

        {previousPages.length > 0 && previousPages.map(page =>
          <PaginationItem key={`pagination-previous-${page}`} number={page} />
        )}

        <PaginationItem number={currentPage} isCurrent />

        {nextPages.length > 0 && nextPages.map(page =>
          <PaginationItem key={`pagination-next-${page}`} number={page} />
        )}

        {(currentPage + SIBLINGS_COUNT_PAGE) < lastPage && (
          <>
            {(currentPage + 1 + SIBLINGS_COUNT_PAGE) < lastPage &&
              <Text color="gray.300" width={8} textAlign="center">...</Text>}
            <PaginationItem number={lastPage} />
          </>
        )}


      </Stack>
    </Stack >
  )
}