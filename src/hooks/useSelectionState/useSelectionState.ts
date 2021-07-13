import * as React from 'react';

export interface ISelectionStateArgs<T> {
  items: T[];
  initialSelected?: T[];
  isEqual?: (a: T, b: T) => boolean;
  externalState?: [T[], React.Dispatch<React.SetStateAction<T[]>>];
  preserveOrder?: boolean;
}

export interface ISelectionState<T> {
  selectedItems: T[];
  isItemSelected: (item: T) => boolean;
  toggleItemSelected: (item: T, isSelecting?: boolean) => void;
  selectMultiple: (items: T[], isSelecting: boolean) => void;
  areAllSelected: boolean;
  selectAll: (isSelecting?: boolean) => void;
  setSelectedItems: (items: T[]) => void;
}

export const useSelectionState = <T>({
  items,
  initialSelected = [],
  isEqual = (a, b) => a === b,
  externalState,
  preserveOrder = true,
}: ISelectionStateArgs<T>): ISelectionState<T> => {
  const internalState = React.useState<T[]>(initialSelected);
  const [selectedItems, setSelectedItems] = externalState || internalState;

  const isItemSelected = (item: T) => selectedItems.some((i) => isEqual(item, i));

  const toggleItemSelected = (item: T, isSelecting = !isItemSelected(item)) => {
    if (isSelecting) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => !isEqual(i, item)));
    }
  };

  const selectMultiple = (items: T[], isSelecting: boolean) => {
    const otherSelectedItems = selectedItems.filter(
      (selected) => !items.some((item) => isEqual(selected, item))
    );
    if (isSelecting) {
      setSelectedItems([...otherSelectedItems, ...items]);
    } else {
      setSelectedItems(otherSelectedItems);
    }
  };

  const selectAll = (isSelecting = true) => setSelectedItems(isSelecting ? items : []);
  const areAllSelected = selectedItems.length === items.length;

  let selectedItemsInOrder: T[] = selectedItems;
  if (preserveOrder && !areAllSelected && selectedItems.length > 0) {
    // Preserve original order of items (slight performance cost: traverses all items on every selection change)
    selectedItemsInOrder = items.filter(isItemSelected);
  }

  return {
    selectedItems: selectedItemsInOrder,
    isItemSelected,
    toggleItemSelected,
    selectMultiple,
    areAllSelected,
    selectAll,
    setSelectedItems,
  };
};
