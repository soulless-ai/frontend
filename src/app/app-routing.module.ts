import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { GenreListComponent } from './genre-list/genre-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' }, // По умолчанию перенаправляем на страницу со списком книг
  { path: 'books', component: BookListComponent }, // Страница со списком книг
  { path: 'books/:id', component: BookDetailComponent }, // Страница с деталями книги (где :id - идентификатор книги)
  { path: 'authors', component: AuthorListComponent }, // Страница со списком авторов
  { path: 'authors/:id', component: AuthorDetailComponent }, // Страница с деталями автора (где :id - идентификатор автора)
  { path: 'genres', component: GenreListComponent }, // Страница со списком жанров
  // Добавьте другие маршруты, если необходимо
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
