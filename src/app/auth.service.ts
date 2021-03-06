import { HttpClient } from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import {GC_AUTH_TOKEN, GC_USER_ID} from './constant';
import { Role } from './models/role';
import { User } from './user';

// 1
@Injectable()
export class AuthService {
  private user : any = sessionStorage.getItem('user');
    isAuthorized() {
        return !!this.user;
    }
    hasRole(role: Role) {
        return this.isAuthorized() && this.user.role === role;
    }

  // 2
  private userId:any = null;
  userData: any; // Save logged in user data
  public authToken!: string;

  private authApiBase: string = 'http://localhost:1337';
  private currentUserSubject!: BehaviorSubject<any>;
  public currentUser!: Observable<any>;
  // 3


  constructor(private httpClient: HttpClient,
    public router: Router,
    public ngZone: NgZone) {

      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') !));
      this.currentUser = this.currentUserSubject.asObservable();

      if (sessionStorage.getItem('currentUser')) {
        this.userData = JSON.parse(sessionStorage.getItem('currentUser')!);
        this.authToken = sessionStorage.getItem('currentJwt') !;
      }
    }
  // Sign in with email/password
  login(username: any, password: any) {

    return this.httpClient.post<any>(`${this.authApiBase}/auth/local`, { identifier: username, password: password })
      .pipe(map(response => {
          // login successful if there's a jwt token in the response
          if (response.jwt && response.user && response.user.blocked == false) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              sessionStorage.setItem('user', JSON.stringify(response.user));
              sessionStorage.setItem('currentJwt', response.jwt);
              this.userData = response.user;
              this.authToken = sessionStorage.getItem('currentJwt') !;
              this.currentUserSubject.next(response.user);
          }

          return response.user;
      }));
  }
  aLeRole(role: Role){
    this.user = {role: role} as any;

  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('currentJwt');
    this.currentUserSubject.next(null);
    console.log('sign out');

    this.router.navigate(['sign-in']);

  }

  /*
  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // Call the SendVerificaitonMail() function when new user sign        up and returns promise
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }
*/

forgotPassword(email:any) {
  console.log('forgotPassword', email)
  return this.httpClient.post<any>(`${this.authApiBase}/auth/forgot-password`, { email: email })
    .pipe(map(response => {
        return response;
    }));
}

// Returns true when user is looged in and email is verified
// get isLoggedIn(): boolean {
//   const user = JSON.parse(sessionStorage.getItem('user')! );
//   return (user !== null && user.emailVerified !== false) ? true : false;
// }


}
