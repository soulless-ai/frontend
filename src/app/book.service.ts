import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl: string = 'http://your-backend-url/api/books'; // Замените на ваш URL

  constructor(private http: HttpClient) {}

  // Получение списка книг с фильтрацией
  getBooks(
    searchQuery: string,
    authors: string[],
    languages: string[],
    pages: string[],
    genre: string
  ): Observable<any[]> {
    // Создаем параметры запроса
    let params = new HttpParams();
    params = params.set('searchQuery', searchQuery);
    if (authors && authors.length > 0) {
      params = params.set('authors', authors.join(','));
    }
    if (languages && languages.length > 0) {
      params = params.set('languages', languages.join(','));
    }
    if (pages && pages.length > 0) {
      params = params.set('pages', pages.join(','));
    }
    if (genre) {
      params = params.set('genre', genre);
    }
  
    // Выполняем GET-запрос к серверу
    return this.http.get<any[]>(`${this.baseUrl}`, { params });
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