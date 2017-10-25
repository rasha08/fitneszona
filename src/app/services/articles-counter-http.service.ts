import { Injectable } from "@angular/core";
import { Http } from "@angular/http";


@Injectable()

export class ArticleCounterHTTPService {
    public BASE_URL = 'https://fitneszona.rs/';  

    constructor(
        private _http: Http
    ){ }

    
    getCategoriesWithNewArticles(timestring){
        console.log(timestring);
        return this._http.get(`${this.BASE_URL}/api/articles/all/counter`, timestring).map(
            response => response.json(),
            error => console.log('Errorat articles-counter-http.service:',error)
        );
    }

}