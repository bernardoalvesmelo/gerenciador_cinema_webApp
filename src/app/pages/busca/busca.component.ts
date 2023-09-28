import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmeBuscaListas } from 'src/app/models/filme-busca-listas';
import { FilmesService } from 'src/app/services/filmes.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit{
  filmeBuscaListas: FilmeBuscaListas;
  tipoLista: string;

  constructor(
    private filmesService: FilmesService,
    private route: ActivatedRoute) {
    this.filmeBuscaListas = {
      filmes: [], 
      pessoas:[]
    };

    this.tipoLista = 'filme';
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.selecionarFilmeBuscaPorParametros(params['query']);
      }
    );
  }

  selecionarFilmeBuscaPorParametros(parametros: string) {  
    if(parametros == '') {
      this.filmeBuscaListas = {
      filmes: [], 
      pessoas:[]
      };
      return;
    }

    this.filmesService.selecionarFilmeBuscaPorParametros(parametros).subscribe(filmeBuscaListas => {
      this.filmeBuscaListas = filmeBuscaListas;
    });
  }

  selecionarLista(tipoLista: string) {
    this.tipoLista = tipoLista;
  }
}
