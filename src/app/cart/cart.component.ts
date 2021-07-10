import { Produit } from './../produits';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { Orders } from '../order';
import { MatTableDataSource } from '@angular/material/table';



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
  prixTotal: number = 0;

  displayedColumns: string[] = ['Image','Article', 'Quantite', 'Prix'];
  dataSource :any =  new MatTableDataSource();

  loading = false;
  submitted = false;
  commandeFrom! : FormGroup;
  constructor(public dialog: MatDialog, private apiService: ApiService, private fb: FormBuilder ) {


  }

  ngOnInit(): void {
    this.products= JSON.parse(localStorage.getItem('cart-list')!);
    this.dataSource = new MatTableDataSource(this.products);
    this.totalPrix();



  }

  modelChanged(product: any) {

     if (this.product.num === 0) {
      this.productRemoved.emit(this.product)
     }
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
    localStorage.setItem('cart-list', JSON.stringify(this.cartProductList));
   return this.products.reduce((acc, prod) => acc+= prod.prix * prod.num ,0);


  }



}




