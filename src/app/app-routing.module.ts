import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { MostrarPreguntasPage } from './mostrar-preguntas/mostrar-preguntas.page';
import { DatosPersonalesPage } from './datos-personales/datos-personales.page';
import { MostrarRespuestasPage } from './mostrar-respuestas/mostrar-respuestas.page';
import { MostrarResultadoPage } from './mostrar-resultado/mostrar-resultado.page';
import { LoginPage } from './login/login.page';
import { AutenticacionGuard } from './services/autenticacion.guard'; //import para agregarlo a cada path que requiera acceso solo de usuario logueados
import { MostrarUsuariosPage} from './mostrar-usuarios/mostrar-usuarios.page';
import { FacebookUserPage } from './facebook-user/facebook-user.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'mostrarPreguntas', component: MostrarPreguntasPage },
  { path: 'mostrarPreguntas/:usuario', component: MostrarPreguntasPage },
  { path: 'datosPersonales', component: DatosPersonalesPage },
  { path: 'modal-preguntas', loadChildren: './modal-preguntas/modal-preguntas.module#ModalPreguntasPageModule' },
  { path: 'mostrarRespuestas', component: MostrarRespuestasPage, canActivate: [AutenticacionGuard] },//solo para usuarios logueados
  { path: 'mostrarResultado', component: MostrarResultadoPage },
  { path: 'login', component: LoginPage },
  { path: 'mostrarUsuarios', component: MostrarUsuariosPage , canActivate: [AutenticacionGuard] },//solo para usuarios logueados 
  { path: 'facebookUser', component : FacebookUserPage , canActivate: [AutenticacionGuard]}//solo para usuarios logueados 







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
