import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioAtivos } from '../usuarioAtivos';
import { Ativos } from '../ativos';
import {Route, Router} from '@angular/router'
import axios from 'axios';

@Component({
  selector: 'app-minha-carteira',
  templateUrl: './minha-carteira.component.html',
  styleUrls: ['./minha-carteira.component.css']
})
export class MinhaCarteiraComponent implements OnInit {

  ativos : Array<Ativos> = [];
  grupos : Array<string> = [];
  usuario : Usuario
  usuarioAtivos : Array<UsuarioAtivos> = [];
  IdUsuarioAtivos : Array<UsuarioAtivos> = [];
  usuarioId : number;
  soma: number;

  constructor(private router: Router) {

      this.usuarioId = 0

      this.soma = 0

      this.usuario = {

        id: 0,
        nome: "",
        dataNasc: "",
        senha: "",
        login: "",
        tipo: 0,
        gerente: 0

      }

   }

  ngOnInit(): void {

    if(localStorage.getItem("authTokenClient") == null){
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
        'Authorization': 'Bearer ' + localStorage.getItem('authTokenClient')
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
      self.usuarioId = self.usuario.id
    })
    .catch(function (error:any) {
      console.log(error);
    });

    var data2 = JSON.stringify({
      
    });
    var config2 = {
      method: 'get',
      url: 'http://localhost:5232/usuarioAtivos/getByCliente',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authTokenClient')
      },
      data : data2
    };
    axios(config2)
    .then(function (response:any) {
      self.usuarioAtivos = response.data;
      for(var i = 0; i < self.usuarioAtivos.length; i++){
        let tem = self.grupos.includes(self.usuarioAtivos[i].ativo.grupo.nome)

        if(tem == false){
          self.grupos.push(self.usuarioAtivos[i].ativo.grupo.nome)
        }

        self.soma = self.soma + self.usuarioAtivos[i].saldo
      }
      console.log(self.grupos);
      console.log(self.usuarioAtivos);
    })
    .catch(function (error:any) {
      console.log(error);
    });

    var data3 = JSON.stringify({
      
    });
    var config3 = {
      method: 'get',
      url: 'http://localhost:5232/ativos/getAll',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authTokenClient')
      },
      data : data3
    };
    axios(config3)
    .then(function (response:any) {
      self.ativos = response.data;
    })
    .catch(function (error:any) {
      console.log(error);
    });

  }

  // Funcao para resgatar o Id do Ativo
  PegarIdAtivo(){

    let select = document.getElementById("GrupoAtivo") as HTMLSelectElement;
    let option = select.options[select.selectedIndex];

    return parseInt(option.value)

  }


  // Funcao para poder somar o saldo
  AddSaldo(){

    var idAtivo = this.PegarIdAtivo()

    let quantia = document.getElementById("valor") as HTMLInputElement;

    if(quantia.value < "0"){
      return alert("Insira um valor positivo!")
    }

    let self = this;
    
    console.log("chegou aqui pra add saldo");

    var data = JSON.stringify({

      
    });
    var config = {
      method: 'get',
      url: 'http://localhost:5232/usuarioAtivos/getUserAtivo/' + idAtivo,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authTokenClient')
      },
      data : data
    };
    axios(config)
    .then(function (response:any) {
      console.log(response.data);
      self.IdUsuarioAtivos = response.data
      if(response.data.length == 0){

        var data = JSON.stringify({
          "id" : 0,
          "usuario":{
            "id" : self.usuarioId,
            "dataNasc" : "2022-10-20T00:53:48.126Z",
            "nome" : "",
            "tipo" : 0,
            "login" : "",
            "senha" : "",
            "gerente": 0
          },
          "ativo": {
            "id" : idAtivo,
            "nome" : "string",
            "grupo" : {
              "id" : 0,
              "nome" : ""
            }
          },
          "saldo" : quantia.value

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
      else{

        var data = JSON.stringify({
          "id" : self.IdUsuarioAtivos[0].id,
          "usuario":{
            "id" : 0,
            "dataNasc" : "2022-10-20T00:53:48.126Z",
            "nome" : "",
            "tipo" : 0,
            "login" : "",
            "senha" : "",
            "gerente": 0
          },
          "ativo": {
            "id" : 0,
            "nome" : "string",
            "grupo" : {
              "id" : 0,
              "nome" : ""
            }
          },
          "saldo" : quantia.value
        });
        var config = {
          method: 'put',
          url: 'http://localhost:5232/usuarioAtivos/mudarSaldo/' + self.IdUsuarioAtivos[0].id,
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
    })
    .catch(function (error:any) {
      console.log(error);
    });



   

  }

  // Funcao para poder subtrair o saldo
  DiminuirSaldo(){

    var idAtivo = this.PegarIdAtivo()

    let quantia = document.getElementById("valor") as HTMLInputElement;

    let resultado = parseFloat(quantia.value) - (parseFloat(quantia.value)*2)

    let self = this;

    var data = JSON.stringify({
      
    });
    var config = {
      method: 'get',
      url: 'http://localhost:5232/usuarioAtivos/getUserAtivo/' + idAtivo,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authTokenClient')
      },
      data : data
    };
    axios(config)
    .then(function (response:any) {
      console.log(response.data);
      self.IdUsuarioAtivos = response.data
      if(response.data.length == 0){

        alert("Voce não pode vender um ativo que não possui!")
      }
      else{

        if(parseInt(quantia.value) > self.IdUsuarioAtivos[0].saldo){
          console.log(quantia.value)
          console.log(self.IdUsuarioAtivos[0].saldo.toString())
          return alert("Você não pode vender mais do que possui!")
        }

        if((self.IdUsuarioAtivos[0].saldo + resultado) <= 0){

          console.log(self.IdUsuarioAtivos[0].id)

          var data = JSON.stringify({
          });
          var config = {
            method: 'delete',
            url: 'http://localhost:5232/usuarioAtivos/del/' + self.IdUsuarioAtivos[0].id,
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
        else{

          var data = JSON.stringify({
            "id" : self.IdUsuarioAtivos[0].id,
            "usuario":{
              "id" : 0,
              "dataNasc" : "2022-10-20T00:53:48.126Z",
              "nome" : "",
              "tipo" : 0,
              "login" : "",
              "senha" : "",
              "gerente": 0
            },
            "ativo": {
              "id" : 0,
              "nome" : "string",
              "grupo" : {
                "id" : 0,
                "nome" : ""
              }
            },
            "saldo" : resultado
          });
          var config = {
            method: 'put',
            url: 'http://localhost:5232/usuarioAtivos/mudarSaldo/' + self.IdUsuarioAtivos[0].id,
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
    })
    .catch(function (error:any) {
      console.log(error);
    });

  }

}
