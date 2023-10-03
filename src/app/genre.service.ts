// Импортируйте необходимые модули
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private baseUrl: string = 'http://your-backend-url/api/genres'; // Замените на ваш URL

  constructor(private http: HttpClient) {}

  // Получение списка жанров
  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Создание нового жанра
  createGenre(genreData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, genreData);
  }

  // Получение данных о жанре по ID
  getGenreById(genreId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${genreId}`);
  }

  // Обновление данных о жанре по ID
  updateGenre(genreId: number, genreData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${genreId}`, genreData);
  }

  // Удаление жанра по ID
  deleteGenre(genreId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${genreId}`);
  }
}