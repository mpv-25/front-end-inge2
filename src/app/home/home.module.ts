import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Paginas
import { HomeComponent } from './pages/home/home.component';

//components

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
