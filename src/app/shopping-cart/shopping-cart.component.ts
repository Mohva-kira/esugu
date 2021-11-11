import { Orders } from './../order';
import { ApiService } from './../api.service';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { checkout } from 'stripe-workers/dist/types/resources/checkout/sessions';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  @Input() products!: any[];
  @Output() productRemoved = new EventEmitter();
  prixTotal!: number;
  strikeCheckout:any = null;
  loading = false;
  submitted = false;
  commandeFrom! : FormGroup;
  adresseForm!: FormGroup;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  adresse : any;

  constructor( private dialogRef: MatDialogRef<ShoppingCartComponent>,
    @Inject(MAT_DIALOG_DATA) data:any, private apiService: ApiService, private fb: FormBuilder) {
      this.products = data.products;

      this.adresseForm = this.fb.group({
        adresse:['', Validators.required],
        codePostal: ['', Validators.required],
        ville : ['', Validators.required],
        tel: ['', Validators.required],
        pays: ['', Validators.required]
        // produit: ['', Validators.required],
        // montant: ['', Validators.required],
        // user: ['', Validators.required],
        // status: ['', Validators.required]
      });

      this.commandeFrom = this.fb.group({
 

      })
    }

  ngOnInit(): void {
    this.stripePaymentGateway();
    this.totalPrix();

  }

    // Créer une commande
    createOrder(){
      console.log('user', JSON.parse(sessionStorage.getItem('user')!) )
      let user : any  = JSON.parse(sessionStorage.getItem('user')!);
      this.submitted = true;
      this.createAdresse();
      // stop here if form is invalid
      // if (this.loginForm.invalid) {
      //     return;
      // }

      this.loading = true;
      this.commandeFrom.value.adresse = this.adresse;
      this.commandeFrom.value.produits= this.products;
      this.commandeFrom.value.user = user;
      this.commandeFrom.value.montant = this.prixTotal.toString();
       this.commandeFrom.value.status = 1;

       console.log(this.commandeFrom.value);
     

     
      this.apiService.createOrder(this.commandeFrom.value).subscribe(
        (order: Orders) => {
            alert("Commande créer");
            console.log("Commande ajouté", order);
            
         
          });

          

    }

    createAdresse() {
      let user : any  = JSON.parse(sessionStorage.getItem('user')!);
      this.submitted = true;

      this.loading = true;
      this.adresseForm.value.user = user;
      this.adresseForm.value.isShipping = true;
      console.log('youhouu', this.adresseForm.value);
      this.apiService.createAdresse(this.adresseForm.value).subscribe(
       (respAdresse: any) => {
           this.adresse = respAdresse;
           alert("Adresse créer");
           console.log("Adresse ajouté", respAdresse);

         });
    }

  calcTotal() {

    return this.products.reduce((acc, prod) => acc+= prod.num ,0)
  }

  totalPrix() {
    this.prixTotal = this.products.reduce((acc, prod) => acc+= prod.prix * prod.num ,0);
    localStorage.setItem('cart-list', JSON.stringify(this.products));
   return this.products.reduce((acc, prod) => acc+= prod.prix * prod.num ,0);


  }
  removeProduct(product:any) {
    this.productRemoved.emit(product)
  }

  checkout(amount:any) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_6VfehU3JmufmA3QsDVdrZP2R',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
      }
    });

    strikeCheckout.open({
      name: 'Sneakers Addict 1210',
      description: 'Paiement Sécurisé',
      amount: amount * 100,
      currency: 'Eur',
      panelLabel: 'Payer '
    });


  }


  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_6VfehU3JmufmA3QsDVdrZP2R',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment via stripe successfull!');
          }
        });
      }

      window.document.body.appendChild(scr);
    }
  }

  close() {
    this.dialogRef.close();
}


}
