import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAddDialogComponent } from './book-add/book-add-dialog.component'
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: AppComponent },
  { path: 'books/:add', component: BookAddDialogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }