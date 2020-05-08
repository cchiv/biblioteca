import { User } from './user';

export interface Book {
    id?:number;
    isbn?: number;
    titolo?: string;
    autore?: string;
    editore?: string;
    genere?: string;
    disponibile?: boolean;
    inizioPrestito?: Date;
    utente: User;
}