import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'email', 'role' ,'date', 'actions'];
  dataSource : any = new MatTableDataSource();
  users : any;
  loading!: boolean;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    try {
      this.loading = true;
      const response = await axios.get('http://localhost:1337/users');
      this.users = response.data;
      console.log('Initiation des users', this.users);
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    } catch (error) {
      error = error;
    }
  }

  createUser(){
    this.dialog.open(UserFormComponent, {
      width : '70%',
      height: 'auto'
    })
  }

}
