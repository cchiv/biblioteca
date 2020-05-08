import { Service } from './service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export abstract class AbstractService<model> implements Service<model> {

    type: string;
    port = '8080';

    constructor(protected http: HttpClient) {
    }

    getAll(): Observable<any[]> {
        return this.http.get<model[]>('http://localhost:' + this.port + '/' + this.type + '/findAll');
    }

    read(id: number): Observable<any> {
        return this.http.get<any>('http://localhost:' + this.port + '/' + this.type + '/read/' + id);
    }

    delete(id: number): Observable<any> {
        return this.http.delete('http://localhost:' + this.port + '/' + this.type + '/delete/' + id);
    }

    insert(model: any): Observable<any> {
        return this.http.post('http://localhost:' + this.port + '/' + this.type + '/insert', model);
    }

    update(model: any): Observable<any> {
        return this.http.put<model>('http://localhost:' + this.port + '/' + this.type + '/update/' + model.id, model);
    }
}
