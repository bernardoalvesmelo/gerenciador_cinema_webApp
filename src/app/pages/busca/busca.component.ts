import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmeBusca } from 'src/app/models/filme-busca';
import { FilmeDetalhes } from 'src/app/models/filme-detalhes';
import { FilmesService } from 'src/app/services/filmes.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit{
  filmesBusca: FilmeBusca[];

  constructor(
    private filmesService: FilmesService,
    private route: ActivatedRoute) {
    this.filmesBusca = []
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.selecionarFilmesDetalhesPorTitulo(params['query']);
      }
    );
  }

  selecionarFilmesDetalhesPorTitulo(titulo: string) {  
    if(titulo == '') {
      this.filmesBusca = [];
      return;
    }

    this.filmesService.selecionarFilmesBuscaPorTitulo(titulo).subscribe(filmesDetalhes => {
      this.filmesBusca = filmesDetalhes;
    });
  }
}
