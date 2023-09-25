import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmeDetalhes } from 'src/app/models/filme-detalhes';
import { FilmesService } from 'src/app/services/filmes.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit{
  filmesDetalhes: FilmeDetalhes[];

  constructor(
    private filmesService: FilmesService,
    private route: ActivatedRoute) {
    this.filmesDetalhes = []
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
      this.filmesDetalhes = [];
      return;
    }

    this.filmesService.selecionarFilmesDetalhesPorTitulo(titulo).subscribe(filmesDetalhes => {
      this.filmesDetalhes = filmesDetalhes;
    });
  }
}
