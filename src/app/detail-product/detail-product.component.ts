import {Produit} from './../produits';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import axios from 'axios';
import {MatCarouselModule} from '@ngmodule/material-carousel';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  product!: Produit;
  cartProductList: any[] = [];
  findedData!: Produit;
  title!: string;
  @Input() products!: any[];
  @Output() productAdded = new EventEmitter();

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
  }

  private sub: any;
  idParam: string = "";

  async ngOnInit(): Promise<void> {
    this.sub = this.route.params.subscribe(async params => {
      this.idParam = params['id'];
      //make you api call here
      try {
        const response = await axios.get('http://localhost:1337/produits');
        this.products = response.data;

      } catch (error) {
        error = error;
      }

      this.getProduit();
    });


  }

  getProduit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');


    this.product = this.products.find(produit => produit.id == id)!;

    console.log(this.product);

    if (typeof this.findedData === 'undefined') {
      return null as any;
    }

    console.log(this.findedData);


  }

  addProductToCart(product: any) {
    this.productAdded.emit(product);
    const productExistInCart = this.cartProductList.find(({nom}) => nom === product.nom); // find product by name
    if (!productExistInCart) {
      this.cartProductList.push({...product, num: 1}); // enhance "porduct" opject with "num" property
      return;
    }
    productExistInCart.num += 1;

  }

  removeProduct(product: any) {
    this.cartProductList = this.cartProductList.filter(({nom}) => nom !== product.nom);
  }

}
