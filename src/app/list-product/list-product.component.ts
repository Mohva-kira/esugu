import { Produit } from './../produits';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  angForm!: FormGroup;
  title = 'Esugu';
  produits !: Produit[];
  error = null;
  minicart : any;
  cartProductList: any[] = [];



  @Input() products!: any[];
  @Output() productAdded = new EventEmitter();

  constructor(private fb: FormBuilder) {

    this.angForm = this.fb.group({
      cmd: [''],
      add: [''],
      w3ls_item: [''],
      amount: ['']
      });


  }




 async ngOnInit() {
    try {
      const response = await axios.get('http://localhost:1337/produits');
      this.produits = response.data;
      console.log(this.produits);
    } catch (error) {
      this.error = error;
    }


  }
  addProductToCart(product:any) {
    const productExistInCart = this.cartProductList.find(({nom}) => nom === product.nom); // find product by name
    if (!productExistInCart) {
      this.cartProductList.push({...product, num:1  }); // enhance "porduct" opject with "num" property
      return;
    }
    productExistInCart.num += 1;

  }
   removeProduct(product:any) {
    this.cartProductList = this.cartProductList.filter(({nom}) => nom !== product.nom);
   }


}
