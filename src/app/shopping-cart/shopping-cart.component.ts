import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { checkout } from 'stripe-workers/dist/types/resources/checkout/sessions';



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

  constructor( private dialogRef: MatDialogRef<ShoppingCartComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {
      this.products = data.products;
    }

  ngOnInit(): void {
    this.stripePaymentGateway();
    this.totalPrix();

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
      name: 'Esugu Paiement',
      description: 'Effectuer votre paiement',
      amount: amount * 100
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
