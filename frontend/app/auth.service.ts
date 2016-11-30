import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Token } from './Token';


@Injectable()
export class AuthService {
    private authUrl = "http://localhost:25207/api/auth";
    private headers = new Headers({'Content-Type': 'application/json'});
    private tokenKey = "token";

    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    login(username: string, password: string) : Promise<string> {
        
        let input = {
            username: username,
            password: password  
        };

        return this.http.put(this.authUrl,
             JSON.stringify(input),
             {headers: this.headers})
        .toPromise()
        .then(response => {
            let token = response.json() as Token;

            console.info(token);
            if(token.success == true){
                sessionStorage.setItem(this.tokenKey, token.accessToken);
            }

            return token.username;
        }).catch(this.handleError);
    }

    appendAuthHeaders(headers: Headers) : Headers {
        var token = sessionStorage.getItem(this.tokenKey);  
        if (token == null) {
            return headers;
        }
        else {
            if(headers == null) {
                headers = new Headers();
            }

            headers.append("Authorization", "Bearer " + token);
            return headers; 
        }
    }
}