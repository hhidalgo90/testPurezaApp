import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera } from '@ionic-native/camera/ngx';
import { MostrarPreguntasPage } from './mostrar-preguntas/mostrar-preguntas.page';
import { DatosPersonalesPage } from './datos-personales/datos-personales.page';
import { HomePage } from './home/home.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalPreguntasPage } from './modal-preguntas/modal-preguntas.page';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './credenciales-firebase';
import { MostrarRespuestasPage } from './mostrar-respuestas/mostrar-respuestas.page';
import { MostrarResultadoPage } from './mostrar-resultado/mostrar-resultado.page';
import { LoginPage } from './login/login.page';
import { MostrarUsuariosPage} from './mostrar-usuarios/mostrar-usuarios.page';

@NgModule({
  declarations: [AppComponent,
    MostrarPreguntasPage,
    HomePage,
    DatosPersonalesPage,
    ModalPreguntasPage,
    MostrarRespuestasPage,
    MostrarResultadoPage,
    LoginPage,
    MostrarUsuariosPage],
  entryComponents: [MostrarPreguntasPage,ModalPreguntasPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    MostrarPreguntasPage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
