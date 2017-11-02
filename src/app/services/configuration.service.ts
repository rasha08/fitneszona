import { Injectable } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { Subject } from "rxjs/Subject";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { ConfigurationHTTPService } from "./configuration-http.service";

@Injectable()

export class ConfigurationService {
    public BASE_URL: string = 'http://fitneszona.rs';

    private _openConfiguration = new Subject();
    public openConfiguration$ = this._openConfiguration.asObservable();
    
    constructor(
        private _configurationHTTPService: ConfigurationHTTPService
    ){ }

    public getUserActiveCategories(id){
        this._configurationHTTPService.getUserActiveCategories(id).subscribe(
            response => this._sendConfiguration(response.activeCategories.slice(1)),//ne vracamo latest_articles
            error => console.log(error)
        );
    }


    public getUserConfiguration(id){
        this._configurationHTTPService.getUserConfiguration(id).subscribe(
            response => this._sendConfiguration(response),
            error => console.log(error)
        );
    }
    
    

    public getUserTags(id){
        this._configurationHTTPService.getUserTags(id).subscribe(
            response => {
                this._sendConfiguration(['tags',response.tagsPriorityList]);
            },
            error => console.log('Error:',error)
        );
    }

    private _sendConfiguration(categories){
        this._openConfiguration.next(categories);
    }

}