import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import { Usuario } from '../usuario';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-gerente-cadastro',
  templateUrl: './gerente-cadastro.component.html',
  styleUrls: ['./gerente-cadastro.component.css']
})
export class GerenteCadastroComponent implements OnInit {

  usuario : Usuario
  gerentes : Array<Usuario> = []

  constructor(private router: Router) { 

    this.usuario = {

      id: 0,
      nome: "",
      dataNasc: "",
      senha: "",
      login: "",
      tipo: 0,
      gerente : 0

    }

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
      url: 'http://localhost:5232/usuario/getById',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authTokenAdm')
      },
      data : data
    };
    axios(config)
    .then(function (response:any) {
      self.usuario = response.data;
      let dataNova = self.usuario.dataNasc.substring(0,10).toString();
      let year = dataNova.substring(0,4);
      let DataAtual = new Date();
      let AnoAtual = DataAtual.getFullYear();
      self.usuario.dataNasc = (AnoAtual  - parseInt(year)).toString();
    })
    .catch(function (error:any) {
      console.log(error);
    });



    var config = {
      method: 'get',
      url: 'http://localhost:5232/usuario/getByType',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authTokenAdm')
      },
      data : data
    };
    axios(config)
    .then(function (response:any) {
      console.log(response.data)
      self.gerentes = response.data
      for(var i =0; i < self.gerentes.length; i++){
        let dataNova = self.gerentes[i].dataNasc.substring(0,10).toString();
        let year = dataNova.substring(0,4);
        let DataAtual = new Date();
        let AnoAtual = DataAtual.getFullYear();
        self.gerentes[i].dataNasc = (AnoAtual  - parseInt(year)).toString();
      }
    })
    .catch(function (error:any) {
      console.log(error);
    });

  }

  //Funcao para registrar novos gerentes no banco de dados
  registrar(){

    let nome = document.getElementById("name") as HTMLInputElement;

    let dataNascimento = document.getElementById("date") as HTMLInputElement;

    let primeiroNome = (nome.value).substring(0, (nome.value).indexOf(" "))
    
    if((nome.value).indexOf(" ") == -1){
      primeiroNome = nome.value
    }


    var data = JSON.stringify({
      "id" : 0,
      "dataNasc" : dataNascimento?.value + "T00:00:00.000Z",
      "nome" : nome?.value,
      "tipo" : 1,
      "login" : "login_" + primeiroNome,
      "senha" : "senha_" + primeiroNome,
      "gerente" : 0
    });
    let self = this;
    var config = {
      method: 'post',
      url: 'http://localhost:5232/usuario/register',
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
