import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {
  orders !: any;
  orderSelected !: any;
  constructor( private router: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    const id = this.router.snapshot.paramMap.get('id');
    try {
      const response = await axios.get('http://localhost:1337/commandes', {
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('currentJwt'),
        },
      });
      this.orders = response.data;
      // tslint:disable-next-line:no-non-null-assertion
      this.orderSelected = this.orders.find((order: { id: string | null; }) => order.id == id)!;
      console.log('Initiation de la commande ', this.orderSelected);
    } catch (error) {
      error = error;
    }
  }

}
