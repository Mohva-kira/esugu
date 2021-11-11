import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {Produit} from '../../produits';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders !: any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource !: any;

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor() { }

  async ngOnInit(): Promise<void>{
    // make you api call here

    try {
      const response = await axios.get('http://localhost:1337/commandes', {
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('currentJwt'),
        },
      });
      this.orders = response.data;
      this.dataSource = new MatTableDataSource(this.orders);
      console.log('Initiation des commandes ', this.orders);
    } catch (error) {
      error = error;
    }
  }

}
