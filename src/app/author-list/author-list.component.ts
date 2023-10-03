import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  authors: any[]; // Массив авторов
  selectedAuthor: any = null; // Выбранный автор для редактирования
  newAuthorMode: boolean = false; // Режим создания нового автора
  searchQuery: string = ''; // Строка поиска

  constructor(private authorService: AuthorService) {}

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    // Получение списка авторов с сервера
    this.authorService.getAuthors().subscribe((data: any[]) => {
      this.authors = data;
    });
  }

  selectAuthor(author: any) {
    // Выбор автора для редактирования
    this.selectedAuthor = author;
  }

  createAuthor() {
    // Включение режима создания нового автора
    this.newAuthorMode = true;
  }

  saveAuthor(author: any) {
    // Сохранение или создание автора
    if (author.id) {
      // Редактирование существующего автора
      this.authorService.updateAuthor(author.id, author).subscribe(() => {
        // Обновление списка авторов после успешного редактирования
        this.getAuthors();
        this.selectedAuthor = null;
      });
    } else {
      // Создание нового автора
      this.authorService.createAuthor(author).subscribe(() => {
        // Обновление списка авторов после успешного создания
        this.getAuthors();
        this.newAuthorMode = false;
      });
    }
  }

  cancelEdit() {
    // Отмена редактирования или создания
    this.selectedAuthor = null;
    this.newAuthorMode = false;
  }

  // Другие методы для удаления автора и другой функциональности

}