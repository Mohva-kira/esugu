import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  gallery: any;
  slides: any;
  products: any;
  twoAds: any;
  constructor() { }

  async ngOnInit(): Promise <void> {
    try {
      const response = await axios.get('http://localhost:1337/galeries');
      this.gallery = response.data;
      this.slides = this.gallery.filter((gal: { category: string; }) => gal.category === 'slide');
      this.twoAds = this.gallery.filter((gal: { category: string; }) => gal.category === 'twoAds');
      console.log('Initiation des images', this.gallery);
      console.log('slides', this.slides);
      console.log('Ads', this.twoAds);
    } catch (error) {
      error = error;
    }
  }

}
