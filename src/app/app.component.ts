import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from './book.service';
import { BookAddDialogComponent } from './book-add/book-add-dialog.component';

interface bookAuthorSelect {
  value: string;
}
interface bookLanguageSelect {
  value: string;
}
interface bookGenreSelect {
  value: string;
}

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  books: any[] = [];
  selectedAuthors: any[] = [];
  selectedLanguages: string[] = [];
  selectedPages: string[] = [];
  selectedGenres: string = '';
  searchQuery: string = '';
  expandedBook: any | null = null;
  isEditMode: boolean = false;

  bookAuthor: string[] = [];
  bookAuthorSelects!: bookAuthorSelect[];

  bookLanguage: string[] = [];
  bookLanguageSelects!: bookLanguageSelect[];

  minPages: number;
  maxPages: number;

  bookGenre: string[] = [];
  bookGenreSelects!: bookGenreSelect[];

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getBooks();
    this.bookService.getAuthors().subscribe((authors: string[]) => {
      this.bookAuthorSelects = authors.map((author) => ({ value: author }));
    });
    this.bookService.getLanguages().subscribe((languages: string[]) => {
      this.bookLanguageSelects = languages.map((language) => ({ value: language }));
    });
    this.bookService.getGenres().subscribe((genres: string[]) => {
      this.bookGenreSelects = genres.map((genre) => ({ value: genre }));
    });
  }

  getBooks() {
    this.bookService.getBooks().subscribe((data: any[]) => {
      this.books = data.map(book => ({ ...book, isExpanded: false }));
    });
  }

  searchBooks(searchQuery: string): void {
    this.bookService.searchBooks(searchQuery, this.selectedAuthors, this.selectedLanguages, this.bookGenreSelects, this.minPages, this.maxPages).subscribe((data: any[]) => {
      this.books = data;
    });
  }
  onAuthorMultiSelectChange(authors: { value: any[] }) {
    this.bookService.onAuthorMultiSelectChange(authors).subscribe((data: any[]) => {
      this.books = data;
    });
  }
  onLanguageMultiSelectChange(languages: { value: any[] }) {
    this.bookService.onLanguageMultiSelectChange(languages).subscribe((data: any[]) => {
      this.books = data;
    });
  }
  applyFilter() {
    this.onPagesFilterChange();
  }
  onPagesFilterChange(): void {
    console.log(this.minPages + " + " + this.maxPages);
    this.bookService.onPagesFilterChange(this.minPages, this.maxPages).subscribe((data: any[]) => {
      this.books = data;
    });
  }
  onGenreFilterChange(genre: { value: any[] }) {
    this.bookService.onGenreFilterChange(genre).subscribe((data: any[]) => {
      this.books = data;
    });
  }

  clearGenreFilter() {
    this.bookGenre = [];
    this.getBooks();
  }
  
  toggleDetails(index: number) {
    this.expandedBook = this.expandedBook === this.books[index] ? null : this.books[index];
  }

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(BookAddDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      this.updateBooksList();
    });
  }

  updateBooksList() {
    this.getBooks();
  }

  sortTableByAuthorName() {
    this.books.sort((a, b) => a.author_id.localeCompare(b.author_id));
  }
}