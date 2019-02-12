import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class Connection {

    constructor(private http: Http, private storage: Storage) { }

    private extractData(res: Response) {
        let body = res.json();
        console.log(body)
        return body;
    }

    private handleThrowError(error: Response) {
        let error_body = error.json()
        console.error(error_body);
        return throwError(error_body);
    }

    url = "http://localhost:3000"
    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });


    login(user) {
        console.log(user)
        return this.http.post(this.url + '/login', user, this.options)
            .pipe(map(this.extractData), catchError(this.handleThrowError))
    }

    signIn(form) {
        console.log(form)
        return this.http.post(this.url + '/signIn', form, this.options)
            .pipe(map(this.extractData), catchError(this.handleThrowError))
    }
}