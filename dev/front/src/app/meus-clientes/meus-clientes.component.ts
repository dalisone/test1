import { Component, OnInit } from '@angular/core';
import { UsuarioAtivos } from '../usuarioAtivos';
import axios from 'axios';

@Component({
  selector: 'app-meus-clientes',
  templateUrl: './meus-clientes.component.html',
  styleUrls: ['./meus-clientes.component.css']
})
export class MeusClientesComponent implements OnInit {

  clientes : Array<UsuarioAtivos> = [];
  dadosCliente: Array<Array<string>> = [];

  constructor() { }

  ngOnInit(): void {

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
        let dataNova = self.clientes[i].usuario.dataNasc.substring(0,10).toString();
        let year = dataNova.substring(0,4);
        let DataAtual = new Date();
        let AnoAtual = DataAtual.getFullYear();
        self.clientes[i].usuario.dataNasc = (AnoAtual  - parseInt(year)).toString();

        // aqui precisa implementar uma logica do nao include self.dadosCliente.push([self.clientes[i].usuario.nome, self.clientes[i].usuario.dataNasc, self.clientes[i].saldo.toString()])
      }
      console.log(self.clientes)
    })
    .catch(function (error:any) {
      console.log(error);
    });

  }

}
