import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BookService } from '../book.service';
import { HttpErrorResponse } from '@angular/common/http';

interface bookAuthorSelect {
  value: string;
}
interface bookLanguageSelect {
  value: string;
}
@Component ({
  selector: 'app-book-add-dialog',
  templateUrl: './book-add-dialog.component.html',
  styleUrls: ['./book-add-dialog.component.css']
})
export class BookAddDialogComponent {
  bookTitle: string = '';
  bookAuthor: string = '';
  customAuthor: string = '';
  bookDescription: string = '';
  bookPages: string = '';
  bookLanguage: string = '';
  bookGenre: string = '';

  hasError: boolean = false;
  buttonColor: string = '';
  textColor: string = '';

  newAuthorPlaceholder = 'Add author';

  bookAuthorSelects!: bookAuthorSelect[];
  bookLanguageSelects!: bookLanguageSelect[];

  constructor(
    public dialogRef: MatDialogRef<BookAddDialogComponent>, 
    private bookService: BookService,
  ) {}

  ngOnInit() {
    this.bookService.getAuthors().subscribe((authors: string[]) => {
      this.bookAuthorSelects = authors.map((author) => ({ value: author }));
    });
    this.bookService.getLanguages().subscribe((languages: string[]) => {
      this.bookLanguageSelects = languages.map((language) => ({ value: language }));
    });
  }

  saveBook(): void {
    this.hasError = false;
    this.buttonColor = '';
    this.textColor = '';
    
    const newBook = {
      title: this.bookTitle,
      author_id: this.bookAuthor,
      description: this.bookDescription,
      pages: parseInt(this.bookPages, 10),
      language: this.bookLanguage,
      genre_id: this.bookGenre
    };
    
    this.bookService.createBook(newBook).subscribe(
      (response) => {
        this.dialogRef.close(true);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 422) {
          const validationErrors = error.error;
          validationErrors.forEach((validationError) => {
            console.error(`Ошибка валидации поля "${validationError.field}": ${validationError.message}`);
          });
          this.hasError = true;
          this.buttonColor = 'brown';
          this.textColor = 'white';
          
          setTimeout(() => {
            this.buttonColor = '';
            this.textColor = '';
          }, 2000);
        } else {
          console.error('Ошибка при сохранении книги:', error);
        }
      }
    );
  }

  addCustomAuthor(): void {
    if (this.customAuthor.trim() !== '') {
      this.bookAuthorSelects.push({ value: this.customAuthor });
      this.bookAuthor = this.customAuthor;
      this.customAuthor = '';
    }
  }  

  deleteValue(valueToRemove: string) {
    if (this.bookAuthor === valueToRemove) {
      this.bookAuthor = ''; 
    }
    this.bookAuthorSelects = this.bookAuthorSelects.filter((authorSelect) => authorSelect.value !== valueToRemove);
  }

  onInputPagesChange(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}