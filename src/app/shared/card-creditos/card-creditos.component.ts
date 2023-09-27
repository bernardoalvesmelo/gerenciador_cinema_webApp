import { Component, Input } from '@angular/core';
import { FilmePessoa } from 'src/app/models/filme-pessoa';

@Component({
  selector: 'app-card-creditos',
  templateUrl: './card-creditos.component.html',
  styleUrls: ['./card-creditos.component.css']
})
export class CardCreditosComponent {
  @Input() pessoa: FilmePessoa;

  constructor() {
    this.pessoa = {
      id: 0, 
      nome: '', 
      caminho_avatar: ''}
  }
}
