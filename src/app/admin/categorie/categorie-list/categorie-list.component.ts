import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom',  'actions'];
  dataSource : any = new MatTableDataSource();
  categories : any;
  loading!: boolean;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() { }

  async ngOnInit(): Promise<void> {
    try {
      this.loading = true;
      const response = await axios.get('http://37.187.39.3:4337/categories');
      this.categories = response.data;
      console.log('Initiation des categories', this.categories);
      this.dataSource = new MatTableDataSource(this.categories);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    } catch (error) {
      error = error;
    }
  }
}
