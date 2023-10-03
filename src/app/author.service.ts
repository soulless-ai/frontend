import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private baseUrl: string = 'http://your-backend-url/api/authors'; // Замените на ваш URL

  constructor(private http: HttpClient) {}

  // Получение списка авторов
  getAuthors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Создание нового автора
  createAuthor(authorData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, authorData);
  }

  // Получение данных об авторе по ID
  getAuthorById(authorId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${authorId}`);
  }

  // Обновление данных об авторе по ID
  updateAuthor(authorId: number, authorData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${authorId}`, authorData);
  }
}