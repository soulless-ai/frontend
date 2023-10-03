import { Component, OnInit } from '@angular/core';
import { GenreService } from '../genre.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {
  genres: any[]; // массив жанров
  selectedGenre: string = ''; // выбранный жанр для фильтра
  searchQuery: string = ''; // строка поиска

  constructor(private genreService: GenreService) {}

  ngOnInit() {
    // Инициализация данных
    this.getGenres();
  }

  getGenres() {
    // Получение списка жанров с сервера
    this.genreService.getGenres().subscribe((data: any[]) => {
      this.genres = data;
    });
  }

  createGenre() {
    // Логика создания нового жанра
    const newGenre = {
      name: 'Новый жанр' // Замените на значения из вашей формы
    };

    this.genreService.createGenre(newGenre).subscribe((data: any) => {
      // Обновление списка жанров после создания
      this.getGenres();
    });
  }

  editGenre(id: number) {
    // Получите текущий жанр по ID с сервера (необязательно, если у вас уже есть данные)
    this.genreService.getGenreById(id).subscribe((genreData: any) => {
      // Откройте диалоговое окно или модальное окно редактирования жанра
      // Заполните форму данными текущего жанра (genreData)
      // Дождитесь завершения редактирования и обновите данные жанров
      // Можете также проверить успешность операции и показать сообщение об ошибке, если необходимо
    });
  }
  

  deleteGenre(id: number) {
    // Логика удаления жанра
    this.genreService.deleteGenre(id).subscribe((data: any) => {
      // Обновление списка жанров после удаления
      this.getGenres();
    });
  }
}
