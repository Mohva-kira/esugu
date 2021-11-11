import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { CommonModelService } from 'src/app/common-model.service';
import { Role } from 'src/app/models/role';
import { ShoppingCartComponent } from 'src/app/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged: boolean = false;

  prixtotal!: number;
  @Input() products!: any[];
  constructor(private authService: AuthService, public dialog: MatDialog ,@Optional() @Inject(MAT_DIALOG_DATA) private data: any, private commModel: CommonModelService) {

  }
  ngOnInit(): void {




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
