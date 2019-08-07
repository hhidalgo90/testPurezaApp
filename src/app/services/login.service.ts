import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    console.log("loginUser");
    
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  /**
   * Metodo que registra un usuario en firebase.
   * @param email 
   * @param password 
   */
  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/usuariosRegistrados/${newUserCredential.user.uid}`)
          .set({ email });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  /**
   * Funcion para cerrar sesion.
   */
  logoutUser():Promise<void> {
    return firebase.auth().signOut();
  }
}
