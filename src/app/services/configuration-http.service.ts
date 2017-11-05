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

    public getConfiguration() {
        return this._http.get(`${this.BASE_URL}/api/configuration/1`)
            .map(
                response => response.json(),
                error => this._ngZone.runOutsideAngular(
                    () => setTimeout(() => this.getConfiguration(), 500)
                )
            );
    }

}
