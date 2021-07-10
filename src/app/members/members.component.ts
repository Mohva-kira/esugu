import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  users!: any[];
  user !: User;
  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    let userData = sessionStorage.getItem('user');

    this.usersService.users().pipe(first())
    .subscribe(
        data => {
          this.users = data;
            console.log(this.users);
        },
        error => {
          alert(error);
    });

    console.log(userData);
  }


}
