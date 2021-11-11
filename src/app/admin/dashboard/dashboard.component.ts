import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ordersDisplay = false;
  usersDisplay = false;
  revenuesDisplay = false;
  constructor() { }

  ngOnInit(): void {
  }

  displayOrders(): void {
    this.ordersDisplay = true;
    this.usersDisplay = false;
    this.revenuesDisplay = false;
}

displayUsers(): void {
    this.ordersDisplay = false;
    this.usersDisplay = true; // On affiche le tableau des utilisateurs
    this.revenuesDisplay = false;
}

displayRevenue(): void {
    this.ordersDisplay = false;
    this.usersDisplay = false;
    this.revenuesDisplay = true;
}

}
