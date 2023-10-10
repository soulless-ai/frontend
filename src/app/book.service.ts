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
  searchBooks(searchQuery: string): Observable<any[]> {
    let params = new HttpParams();
    params = params.set('searchQuery', searchQuery);
    return this.http.get<any[]>(`${this.baseUrl}/get-books`, { params });
  }
  onAuthorMultiSelectChange(authors: { value: any[] }) {
    const authorsString = authors.value.join(',');
    let params = new HttpParams();
    params = params.set('searchAuthors', authorsString);
    return this.http.get<any[]>(`${this.baseUrl}/get-books`, { params });
  }  
  onLanguageMultiSelectChange(languages: { value: any[] }) {
    const languagesString = languages.value.join(',');
    let params = new HttpParams();
    params = params.set('searchLanguages', languagesString);
    return this.http.get<any[]>(`${this.baseUrl}/get-books`, { params });
  }
  onPagesFilterChange(minPage: number, maxPage: number): Observable<any[]> {
    let params = new HttpParams();
    params = params.set('minPage', minPage.toString());
    params = params.set('maxPage', maxPage.toString());
    return this.http.get<any[]>(`${this.baseUrl}/get-books`, { params });
  }
  onGenreFilterChange(genre: string): Observable<any[]> {
    let params = new HttpParams();
    params = params.set('genre', genre);
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
