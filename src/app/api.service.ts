import { Produit } from './produits';
import { Orders } from './order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import axios from 'axios';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private authApiBase: string = 'http://localhost:1337';
  authToken : any = sessionStorage.getItem('currentJwt');
  produits!: Produit[];
  constructor(private httpClient: HttpClient, public router: Router,) { }

  createOrder(order: Orders) {
    return this.httpClient.post<Orders>(`${this.authApiBase}/commandes`, {
      adresse:  order.adresse,
      codePostal: order.codePostal,
      ville: order.ville,
      tel: order.tel,
      produits: order.produits,
      montant: order.montant,
      users_permissions_user: order.user,
      status: order.status


    }


    , {
      headers: {
        Authorization:
        ' Bearer ' + this.authToken
      },
    })
      .pipe(map(response => {
          // login successful if there's a jwt token in the response
          // if (response.jwt && response.user && response.user.blocked == false) {
          //     // store user details and jwt token in local storage to keep user logged in between page refreshes
          //     sessionStorage.setItem('currentUser', JSON.stringify(response.user));
          //     sessionStorage.setItem('currentJwt', response.jwt);

          // }

          console.log(response);

          return response;
      }));




  }

  createAdresse(adresse: any){
    return this.httpClient.post<any>(`${this.authApiBase}/adresses`, {
      adresse:  adresse.adresse,
      codePostal: adresse.codePostal,
      ville: adresse.ville,
      tel: adresse.tel,
      pays: adresse.pays,
      users_permissions_user: adresse.user,
      isShipping: adresse.isShipping


    }, {
      headers: {
        Authorization:
        ' Bearer ' + this.authToken
      },
    })
      .pipe(map(response => {
          // login successful if there's a jwt token in the response
          // if (response.jwt && response.user && response.user.blocked == false) {
          //     // store user details and jwt token in local storage to keep user logged in between page refreshes
          //     sessionStorage.setItem('currentUser', JSON.stringify(response.user));
          //     sessionStorage.setItem('currentJwt', response.jwt);

          // }

          console.log(response);

          return response;
      }));
  }

  getProduits(){
    return this.httpClient.get<Produit[]>(`${this.authApiBase}/produits`);
  }


}
