import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { AuthorService } from './author.service';
import { GenreService } from './genre.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  books: any[] = [];
  authors: any[] = [];
  genres: any[] = [];
  selectedAuthors: any[] = [];
  selectedLanguages: string[] = [];
  selectedPages: string[] = [];
  selectedGenre: string = '';
  searchQuery: string = '';

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private genreService: GenreService,
    private router: Router
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

  openBookDetail(book: any) {
    this.router.navigate(['books/:id', book.id]);
  }
}