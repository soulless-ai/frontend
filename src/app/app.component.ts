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
interface searchOptionsSelect {
  query: string;
  author: string;
  language: string;
  genre: string;
  minPage: string;
  maxPage: string;
}

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  books: any[] = [];

  searchOptions!: searchOptionsSelect[];

  selectedAuthors: any[] = [];
  selectedLanguages: string[] = [];
  selectedPages: string[] = [];
  selectedGenres: string = '';
  searchQuery: string = '';
  expandedBook: any | null = null;
  isEditMode: boolean = false;

  bookAuthor: any[] = [];
  bookAuthorSelects!: bookAuthorSelect[];

  bookLanguage: any[] = [];
  bookLanguageSelects!: bookLanguageSelect[];

  minPages: number;
  maxPages: number;

  bookGenre: any[] = [];
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

  searchBooks(): void {
    console.log(this.bookAuthor);
    const searchOptions: searchOptionsSelect = {
      query: this.getNonNullValue(this.searchQuery),
      author: JSON.stringify(
        this.getNonNullArrayValue(
          this.bookAuthor.map(author => author.value))),
      language: JSON.stringify(
        this.getNonNullArrayValue(
          this.bookLanguage.map(author => author.value))),
      genre: JSON.stringify(
        this.getNonNullArrayValue(this.bookGenre)),
      minPage: this.getNonNullNumberValue(this.minPages).toString(),
      maxPage: this.getNonNullNumberValue(this.maxPages).toString(),
    };
    this.bookService.searchBooks(searchOptions).subscribe((data: any[]) => {
      this.books = data;
    });
  }
  
  getNonNullValue(value: string): string {
    return value.trim() || "";
  }
  getNonNullArrayValue(arr: any[]): any[] {
    return arr || [];
  }
  getNonNullNumberValue(value: number | null | undefined): number {
    return value || 0;
  }
  
  clearGenreFilter() {
    this.bookGenre = [];
    this.searchBooks();
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