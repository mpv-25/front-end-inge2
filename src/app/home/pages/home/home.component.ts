import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.subirInicio();
  }
   // Funcion para subir al inicio
  subirInicio(): void{
    window.scroll(0, 0);
  }

}
