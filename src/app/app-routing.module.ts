import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FilmeDetalhesComponent } from './pages/filme-detalhes/filme-detalhes.component';
import { BuscaComponent } from './pages/busca/busca.component';
import { FilmePessoaDetalhesComponent } from './pages/filme-pessoa-detalhes/filme-pessoa-detalhes.component';

const routes: Routes = [ {
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
},
{
  path: 'home',
  component: HomeComponent,
},
{
  path: 'filme-detalhes/:id',
  component: FilmeDetalhesComponent,
},
{
  path: 'busca',
  component: BuscaComponent,
},
{
  path: 'filme-pessoa-detalhes/:id',
  component: FilmePessoaDetalhesComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
