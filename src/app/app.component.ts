import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = environment.title;

  constructor(public auth: AuthService,
              private toastr : ToastrService){
    
  }

  signEmail(){
    this.auth.login().catch( error => {
      console.log('error en email login: ', error.code) ;

      if (error.code==='auth/wrong-password'){
        //alert('pass no valid');
        this.toastr.error('contraseña no valida','Error login')
      }

  })
  }

}
