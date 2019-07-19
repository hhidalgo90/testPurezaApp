import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { MostrarPreguntasPage } from './mostrar-preguntas/mostrar-preguntas.page';
import { DatosPersonalesPage } from './datos-personales/datos-personales.page';
import { MostrarRespuestasPage } from './mostrar-respuestas/mostrar-respuestas.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'mostrarPreguntas', component: MostrarPreguntasPage },
  { path: 'mostrarPreguntas/:usuario', component: MostrarPreguntasPage },
  { path: 'datosPersonales', component: DatosPersonalesPage },
  { path: 'modal-preguntas', loadChildren: './modal-preguntas/modal-preguntas.module#ModalPreguntasPageModule' },
  { path: 'mostrarRespuestas', component: MostrarRespuestasPage },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
