import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgOptimizedImage } from '@angular/common'

import { HomeComponent } from './pages/home/home.component';
import { FilmeDetalhesComponent } from './pages/filme-detalhes/filme-detalhes.component';
import { BuscaComponent } from './pages/busca/busca.component';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { CardFilmeComponent } from './shared/card-filme/card-filme.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { FilmePesquisaComponent } from './shared/filme-pesquisa/filme-pesquisa.component';
import { CardAvaliacaoComponent } from './shared/card-avaliacao/card-avaliacao.component';

import { UrlSeguroPipe } from './pipes/url-seguro.pipe';
import { CardCreditosComponent } from './shared/card-creditos/card-creditos.component';
import { FilmePessoaDetalhesComponent } from './pages/filme-pessoa-detalhes/filme-pessoa-detalhes.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CardFilmeComponent,
    FilmeDetalhesComponent,
    PaginationComponent,
    FilmePesquisaComponent,
    CardAvaliacaoComponent,
    BuscaComponent,
    UrlSeguroPipe,
    CardCreditosComponent,
    FilmePessoaDetalhesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgbPaginationModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
