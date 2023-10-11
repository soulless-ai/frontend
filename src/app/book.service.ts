import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface searchOptionsSelect {
  query: string;
  author: string;
  language: string;
  genre: string;
  minPage: string;
  maxPage: string;
}

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

  // Поиск
  searchBooks(searchOptions: searchOptionsSelect): Observable<any[]> {
    let params = new HttpParams();
  
    console.log(searchOptions);
    if (searchOptions.query) {
      params = params.set('query', searchOptions.query);
    }
    if (searchOptions.author) {
      params = params.set('author', searchOptions.author);
    }
    if (searchOptions.language) {
      params = params.set('language', searchOptions.language);
    }
    console.log(searchOptions.language);
    if (searchOptions.genre) {
      params = params.set('genre', searchOptions.genre);
    }
    if (searchOptions.minPage) {
      params = params.set('minPage', searchOptions.minPage);
    }
    if (searchOptions.maxPage) {
      params = params.set('maxPage', searchOptions.maxPage);
    }
  
    console.log(params);
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
