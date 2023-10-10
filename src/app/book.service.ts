import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable ({
  providedIn: 'root'
})
export class BookService {
  private baseUrl: string = 'http://localhost:80/api/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
  getAuthors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-authors`);
  }
  getLanguages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-languages`);
  }
  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-genres`);
  }

  // Поиск книги по названию и описанию
  searchBooks(searchQuery: string, searchAuthors: string[], searchLanguages: string[], searchGenre: string[], searchMinPage: number, searchMaxPage: number): Observable<any[]> {
    let params = new HttpParams();
    params = params.set('searchQuery', searchQuery);
    if (searchAuthors.length > 0) {
        params = params.set('searchAuthors', JSON.stringify(searchAuthors));
    }
    if (searchLanguages.length > 0) {
        params = params.set('searchLanguages', JSON.stringify(searchLanguages));
    }
    if (searchGenre.length > 0) {
        params = params.set('searchGenre', JSON.stringify(searchGenre));
    }
    if (searchMinPage !== undefined && searchMinPage !== null) {
        params = params.set('searchMinPage', searchMinPage.toString());
    }
    if (searchMaxPage !== undefined && searchMaxPage !== null) {
        params = params.set('searchMaxPage', searchMaxPage.toString());
    }
    return this.http.get<any[]>(`${this.baseUrl}/get-books`, { params });
  }
  
  onAuthorMultiSelectChange(authors: { value: any[] }) {
    const authorsArray = JSON.stringify(authors.value);
    let params = new HttpParams();
    params = params.set('searchAuthors', authorsArray);
    return this.http.get<any[]>(`${this.baseUrl}/get-books`, { params });
  }
  onLanguageMultiSelectChange(languages: { value: any[] }) {
    const languagesString = JSON.stringify(languages.value);
    let params = new HttpParams();
    params = params.set('searchLanguages', languagesString);
    return this.http.get<any[]>(`${this.baseUrl}/get-books`, { params });
  }
  onPagesFilterChange(minPage: number, maxPage: number): Observable<any[]> {
    let params = new HttpParams();
    if (minPage !== undefined && minPage !== null) {
        params = params.set('searchMinPage', minPage.toString());
    }
    
    if (maxPage !== undefined && maxPage !== null) {
        params = params.set('searchMaxPage', maxPage.toString());
    }
    return this.http.get<any[]>(`${this.baseUrl}/get-books`, { params });
  }
  onGenreFilterChange(genre: { value: any[] }): Observable<any[]> {
    const genresString = JSON.stringify(genre.value);
    let params = new HttpParams();
    params = params.set('searchGenre', genresString);
    return this.http.get<any[]>(`${this.baseUrl}/get-books`, { params });
  }

  // Создание новой книги
  createBook(bookData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, bookData);
  }

  // Получение данных о книге по ID
  getBookById(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${bookId}`);
  }

  // Обновление данных книги по ID
  updateBook(bookId: number, bookData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${bookId}`, bookData);
  }
}
