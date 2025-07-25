import { Book } from './book.interface';

export interface SeachResponse {
  accepted: Book[];
  rejected: string[];
}
