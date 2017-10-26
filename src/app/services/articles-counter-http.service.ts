import { Injectable, NgZone } from "@angular/core";
import { Http } from "@angular/http";


@Injectable()

export class ArticleCounterHTTPService {
    public BASE_URL = 'https://fitneszona.rs';  

    constructor(
        private _http: Http,
        private _ngZone: NgZone
    ) {}

    getCategoriesWithNewArticles(timestring) {
        const body = JSON.stringify({timestring});
        return this._http.post(`${this.BASE_URL}/api/articles/all/counter`, body).map(
            response => response.json(),
            error => this._ngZone.runOutsideAngular(() => setTimeout(() => this.getCategoriesWithNewArticles(timestring), 500))
        );
    }
}
