import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MostrarRespuestasPage } from './mostrar-respuestas.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarRespuestasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MostrarRespuestasPage]
})
export class MostrarRespuestasPageModule {}
