
import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import {AuthService} from '../auth.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { CommonModelService } from '../common-model.service';
import { Role } from '../models/role';
import 'jquery';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {
  logged: boolean = false;

  prixtotal!: number;
  @Input() products!: any[];
  constructor(private authService: AuthService, public dialog: MatDialog ,@Optional() @Inject(MAT_DIALOG_DATA) private data: any, private commModel: CommonModelService) {

  }

  ngOnInit(): void {


   if (this.authService.isLoggedIn == true ) {
     this.logged = true;
   }

    this.products = JSON.parse(localStorage.getItem('cart-list')!);
   console.log(this.products);

  }

  calcTotal() {
    this.products = JSON.parse(localStorage.getItem('cart-list')!);
    this.prixtotal= this.products.reduce((acc, prod)=> acc+= prod.num * prod.prix ,0);
    return this.products.reduce((acc, prod) => acc+= prod.num ,0);

  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();


    dialogConfig.width= '720px';
    dialogConfig.height='420px';

    dialogConfig.data = {
      id: 1,
      products: this.products
  };



    this.dialog.open(ShoppingCartComponent, {width:'720px', height:'480px',
    data: {
      id: 1,
      products: this.products
    }});

}

  logout() {
    this.authService.logout();
  }
  get isAuthorized() {
    return this.authService.isAuthorized();
  }
  get isAdmin() {
    return this.authService.hasRole(Role.Admin);
  }


}

