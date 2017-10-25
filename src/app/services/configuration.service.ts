import { Injectable } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { Subject } from "rxjs/Subject";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { ConfigurationHTTPService } from "./configuration-http.service";

@Injectable()

export class ConfigurationService {
    public BASE_URL: string = 'http://fitneszona.rs';

    private _openCategories = new Subject();
    public openCategories$ = this._openCategories.asObservable();
    
    constructor(
        private _configurationHTTPService: ConfigurationHTTPService
    ){ }

    public getActiveCategories(){
        this._configurationHTTPService.getActiveCategories().subscribe(
            response => {this._sendActiveCategoriesObjectToHeader(response.activeCategories);console.log(response.activeCategories)},
            error => console.log(error)
        )
    }


    public getUserConfiguration(id){
        this._configurationHTTPService.getUserConfiguration(id).subscribe(
            response => this._sendActiveCategoriesObjectToHeader(response),
            error => console.log(error)
        )
        
    }

    private _sendActiveCategoriesObjectToHeader(categories){
        this._openCategories.next(categories)
    }

}