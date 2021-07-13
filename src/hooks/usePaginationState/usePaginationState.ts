import * as React from 'react';
import { PaginationProps } from '@patternfly/react-core';

export type PaginationStateProps = Pick<
  PaginationProps,
  'itemCount' | 'perPage' | 'page' | 'onSetPage' | 'onPerPageSelect'
>;

export interface IPaginationStateHook<T> {
  currentPageItems: T[];
  setPageNumber: (pageNumber: number) => void;
  paginationProps: PaginationStateProps;
}

export const usePaginationState = <T>(
  items: T[],
  initialItemsPerPage: number
): IPaginationStateHook<T> => {
  const [pageNumber, setPageNumber] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(initialItemsPerPage);

  const pageStartIndex = (pageNumber - 1) * itemsPerPage;
  const currentPageItems = items.slice(pageStartIndex, pageStartIndex + itemsPerPage);

  const paginationProps: PaginationStateProps = {
    itemCount: items.length,
    perPage: itemsPerPage,
    page: pageNumber,
    onSetPage: (_event, pageNumber) => setPageNumber(pageNumber),
    onPerPageSelect: (_event, perPage) => setItemsPerPage(perPage),
  };

  return { currentPageItems, setPageNumber, paginationProps };
};
