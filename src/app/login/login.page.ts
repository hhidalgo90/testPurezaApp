import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  emailUser = "";
  passUser = "";
  formLogin : FormGroup;
  constructor() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.formLogin = new FormGroup({      
      passUser: new FormControl('', [Validators.required]),
      emailUser: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
    });
   }

  ngOnInit() {
  }

}
