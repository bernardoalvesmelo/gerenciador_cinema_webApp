import { FilmeBusca } from "./filme-busca"
import { FilmePessoa } from "./filme-pessoa"

export type FilmeBuscaListas = {
    filmes: FilmeBusca[],
    pessoas: FilmePessoa[]
}