import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: any; // Объект, представляющий книгу
  isEditMode: boolean = false; // Флаг для определения, находится ли компонент в режиме редактирования

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const bookId = +params['id']; // Получение ID книги из URL
      this.getBookDetails(bookId);
    });
  }

  getBookDetails(bookId: number) {
    this.bookService.getBookById(bookId).subscribe((data: any) => {
      this.book = data;
    });
  }

  // Метод для включения режима редактирования
  editBook() {
    this.isEditMode = true;
  }

  // Метод для сохранения изменений
  saveChanges() {
    // Отправьте данные книги на сервер, чтобы сохранить изменения
    // После успешного сохранения можно отключить режим редактирования
    this.isEditMode = false;
  }

  // Метод для отмены редактирования и возврата к предыдущей версии данных
  cancelEdit() {
    // Здесь вы можете вернуть к предыдущей версии данных или сбросить изменения формы
    // После этого отключите режим редактирования
    this.isEditMode = false;
  }
}
