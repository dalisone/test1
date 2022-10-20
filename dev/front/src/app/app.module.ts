import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Router, RouterModule } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { GerenteCadastroComponent } from './gerente-cadastro/gerente-cadastro.component';
import { AtivosCadastroComponent } from './ativos-cadastro/ativos-cadastro.component';
import { MeusClientesComponent } from './meus-clientes/meus-clientes.component';
import { MinhaCarteiraComponent } from './minha-carteira/minha-carteira.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopBarComponent,
    AdminLandingComponent,
    GerenteCadastroComponent,
    AtivosCadastroComponent,
    MeusClientesComponent,
    MinhaCarteiraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'adm-landing', component: AdminLandingComponent},
      {path: 'atv-cadastro', component: AtivosCadastroComponent},
      {path: 'gerente-cadastro', component: GerenteCadastroComponent},
      {path: 'meus-clientes', component:MeusClientesComponent},
      {path:'minha-carteira', component:MinhaCarteiraComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
