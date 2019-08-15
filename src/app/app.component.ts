import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase/app';
import { firebaseConfig } from './credenciales-firebase';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public rutaUserLogueado = "";
  public appPages = [
    {
      title: 'Home',
      url: '/home' ,
      icon: 'home'
    },
    {
      title: 'Empezar test',
      url: '/datosPersonales',
      icon: 'list'
    }
    
  ];
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService : LoginService,
    private router : Router,
    private loadingCtrl : LoadingController,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      firebase.initializeApp(firebaseConfig);
    });
  } 

  async cerrarSesion(){
    const loading = await this.loadingCtrl.create({      
      duration: 1000,
      message: "Cerrando Sesion"
    });
    this.loginService.logoutUser().then(()=>{
      loading.dismiss();
      console.log("llegue a cerrar sesion");
      window.sessionStorage.setItem("usuarioLogueado" , "false");
      this.router.navigateByUrl('home');      
    });

    return await loading.present();
  }

  esLogueado(){    
    var usuarioLogueado = window.sessionStorage.getItem("usuarioLogueado");
    if(usuarioLogueado == "true"){
      return true;
    }
    else{
      return false;
    }
  }

  navigate(){
    var usuarioLogueado = window.sessionStorage.getItem("usuarioLogueado");
    if(usuarioLogueado == "true"){
      this.rutaUserLogueado = "/mostrarUsuarios";
      this.router.navigateByUrl(this.rutaUserLogueado);
    }
    else{
      this.rutaUserLogueado = "/login";
      this.router.navigateByUrl(this.rutaUserLogueado);
    }
  }

}
