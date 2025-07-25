import { SelectOption } from '../../../../shared/atoms/select/interfaces/select.interface';
import { SearchResult } from '../../../../shared/organisms/filter-panel/interfaces/filter-panel.interface';
import { Book } from './book.interface';

export interface BookState {
  books: Book[];
  categories: SelectOption[];
  filters: SearchResult;
}

export const INITIAL_BOOK_STATE: BookState = {
  books: [],
  categories: [],
  filters: {
    category: '',
    min: null,
    max: null,
  },
};
