import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MostrarResultadoPage } from './mostrar-resultado.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarResultadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MostrarResultadoPage]
})
export class MostrarResultadoPageModule {}
