import { Role } from './../models/role';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {GC_AUTH_TOKEN, GC_USER_ID} from '../constant';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loading = false;
  user!: User ;
  constructor( public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    // if (this.authService.isAuthorized()) {
    //   this.router.navigate(['members']);
    // }

  }

  login(username: any, password:any) {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //     return;
    // }

    this.loading = true;

    console.log('requete', username, password);
    this.authService.login(username, password)
        .pipe(first())
        .subscribe(
            data => {
              console.log('utilisateur', data);
             sessionStorage.setItem('user', JSON.stringify(data));


              if (data.role.id == 1 ) {

                console.log('yess');

               }

              this.router.navigate(['members']);
            },
            error => {
              if (error && error.error && error.error.message && error.error.message.length > 0) {
                alert(error.error.message[0].messages[0].message);
              }
              else
              {
                alert('error');
              }

              //this.alertService.error(error);
              this.loading = false;
            });
}

}
