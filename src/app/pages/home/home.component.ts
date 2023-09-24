import { Component, OnInit } from '@angular/core';
import { HistoricoUsuario } from 'src/app/models/historico-usuario';
import { Filme } from 'src/app/models/listagem-filme';
import { FilmesService } from 'src/app/services/filmes.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  filmes: Filme[] = [];
  historico: HistoricoUsuario;
  listagemTipo: string;
  ehPaginado: boolean;

  constructor(
    private filmesService: FilmesService,
    private localStorageService: LocalStorageService,
    ) {
      this.historico = new HistoricoUsuario();
      this.listagemTipo = 'populares';
      this.ehPaginado = true;
    }

  ngOnInit(): void {  
      this.historico = this.localStorageService.carregarDados();
  
      this.selecionarFilmesPopulares();
    }

  selecionarFavoritos() {
    this.listagemTipo = 'favoritos';
    this.ehPaginado = false;

    if(this.historico.filmes_ids.length == 0) {
      this.filmes = [];
      return;
    }

    this.filmesService.selecionarFilmesPorIds(this.historico.filmes_ids).subscribe(filmes => {
      this.filmes = filmes;
    });
  }

  selecionarFilmesPopulares(pagina?:number) {
    pagina = pagina ? pagina : 1;

    this.listagemTipo = 'populares';
    this.ehPaginado = true;

    this.filmesService.selecionarFilmesMaisPopulares(pagina).subscribe(filmes => {
      this.filmes = filmes;
    });
  }

  selecionarFilmesMelhoresAvaliados(pagina?:number) {
    pagina = pagina ? pagina : 1;

    this.listagemTipo = 'avaliados';
    this.ehPaginado = true;

    this.filmesService.selecionarFilmesMelhoresAvaliados(pagina).subscribe(filmes => {
      this.filmes = filmes;
    });
  }

  selecionarFilmesPorTitulo(titulo?: string) {  
    this.listagemTipo = 'pesquisados';
    this.ehPaginado = false;

    if(!titulo) {
      this.filmes = [];
      return;
    }

    this.filmesService.selecionarFilmesPorTitulo(titulo).subscribe(filmes => {
      this.filmes = filmes;
    });
  }

  paginaSelecionada(pagina: number) {
    if(this.listagemTipo == 'populares') {
      this.selecionarFilmesPopulares(pagina);
    }

    else if(this.listagemTipo == 'avaliados') {
      this.selecionarFilmesMelhoresAvaliados(pagina);
    }
  }
}
