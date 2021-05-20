import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {GC_AUTH_TOKEN, GC_USER_ID} from '../constant';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loading = false;
  constructor( public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
  }

  login(username: any, password:any) {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //     return;
    // }

    this.loading = true;
    this.authService.login(username, password)
        .pipe(first())
        .subscribe(
            data => {
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
