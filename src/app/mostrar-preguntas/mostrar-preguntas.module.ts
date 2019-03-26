import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MostrarPreguntasPage } from './mostrar-preguntas.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarPreguntasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MostrarPreguntasPage]
})
export class MostrarPreguntasPageModule {}
