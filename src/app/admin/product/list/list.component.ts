import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';
import { FormComponent } from '../form/form.component';
import {MatTableFilter} from 'mat-table-filter';

// tslint:disable-next-line:component-class-suffix
export class Product {
  id!: any;
  nom!: string;
  prix!: number;
  categorie!: string;
  genre!: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {
  filterEntity: any;
  filterType!: MatTableFilter;
  displayedColumns: string[] = ['id', 'nom', 'prix', 'images', 'categorie', 'genre', 'actions'];
  dataSource: any = new MatTableDataSource();
  products: any;
  loading!: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    try {
      this.loading = true;
      const response = await axios.get('http://localhost:1337/produits');
      this.products = response.data;
      console.log('Initiation des produits', this.products);
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filterEntity = new Product();
      this.filterType = MatTableFilter.ANYWHERE;
      console.log('donnée', this.filterEntity);
      this.loading = false;
      console.log('le tableau', this.dataSource);
    } catch (error) {
      error = error;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormComponent, {width: '100%', });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
