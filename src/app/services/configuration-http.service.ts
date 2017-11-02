import { Injectable, NgZone } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { Subject } from "rxjs/Subject";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()

export class ConfigurationHTTPService {
    public BASE_URL: string = 'https://fitneszona.rs';
    
    constructor(
        private _http: Http,
        private _ngZone: NgZone
    ) {}

    public getUserActiveCategories(id) {
        return this._http.get(`${this.BASE_URL}/api/configuration/${id}/categories`)
            .map(
                response => response.json(),
                error => this._ngZone.runOutsideAngular(() => setTimeout(() => this.getUserActiveCategories(id), 500))
            );
    }

    public getUserConfiguration(id) {
        return this._http.get(`${this.BASE_URL}/api/configuration/${id}`)
            .map(
                response => response.json(),
                error => this._ngZone.runOutsideAngular(() => setTimeout(() => this.getUserConfiguration(id), 500))
            );
    }

    public getUserTags(id){
        return this._http.get(`${this.BASE_URL}/api/configuration/${id}/tags-priority-list`)
            .map(
                response => response.json(),
                error => console.log(error)
            )
    }

}
