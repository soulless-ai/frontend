import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { AuthorService } from '../author.service';
import { GenreService } from '../genre.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  authors: any[] = [];
  languages: string[] = [];
  pages: any[] = [];
  genres: any[] = [];
  selectedAuthors: string[] = [];
  selectedLanguages: string[] = [];
  selectedPages: string[] = [];
  selectedGenre: string = '';
  searchQuery: string = '';

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private genreService: GenreService
  ) {}

  ngOnInit() {
    this.getBooks();
    this.getAuthors();
    this.getGenres();
  }

  getBooks() {
    this.bookService.getBooks(
      this.searchQuery,
      this.selectedAuthors,
      this.selectedLanguages,
      this.selectedPages,
      this.selectedGenre
    ).subscribe((data: any[]) => {
      this.books = data;
    });
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe((data: any[]) => {
      this.authors = data;
    });
  }

  getGenres() {
    this.genreService.getGenres().subscribe((data: any[]) => {
      this.genres = data;
    });
  }

  // Другие методы для фильтрации и обработки данных

}
