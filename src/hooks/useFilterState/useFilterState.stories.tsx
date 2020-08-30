import * as React from 'react';
import { Level, LevelItem } from '@patternfly/react-core';
import { Table, TableHeader, TableBody, ICell, IRow } from '@patternfly/react-table';
import { useFilterState } from './useFilterState';
import { FilterToolbar, FilterType, FilterCategory } from '../../components/FilterToolbar';

export const FilterableTable: React.FunctionComponent = () => {
  // import { Table, TableHeader, TableBody, ICell, IRow } from '@patternfly/react-table';

  interface IFruit {
    name: string;
    price: string;
  }

  const fruits: IFruit[] = [
    { name: 'Apple', price: '$0.83' },
    { name: 'Orange', price: '$0.74' },
    { name: 'Banana', price: '$0.45' },
  ];

  const filterCategories: FilterCategory[] = [
    {
      key: 'name',
      title: 'Name',
      type: FilterType.search,
      placeholderText: 'Filter by name...',
    },
  ];

  const { filterValues, setFilterValues, filteredItems } = useFilterState<IFruit>({
    items: fruits,
    filterCategories: filterCategories,
  });

  const columns: ICell[] = [{ title: 'Name' }, { title: 'Price' }];
  const rows: IRow[] = [];
  filteredItems.forEach((fruit) => {
    rows.push({
      meta: { fruit },
      cells: [fruit.name, fruit.price],
    });
  });

  return (
    <>
      <Level>
        <LevelItem>
          <FilterToolbar
            filterCategories={filterCategories}
            filterValues={filterValues}
            setFilterValues={setFilterValues}
          />
        </LevelItem>
      </Level>
      <Table variant="compact" aria-label="Fruits table" cells={columns} rows={rows}>
        <TableHeader />
        <TableBody />
      </Table>
    </>
  );
};
