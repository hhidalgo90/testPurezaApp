import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  emailUser = "";
  passUser = "";
  formLogin : FormGroup;
  public loading: HTMLIonLoadingElement;
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, private loginService: LoginService, private router: Router) {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.formLogin = new FormGroup({      
      passUser: new FormControl('', [Validators.required]),
      emailUser: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
    });
   }

  ngOnInit() {
  }

  /**
   * Metodo para loguear un usuario en la app.
   * @param loginForm 
   */
  async loginUser(): Promise<void> {

      this.loading = await this.loadingCtrl.create({      
        duration: 1000,
        message: "Iniciando Sesion"
      });
      await this.loading.present();
  
      this.loginService.loginUser(this.emailUser, this.passUser).then(
        () => {
          this.loading.dismiss().then(() => {
            window.sessionStorage.setItem("usuarioLogueado", "true"); //variable de session para guardar si el usuario esta logueado
            console.log("iniciar sesion: esLogueado: " + window.sessionStorage.getItem("usuarioLogueado"));
            this.router.navigateByUrl('mostrarRespuestas');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );    
  }
}
