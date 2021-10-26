import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from 'rxjs/operators';

import firebase from 'firebase/app';

import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email = '';
  pass = '';
  authUser = null;

  constructor(public auth: AngularFireAuth,
              private router : Router,
              private db : AngularFireDatabase) { }


  user = this.auth.authState.pipe ( map( authState => {
    console.log('authState: ', authState);

    if (authState) {
      this.authUser = authState;
      return authState;
    }else {
      return null;
    }

  }))


  login(){
    console.log('login');

    return this.auth.signInWithEmailAndPassword(this.email, this.pass)
    .then(user => {
      this.authUser = user.user;
      console.log('user logado con email: ' , user);
    })


  }

  glogin(){
    console.log('google login');

    //var provider = new firebase.auth.GoogleAuthProvider();

    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(user => {
      console.log('user logado: ' , user);
      this.authUser = user.user;
      this.updateUserData(user.user);
    })
    .catch( error => {
        console.log('error en google login: ', error) ;
    })

  }

  logout(){
    console.log('logout');
    this.auth.signOut();
  }


updateUserData(user : any){
  console.log('user: ', user)
  const path = 'users/';
  const u = {
    email : user.email
  }

  this.db.object(path).update(u).catch(error => console.log(error));

}


  getUserS(){
    const path = 'users/';
    return this.db.list(path).snapshotChanges();
  }

  removeUser(userUid){
    const path = 'users/' + userUid;
    return this.db.object(path).remove();
  }

}
