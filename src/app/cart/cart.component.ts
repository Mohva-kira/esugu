import { Produit } from './../produits';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() produits!: any[];
  @Input() product: any;
  @Output() productRemoved = new EventEmitter();
  cartProductList: any[] = [];
  getCartProductList: any;
  @Input() products!: any[];
  prixTotal!: number;

  constructor(public dialog: MatDialog, ) { }

  ngOnInit(): void {
    this.products= JSON.parse(localStorage.getItem('cart-list')!);
    this.totalPrix();

  }

  modelChanged(product: any) {

     if (this.product.num === 0) {
      this.productRemoved.emit(this.product)
     }
  }



  addProductToCart(product:any) {
    const productExistInCart = this.cartProductList.find(({nom}) => nom === product.nom); // find product by name
    if (!productExistInCart) {
      this.cartProductList.push({...product, num:1  }); // enhance "porduct" opject with "num" property
      return;
    }
    productExistInCart.num += 1;
    localStorage.setItem('cart-list', JSON.stringify(productExistInCart));

  }
  removeProduct(product:any) {
    this.cartProductList = this.cartProductList.filter(({nom}) => nom !== product.nom);
    localStorage.setItem('cart-list', JSON.stringify(this.cartProductList));
   }
   calcTotal() {

    return this.products.reduce((acc, prod) => acc+= prod.num ,0)
  }

  totalPrix() {

    this.prixTotal = this.products.reduce((acc, prod) => acc+= prod.prix * prod.num ,0);

   return this.products.reduce((acc, prod) => acc+= prod.prix * prod.num ,0);

  }
}




