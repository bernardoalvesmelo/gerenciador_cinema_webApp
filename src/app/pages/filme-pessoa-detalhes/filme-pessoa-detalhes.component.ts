import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmePessoaDetalhes } from 'src/app/models/filme-pessoa-detalhes';
import { FilmesService } from 'src/app/services/filmes.service';

@Component({
  selector: 'app-filme-pessoa-detalhes',
  templateUrl: './filme-pessoa-detalhes.component.html',
  styleUrls: ['./filme-pessoa-detalhes.component.css']
})
export class FilmePessoaDetalhesComponent implements OnInit{
  pessoaDetalhes: FilmePessoaDetalhes;
  
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
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.filmeService.selecionarPessoaPorId(id).subscribe(pessoaDetalhes => {
      this.pessoaDetalhes = pessoaDetalhes;
    })
  }
}
