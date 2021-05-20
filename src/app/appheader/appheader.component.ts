
import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import {AuthService} from '../auth.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { CommonModelService } from '../common-model.service';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {
  logged: boolean = false;


  @Input() products!: any[];
  constructor(private authService: AuthService, public dialog: MatDialog ,@Optional() @Inject(MAT_DIALOG_DATA) private data: any, private commModel: CommonModelService) {

  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();


    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      products: this.products
  };

    this.dialog.open(ShoppingCartComponent, dialogConfig);

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
    return this.products.reduce((acc, prod) => acc+= prod.num ,0)
  }


  logout() {
    this.authService.logout();
  }

}

