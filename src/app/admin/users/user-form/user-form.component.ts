import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: any;
  constructor(private fb: FormBuilder) {

    this.userForm = this.fb.group({
      username: [''],
      prenom: [''],
      email:[''],
      tel: [''],
      password: [''],
      role: [''],
    });
  }
  ngOnInit(): void {
  }


  async addUser(form: any){

    form.value.confirmed = true;
    console.log('le formulaire', form.value);

    await axios.post('http://localhost:1337/users', form.value,{
      headers: {
        Authorization:
          'Bearer ' + sessionStorage.getItem('currentJwt'),
      }
    }
    ).then(resp => {
      console.log('reponse produit', resp );
   });
  }

}
