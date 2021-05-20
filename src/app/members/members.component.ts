import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  users!: any[];
  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.users().pipe(first())
    .subscribe(
        data => {
          this.users = data;
        },
        error => {
          //this.alertService.error(error);
    });
  }

}
