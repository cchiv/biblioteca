import { Book } from './book';

export interface User {
    id?: number;
    nome?: string;
    cognome?: string;
    residenza?: string;
    libro?: Book[];
}