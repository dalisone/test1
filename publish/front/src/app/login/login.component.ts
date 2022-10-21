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

  //Funcao para validar os dados de login chamando a requisiçao
  login(){
    let login = document.getElementById("login") as HTMLInputElement;
    let senha = document.getElementById("password") as HTMLInputElement;

    var data = JSON.stringify({
      "login": login?.value,
      "senha": senha?.value,
      "tipo" : "",
      "dataNasc" : Date,
      "nome" : "",
      "gerente": 0
    });
    let self = this;
    var config = {
      method: 'post',
      url: 'http://localhost:5232/usuario/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response:any) {
      if(response.data.tipo == 0){
        localStorage.setItem('authTokenClient', response.data.token)
       self.router.navigate(['minha-carteira']);
      }
      else if(response.data.tipo == 1){
        localStorage.setItem('authTokenGerente', response.data.token)
        self.router.navigate(['meus-clientes']);
      }
      else if(response.data.tipo == 2){
        localStorage.setItem('authTokenAdm', response.data.token)
        self.router.navigate(['adm-landing']);
      }
    })
    .catch(function (error:any) {
      console.log(error);
    });

}
}
