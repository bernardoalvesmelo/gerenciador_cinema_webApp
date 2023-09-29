import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmePessoaDetalhes } from 'src/app/models/filme-pessoa-detalhes';
import { Filme } from 'src/app/models/listagem-filme';
import { FilmesService } from 'src/app/services/filmes.service';

@Component({
  selector: 'app-filme-pessoa-detalhes',
  templateUrl: './filme-pessoa-detalhes.component.html',
  styleUrls: ['./filme-pessoa-detalhes.component.css']
})
export class FilmePessoaDetalhesComponent implements OnInit{
  pessoaDetalhes: FilmePessoaDetalhes;
  filmes: Filme[];
  filmesVisivel: boolean;

  
  constructor( 
    private route: ActivatedRoute,
    private filmeService: FilmesService) {
    this.pessoaDetalhes = {
      id: 0,
      nome: '',
      caminho_avatar: '',
      conhecido_como: '',
      biografia: ''
    }
    
    this.filmes = [];
    this.filmesVisivel = false;
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.filmeService.selecionarPessoaPorId(id).subscribe(pessoaDetalhes => {
      this.pessoaDetalhes = pessoaDetalhes;
    });

    this.filmeService.selecionarFilmesPorPessoaId(id).subscribe(filmes => {
      this.filmes = filmes;
    });
  }

  alterarVisualizacaoFilmes() {
    this.filmesVisivel = !this.filmesVisivel;
  }
}
