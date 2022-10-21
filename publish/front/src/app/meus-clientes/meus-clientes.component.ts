import { Component, OnInit } from '@angular/core';
import { UsuarioAtivos } from '../usuarioAtivos';
import axios from 'axios';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-meus-clientes',
  templateUrl: './meus-clientes.component.html',
  styleUrls: ['./meus-clientes.component.css']
})
export class MeusClientesComponent implements OnInit {

  clientes : Array<UsuarioAtivos> = [];
  saldos: Array<number> = [100,50,200];
  nome : string = ""
  usuarioId : number = 0
  gerenteId: number = 0

  constructor(private router: Router) { }

  ngOnInit(): void {

    if(localStorage.getItem("authTokenGerente") == null){
      alert("Voce nao tem permissao para acessar essa pagina! Fazendo LogOff...")
      localStorage.removeItem('authTokenClient')
      localStorage.removeItem('authTokenGerente')
      localStorage.removeItem('authTokenAdm')
      this.router.navigate([''])
    }

    var data2 = JSON.stringify({
      
    });
    var config2 = {
      method: 'get',
      url: 'http://localhost:5232/usuario/getById',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authTokenGerente')
      },
      data : data2
    };
    axios(config2)
    .then(function (response:any) {
      self.gerenteId = response.data.id;
    })
    .catch(function (error:any) {
      console.log(error);
    });

    var data = JSON.stringify({
      
    });
    let self = this;
    var config = {
      method: 'get',
      url: 'http://localhost:5232/usuario/getClientes',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authTokenGerente')
      },
      data : data
    };
    axios(config)
    .then(function (response:any) {
      self.clientes = response.data
      for(var i =0; i < self.clientes.length; i++){
        let dataNova = self.clientes[i].dataNasc.substring(0,10).toString();
        let year = dataNova.substring(0,4);
        let DataAtual = new Date();
        let AnoAtual = DataAtual.getFullYear();
        self.clientes[i].dataNasc = (AnoAtual  - parseInt(year)).toString();
        
      }
    })
    .catch(function (error:any) {
      console.log(error);
    });

  }

  // Funcao para cadastrar novos clientes no banco de dados
  cadastrar(){

    let nome = document.getElementById("name") as HTMLInputElement;

    let dataNascimento = document.getElementById("date") as HTMLInputElement;

    let primeiroNome = (nome.value).substring(0, (nome.value).indexOf(" "))

    let self = this
    
    if((nome.value).indexOf(" ") == -1){
      primeiroNome = nome.value
    }

    console.log(self.gerenteId)

    var data = JSON.stringify({
      "id" : 0,
      "dataNasc" : dataNascimento?.value + "T00:00:00.000Z",
      "nome" : nome?.value,
      "tipo" : 0,
      "login" : "login_" + primeiroNome,
      "senha" : "senha_" + primeiroNome,
      "gerente" : self.gerenteId
    });
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
      self.pegarId(nome.value)
      console.log(response.data)
    })
    .catch(function (error:any) {
      console.log(error);
    });

  }

  // Funcao para resgatar Id do novo usuario recém cadastrado no banco de dados
  pegarId(nome: string){

    var data2 = JSON.stringify({
      "nome" : nome,
      "dataNasc" : new Date(),
      "login": "",
      "senha": ""
    });
    let self = this;
    var config2 = {
      method: 'post',
      url: 'http://localhost:5232/usuario/getIdByName',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authTokenGerente')
      },
      data : data2
    };
    axios(config2)
    .then(function (response:any) {
      self.usuarioId = response.data.id
      self.cadastrarAtivos(self.usuarioId)
    })
    .catch(function (error:any) {
      console.log(error);
    });

  }

  // Funcao ativada automaticamente ao cadastrar para fazer o cadastro dos Ativos padrões dos clientes
  cadastrarAtivos(id: number){

    for(var i = 0; i < this.saldos.length; i++){
      

      var data = JSON.stringify({
        "id" : 0,
        "usuario":{
          "id" : id,
          "dataNasc" : "2022-10-20T00:53:48.126Z",
          "nome" : "",
          "tipo" : 0,
          "login" : "",
          "senha" : "",
          "gerente": 0
        },
        "ativo": {
          "id" : i+1,
          "nome" : "string",
          "grupo" : {
            "id" : 0,
            "nome" : ""
          }
        },
        "saldo" : this.saldos[i]
  
      });
      var config = {
        method: 'post',
        url: 'http://localhost:5232/usuarioAtivos/register',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('authTokenClient')
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

}
