import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("authTokenAdm") == null){
      alert("Voce nao tem permissao para acessar essa pagina! Fazendo LogOff...")
      localStorage.removeItem('authTokenClient')
      localStorage.removeItem('authTokenGerente')
      localStorage.removeItem('authTokenAdm')
      this.router.navigate([''])
    }
  }

}
