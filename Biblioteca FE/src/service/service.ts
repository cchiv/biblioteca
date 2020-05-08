import { Observable } from 'rxjs';

export interface Service<model> {

    read(id: number): Observable<any>;
    delete(id: number): Observable<any>;
    update(model: model): Observable<any>;
    insert(model: model): Observable<any>;
    getAll(): Observable<any[]>;

}