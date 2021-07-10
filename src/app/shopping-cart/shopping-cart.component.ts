import { Orders } from './../order';
import { ApiService } from './../api.service';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { checkout } from 'stripe-workers/dist/types/resources/checkout/sessions';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';



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
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;

  constructor( private dialogRef: MatDialogRef<ShoppingCartComponent>,
    @Inject(MAT_DIALOG_DATA) data:any, private apiService: ApiService, private fb: FormBuilder) {
      this.products = data.products;

      this.commandeFrom = this.fb.group({
        adresse:['', Validators.required],
        codePostal: ['', Validators.required],
        ville : ['', Validators.required],
        tel: ['', Validators.required],
        // produit: ['', Validators.required],
        // montant: ['', Validators.required],
        // user: ['', Validators.required],
        // status: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.stripePaymentGateway();
    this.totalPrix();

  }

    // Créer une commande
    createOrder(){
      let user = JSON.parse(sessionStorage.getItem('user')!);
      this.submitted = true;

      // stop here if form is invalid
      // if (this.loginForm.invalid) {
      //     return;
      // }

      this.loading = true;

      this.commandeFrom.value.produits= this.products;
      this.commandeFrom.value.user = user.id;
      this.commandeFrom.value.montant = this.prixTotal;
       this.commandeFrom.value.status = 'En attente';

      this.apiService.createOrder(this.commandeFrom.value).subscribe(
        (order: Orders) => {
            alert("Commande créer");
            console.log("Commande ajouté", order);

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
