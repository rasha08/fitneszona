import { Injectable } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { Subject } from "rxjs/Subject";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { ConfigurationHTTPService } from "./configuration-http.service";

@Injectable()

export class ConfigurationService {
    public BASE_URL: string = 'http://fitneszona.rs';
    public configuration: object;

    private _openConfiguration = new Subject();
    public openConfiguration$ = this._openConfiguration.asObservable();
    
    constructor(
        private _configurationHTTPService: ConfigurationHTTPService
    ){ }

    public getConfiguration(){
        this._configurationHTTPService.getConfiguration().subscribe(
            configuration => {
                this.configuration = configuration;
                this._sendNotification(true)
            },
            error => console.log(error)
        );
    }

    public getParam(param){
        return this.configuration[param];
    }
    
    private _sendNotification(value){
        this._openConfiguration.next(value);
    }

}