import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [];

  constructor(public db: AuthService) { }

  ngOnInit(): void {

      this.db.getUserS().subscribe(snap => {
        this.users = [];
        snap.forEach(u => {
          const user : any = u.payload.val();
          user.key = u.key ;

          this.users.push(user);
          console.log(u);

        })
          console.log('users : ', this.users);
      })
    

  }

}
