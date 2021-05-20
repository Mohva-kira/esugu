import { Produit } from './produits';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class CommonModelService {
 products!: Produit[];
  constructor(public dialog: MatDialog) { }

  openDialog(): Observable<any> {
    const dialogRef = this.dialog.open(ShoppingCartComponent, {
      data: { products: this.products }
    });

    return dialogRef.afterClosed();
  }
}
