import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Subject } from "rxjs/Subject";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()

export class ConfigurationService {
    private BASE_URL: string = 'http://fitneszona.rs';

    private _openCategories = new Subject();
    public openCategories$ = this._openCategories.asObservable();

    constructor(
        private _http: Http
    ){ }

    getCategories(){
        return this._http.get(`${this.BASE_URL}/api/1/categories`).map(
            result => result.json(),
            error => console.log(error)
        )
    }

    public getNewArticleForEveryCategory(timestring: string){
        return this._http.post(`${this.BASE_URL}/`,timestring).map(
          response => response.json(),
          error => console.log(error)
        )
      }
}