import { Component, Input } from '@angular/core';
import { Filme } from 'src/app/models/listagem-filme';

@Component({
  selector: 'app-filme-listagem',
  templateUrl: './filme-listagem.component.html',
  styleUrls: ['./filme-listagem.component.css']
})
export class FilmeListagemComponent {
  @Input() filmes: Filme[];

  constructor() {
    this.filmes = [];
  }
}
