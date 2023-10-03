import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {
  @Input() author: any; // Входной параметр: информация об авторе
  @Output() onSaveAuthor = new EventEmitter<any>(); // Событие сохранения автора
  @Output() onCancelEdit = new EventEmitter<void>(); // Событие отмены редактирования

  authorForm: FormGroup; // Форма для редактирования автора
  isEditing: boolean = false; // Режим редактирования

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    // Инициализация формы
    this.authorForm = this.formBuilder.group({
      id: [this.author?.id],
      name: [this.author?.name, Validators.required],
      birthDate: [this.author?.birthDate, Validators.required],
      // Другие поля автора
    });
  }

  startEditing() {
    // Включение режима редактирования
    this.isEditing = true;
  }

  saveAuthor() {
    // Сохранение изменений автора
    if (this.authorForm.valid) {
      const updatedAuthor = this.authorForm.value;
      this.onSaveAuthor.emit(updatedAuthor);
      this.isEditing = false;
    }
  }

  cancelEdit() {
    // Отмена редактирования
    this.isEditing = false;
    this.onCancelEdit.emit();
  }
}
