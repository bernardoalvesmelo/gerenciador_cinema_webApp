import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Filme } from '../models/listagem-filme';
import { FilmeDetalhes } from '../models/filme-detalhes';
import { FilmeCreditos } from '../models/filme-creditos';
import { FilmeTrailer } from '../models/filme-trailer';
import { Avaliacao } from '../models/filme-avaliacao';
import { FilmeBusca } from '../models/filme-busca';
import { FilmePessoaDetalhes } from '../models/filme-pessoa-detalhes';
import { FilmePessoa } from '../models/filme-pessoa';
import { FilmeBuscaListas } from '../models/filme-busca-listas';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) { }

  public selecionarFilmePorId(id: number): Observable<Filme> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => this.mapearFilme(obj))
      );
  }

  public selecionarFilmesPorTitulo(titulo: string): Observable<Filme[]> {
    const query: string = titulo.split(' ').join('+');

    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&query=${query}&language=pt-BR&page=1`;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => obj.results),
        map(results => this.mapearFilmes(results))
      );
  }

  public selecionarFilmesPorPessoaId(id: number): Observable<Filme[]> {

    const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?language=pt-BR`;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => obj.cast),
        map(cast => this.mapearFilmes(cast))
      );
  }

  public selecionarFilmesBuscaPorTitulo(titulo: string): Observable<FilmeBusca[]> {
    const query: string = titulo.split(' ').join('+');
    
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&query=${query}&language=pt-BR&page=1`;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => obj.results),
        map(results => this.mapearFilmesBusca(results))
      );
  }

  public selecionarFilmeBuscaPorParametros(parametros: string): Observable<FilmeBuscaListas> {
    const query: string = parametros.split(' ').join('+');
    console.log(query);
    const url = `https://api.themoviedb.org/3/search/multi?include_adult=false&query=${query}&language=pt-BR&page=1`;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => obj.results),
        map(results => this.mapearBusca(results))
      );
  }

  public selecionarDetalhesFilmePorId(id: number): Observable<FilmeDetalhes> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(detalhesFilme => this.mapearDetalhesFilme(detalhesFilme))
      );
  }


  public selecionarCreditosFilmePorId(id: number): Observable<FilmeCreditos> {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=pt-BR`;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => obj.crew),
        map(crew => this.mapearCreditosFilme(crew))
      );
  }


  public selecionarFilmesMaisPopulares(pagina?: number): Observable<Filme[]> {
    pagina = pagina ? pagina : 1;
    const url = "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=" + pagina;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => obj.results),
        map(results => this.mapearFilmes(results))
      );
  }

  public selecionarFilmesMelhoresAvaliados(pagina?: number): Observable<Filme[]> {
    pagina = pagina ? pagina : 1;

    const url = "https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=" + pagina;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => obj.results),
        map(results => this.mapearFilmes(results))
      );
  }

  public selecionarFilmesPorIds(ids: number[]): Observable<Filme[]> {
    const observables = ids.map(id => this.selecionarFilmePorId(id));

    return forkJoin(observables);
  }

  public selecionarTrailerPorId(id: number): Observable<FilmeTrailer> {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => obj.results),
        map(results => this.mapearFilmeTrailer(results))
      );
  }

  public selecionarAvaliacoesPorId(id: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}/reviews?language=pt-BR`;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => obj.results),
        map(results => this.mapearAvaliacoes(results))
      );
  }

  public selecionarPessoaPorId(id: number): Observable<FilmePessoaDetalhes> {
    const url = `https://api.themoviedb.org/3/person/${id}?language=pt-BR`;

    return this.http.get<any>(url, this.obterHeaderAutorizacao())
      .pipe(
        map(obj => this.mapearFilmePessoaDetalhes(obj))
      );
  }

  private obterHeaderAutorizacao() {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': environment.API_KEY,
      })
    };
  }

  private mapearFilme(obj: any): Filme {
    return {
      id: obj.id,
      titulo: obj.title,
      poster: obj.poster_path ?? ''
    }
  }

  private mapearDetalhesFilme(obj: any): FilmeDetalhes {
    const apiGeneros: any[] = obj.genres ?? [];

    return {
      id: obj.id,
      titulo: obj.title,
      poster: obj.poster_path ?? '',
      votos: obj.vote_count,
      nota: Math.round(obj.vote_average * 100) / 100,
      data: obj.release_date,
      descricao: obj.overview,
      generos: apiGeneros.map(g => g.name)
    }
  }

  private mapearFilmeBusca(obj: any): FilmeBusca {
    return {
      id: obj.id,
      titulo: obj.title,
      poster: obj.poster_path ?? '',
      data: obj.release_date,
      descricao: obj.overview
    }
  }

  private mapearFilmePessoaDetalhes(obj: any): FilmePessoaDetalhes {
    return {
      id: obj.id,
      nome: obj.name,
      caminho_avatar: obj.profile_path ?? '',
      conhecido_como: obj.also_known_as ? obj.also_known_as[0] ?? '' : '',
      biografia: obj.biography
    }
  }

  private mapearCreditosFilme(obj: any[]): FilmeCreditos {
    let creditos = {
      diretores: obj.filter(c => c.known_for_department == "Directing")?.map(c => this.mapearFilmePessoa(c)),
      escritores: obj.filter(c => c.known_for_department == "Writing")?.map(c => this.mapearFilmePessoa(c)),
      atores: obj.filter(c => c.known_for_department == "Acting")?.map(c => this.mapearFilmePessoa(c)),
    }

    let valores = Object.values(creditos);

    creditos.diretores = valores[0].filter(
      (v, indice) => valores[0].find(t => t.nome == v.nome) == valores[0][indice]);

    creditos.escritores = valores[1].filter(
      (v, indice) => valores[1].find(t => t.nome == v.nome) == valores[1][indice]);

    creditos.atores = valores[2].filter(
      (v, indice) => valores[2].find(t => t.nome == v.nome) == valores[2][indice]);

    return creditos;
  }

  private mapearFilmePessoa(obj: any) {
    return {
      id: obj.id, 
      nome: obj.name, 
      caminho_avatar: obj.profile_path ?? ''}
  }

  private mapearFilmeTrailer(obj: any): FilmeTrailer {
    const trailer = obj[obj.length - 1]?.key;
    return {
      trailer_caminho: trailer == null ? "" : trailer
    };
  }

  private mapearFilmes(obj: any[]): Filme[] {

    const filmesMapeados = obj.map(filme => this.mapearFilme(filme));
    return filmesMapeados;
  }

  private mapearFilmesDetalhes(obj: any[]): FilmeDetalhes[] {
    const filmesMapeados = obj.map(filme => this.mapearDetalhesFilme(filme));
    return filmesMapeados;
  }


  private mapearFilmesBusca(obj: any[]): FilmeBusca[] {
    const filmesMapeados = obj.map(filme => this.mapearFilmeBusca(filme));
    return filmesMapeados;
  }

  private mapearBusca(obj: any[]): FilmeBuscaListas {
    const filmesBusca: FilmeBusca[] = [];
    const pessoasBusca: FilmePessoa[] = [];

    obj.forEach(o => {
      if(o.media_type == 'movie') {
        filmesBusca.push(this.mapearFilmeBusca(o));
      }

      else if(o.media_type == 'person') {
        pessoasBusca.push(this.mapearFilmePessoa(o));
      }     
    });

    return { 
      filmes: filmesBusca,
      pessoas: pessoasBusca
    };
  }

  private mapearAvaliacoes(obj: any[]): Avaliacao[] {
    const avaliacoesMapeadas = obj.map(avaliacao => this.mapearAvaliacao(avaliacao));
    return avaliacoesMapeadas;
  }

  private mapearAvaliacao(obj: any): Avaliacao {
    return {
      usuario: obj.author_details.username,
      caminho_avatar: obj.author_details.avatar_path ?? "",
      nota: obj.author_details.rating,
      conteudo: obj.content,
      data_atualizacao: obj.updated_at
    }
  }
}
