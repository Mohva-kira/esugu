import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  fileToUpload: any  ;
  produitForm: any;
  imagePath : Array<any> = [];
  categories: any;
  genres: any;
  constructor(private fb: FormBuilder) {

    this.produitForm = this.fb.group({
      nom: [''],
      prix: [''],
      description:[''],
      image: [''],
      genre: [''],
      categorie: [''],
    });
  }
  async ngOnInit(): Promise<void>{
    // make you api call here

    try {
      const response = await axios.get('http://localhost:1337/categories', {
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('currentJwt'),
        },
      });

      this.categories = response.data;

      console.log('Initiation des categories ', this.categories);
    } catch (error) {
      error = error;
    }
  }

  async handleFileInput(files: any) {
    const fileList = files.target.files;
    // check whether file is selected or not



    console.log( fileList);
    for (var i = 0; i < fileList.length; i++) {
      console.log('Le fichier', fileList[i]);
      const bodyFormData = new FormData()
      let info = { id: i, name: 'sneakersaddict_produit' };
      bodyFormData.append('id', '2');
      bodyFormData.append('update', '2');

      bodyFormData.append('tz', new Date().toISOString());
      bodyFormData.append(`files`, fileList[i], fileList[i].name)
      bodyFormData.append('info', JSON.stringify(info));

      this.fileToUpload = bodyFormData;
        await axios.post('http://localhost:1337/upload/', this.fileToUpload, {
          headers: {
            Authorization:
              'Bearer ' + sessionStorage.getItem('currentJwt'),
              'Content-Type': 'multipart/form-data'
          }
        }
        ).then(resp => {
          console.log('images', resp);
          console.log('donnée', resp.data[0]);
          this.imagePath.push(resp.data[0]);
          console.log('path', this.imagePath );
       });
    };

    // if (fileList.length > 0) {
    //   const file = fileList[0];

    //   //get file information such as name, size and type
    //   console.log('info', file.name, file.size, file.type);
    //   //max file size is 4 mb
    //   // tslint:disable-next-line: curly
    //   if (file.size / 1048576 <= 4) {
    //     let formData = new FormData();
    //     let info = { id: 2, name: 'sneakersaddict' };
    //     formData.append('files', file, file.name);
    //     formData.append('id', '2');
    //     formData.append('tz', new Date().toISOString());
    //     formData.append('update', '2');
    //     formData.append('info', JSON.stringify(info));
    //     this.fileToUpload = formData;

    //     console.log(formData);


    //     await axios.post('http://37.187.39.3:4337/upload/', this.fileToUpload, {
    //       headers: {
    //         Authorization:
    //           'Bearer ' + sessionStorage.getItem('currentJwt'),
    //           'Content-Type': 'multipart/form-data'
    //       }
    //     }
    //     ).then(resp => {
    //       console.log('images', resp);
    //       this.imagePath = resp.data[0];
    //       console.log('path', this.imagePath );
    //    });


    //   }
    // }
  }

 async createProduct(form: any){

  console.log('path', this.imagePath);
  form.value.images = this.imagePath;

  console.log('images', form.value.images);
  form.value.category = form.value.categorie;
  form.value.genres = form.value.genre;
  console.log(form.value);
  await axios.post('http://localhost:1337/produits', form.value,{
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
