import { SelectOption } from '../../../atoms/select/interfaces/select.interface';

export interface SearchResult {
  category: string;
  min: number | null;
  max: number | null;
}

export interface FilterPanelData {
  placeholder: string;
  options: SelectOption[];
  filters: SearchResult;
}

