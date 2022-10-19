import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    let login = document.getElementById("login") as HTMLInputElement;
    let senha = document.getElementById("password") as HTMLInputElement;

    var data = JSON.stringify({
      "edv": login?.value,
      "senha": senha?.value,
      "area" : "",
      "email" : "",
      "dataNasc" : Date,
      "nome" : ""
    });
    let self = this;
    var config = {
      method: 'post',
      url: 'http://localhost:5051/user/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response:any) {
      localStorage.setItem('authToken',response.data);
      localStorage.removeItem('authOwner');
      self.router.navigate(['Ocorrencias']);
    })
    .catch(function (error:any) {
      console.log(error);
    });

}
}
