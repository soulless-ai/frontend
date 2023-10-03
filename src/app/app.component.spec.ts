import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // Импортируйте модуль HttpClientModule, если вы используете HTTP запросы
import { FormsModule } from '@angular/forms'; // Импортируйте FormsModule, если у вас есть шаблоны с формами

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule, FormsModule], // Добавьте HttpClientModule и FormsModule в imports
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should initialize with empty books, authors, genres and pages', () => {
    expect(app.books).toEqual([]);
    expect(app.authors).toEqual([]);
    expect(app.genres).toEqual([]);
  });

  // Добавьте другие тесты для методов и функциональности вашего AppComponent
});
