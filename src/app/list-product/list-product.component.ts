import { Produit } from './../produits';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';



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
  categProuctlist!: Produit[];

  findedData!: Produit[] ;

  @Input() products!: any[];
  @Output() productAdded = new EventEmitter();

  constructor(private fb: FormBuilder,  private route: ActivatedRoute) {


  }




  private sub: any;
  idParam = '';
  async ngOnInit(): Promise<void> {
    this.sub = this.route.params.subscribe(async params => {
      this.idParam = params['id'];
      // make you api call here
      try {
        const response = await axios.get('http://localhost:1337/produits');
        this.products = response.data;
        console.log('Initiation des produits', this.products);
      } catch (error) {
        error = error;
      }

      this.getProduit();
    });



  }

  async getProduit(): Promise<void> {
    const categories : any = this.route.snapshot.paramMap.get('categories');
    const genre : any = this.route.snapshot.paramMap.get('genre');
    if(!categories){


      this.categProuctlist = this.products;
    }else {

      this.categProuctlist = this.products.filter(produit => produit.category.nom === categories && produit.genre.nom === genre)!;

    }

      console.log(this.categProuctlist, categories);






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
