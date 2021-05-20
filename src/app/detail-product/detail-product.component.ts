import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  @Input() product: any;
  @Output() productAdded = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  addProductToCart(product:any) {
    this.productAdded.emit(product);
  }

}
