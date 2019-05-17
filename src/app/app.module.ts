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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent,MostrarPreguntasPage,HomePage,DatosPersonalesPage],
  entryComponents: [MostrarPreguntasPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
