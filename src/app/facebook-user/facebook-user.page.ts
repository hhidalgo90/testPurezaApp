import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-facebook-user',
  templateUrl: './facebook-user.page.html',
  styleUrls: ['./facebook-user.page.scss'],
})
export class FacebookUserPage implements OnInit {
  usuarioFacebook: any = {};
  
  constructor(private router: Router,  private fireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.fireAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.usuarioFacebook = {
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
          isAnonymous: user.isAnonymous,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          refreshToken: user.refreshToken
        }
      }
      else {
        this.router.navigate(["/home"]);
      }
    })
  }

}
