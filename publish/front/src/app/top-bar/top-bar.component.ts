import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  TokenCliente : string | null;
  TokenGerente : string | null;
  TokenAdm : string | null;

  constructor() { 

    this.TokenCliente = localStorage.getItem('authTokenClient')
    this.TokenGerente = localStorage.getItem('authTokenGerente')
    this.TokenAdm = localStorage.getItem('authTokenAdm')

  }

  ngOnInit(): void {
  }

  sair(){

    localStorage.removeItem('authTokenClient')
    localStorage.removeItem('authTokenGerente')
    localStorage.removeItem('authTokenAdm')

  }

}
