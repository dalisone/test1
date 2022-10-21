import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Ativos } from '../ativos';
import { Grupos } from '../grupos';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-ativos-cadastro',
  templateUrl: './ativos-cadastro.component.html',
  styleUrls: ['./ativos-cadastro.component.css']
})
export class AtivosCadastroComponent implements OnInit {

  ativos : Array<Ativos> = []; 
  grupos : Array<Grupos> = [];

  constructor(private router: Router) {

   }

  ngOnInit(): void {

    if(localStorage.getItem("authTokenAdm") == null){
      alert("Voce nao tem permissao para acessar essa pagina! Fazendo LogOff...")
      localStorage.removeItem('authTokenClient')
      localStorage.removeItem('authTokenGerente')
      localStorage.removeItem('authTokenAdm')
      this.router.navigate([''])
    }

    var data = JSON.stringify({
      
    });
    let self = this;
    var config = {
      method: 'get',
      url: 'http://localhost:5232/ativos/getAll',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authTokenAdm')
      },
      data : data
    };
    axios(config)
    .then(function (response:any) {
      self.ativos = response.data
      console.log(self.ativos)
    })
    .catch(function (error:any) {
      console.log(error);
    });


    var data2 = JSON.stringify({});

    var config2= {
      method: 'get',
      url: 'http://localhost:5232/grupos/getAll',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authTokenAdm')
      },
      data : data2
    };
    axios(config2)
    .then(function (response:any) {
      self.grupos = response.data
      console.log(self.grupos)
    })
    .catch(function (error:any) {
      console.log(error);
    });

  }

  // Funcao para registrar novos ativos no banco de dados
  registrar(){

    let select = document.getElementById("selectGrupos") as HTMLSelectElement;
    let option = select.options[select.selectedIndex];

    let nome = document.getElementById("name") as HTMLInputElement;

    var data = JSON.stringify({
      "id" : 0,
      "nome" : nome.value,
      "grupo":{
        "id": option.value,
        "nome": ""
      }
    });
    let self = this;
    var config = {
      method: 'post',
      url: 'http://localhost:5232/ativos/register',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authTokenAdm')
      },
      data : data
    };
    axios(config)
    .then(function (response:any) {
      window.location.reload()
    })
    .catch(function (error:any) {
      console.log(error);
    });

  }

  }

  
