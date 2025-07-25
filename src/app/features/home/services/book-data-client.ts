import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from './interfaces/book.interface';
import { SeachResponse } from './interfaces/request.interface';
import { ApiResponse } from '../../../core/interfaces/api-response';
import { SearchResult } from '../../../shared/organisms/filter-panel/interfaces/filter-panel.interface';

@Injectable({
  providedIn: 'root',
})
export class BookDataClient {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  public searchBooks(): Observable<SeachResponse> {
    return this.http
      .get<ApiResponse<SeachResponse>>(`${this.baseUrl}/book-scraper`)
      .pipe(map((resp) => resp.data));
  }

  public getCategories(): Observable<string[]> {
    return this.http
      .get<ApiResponse<string[]>>(`${this.baseUrl}/books/categories`)
      .pipe(map((resp) => resp.data));
  }

  public getBooks(filter?: SearchResult | null): Observable<Book[]> {
    let params = new HttpParams();
    if (filter?.category) params = params.set('category', filter.category);
    if (filter?.min != null) {
      params = params.set('min', filter.min ?? 0);
    }
    if (filter?.max != null) {
      params = params.set('max', filter.max ?? 0);
    }
    return this.http
      .get<ApiResponse<Book[]>>(`${this.baseUrl}/books`, { params })
      .pipe(map((resp) => resp.data));
  }

  public getBook(id: number) {
    return this.http
      .get<ApiResponse<Book | null>>(`${this.baseUrl}/books/${id}`)
      .pipe(map((resp) => resp.data));
  }
}
