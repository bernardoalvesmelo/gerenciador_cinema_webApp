import { FilmePessoa } from "./filme-pessoa"

export type FilmeCreditos = {
    diretores: FilmePessoa[],
    escritores: FilmePessoa[],
    atores: FilmePessoa[]
}