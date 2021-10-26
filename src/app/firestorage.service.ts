import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  path='images/';
  task: AngularFireUploadTask = null;
  uploadProgress = new Observable();
  downloadURL = of('');


  constructor(public firestore : AngularFireStorage,
              public auth : AuthService) { }




  upload(event){
    console.log('event: ' , event);

    let ext = '.jpg';
    if(event.target.files[0].type === 'image/png'){
      ext = '.png';
    }

    /*
    this.firestore.upload('images/' + this.auth.authUser.uid + ext, event.target.files[0] )
    .then(result => {
      console.log('result: ' , event);
    }).catch(error => {
      console.log('error: ', error);
    })
*/

    const path = this.path + this.auth.authUser.uid + ext;
    const ref = this.firestore.ref(path);
    this.task = this.firestore.upload(path, event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe( finalize( () => {
      this.downloadURL = ref.getDownloadURL();
      console.log('this.downloadURL: ', this.downloadURL);
    })).subscribe();



  }

}
