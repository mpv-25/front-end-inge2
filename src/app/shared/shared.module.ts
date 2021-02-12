import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Rutas
import { RouterModule } from '@angular/router';
//Components
import { NavbarComponent } from './components/navbar/navbar.component';




@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[NavbarComponent]
})
export class SharedModule { }
