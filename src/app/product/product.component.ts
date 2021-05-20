import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { Produit } from '../produits';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: any;

  @Output() productAdded = new EventEmitter();
  @Input() produits !: Produit[];
  error = null;
  constructor() { }

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
    this.productAdded.emit(product);
  }

}
