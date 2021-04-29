import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LineabaseComponent } from './pages/lineabase/lineabase.component';

@NgModule({
  declarations: [LineabaseComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ConfiguracionModule {}
