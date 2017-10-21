import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";


import { ArticlesHTTPService } from "./atricles-http.service";
import { ConfigurationService } from "./configuration.service";
@Injectable()

export class ArticlesCounterService{
    private _sendCategoriesToBottomHeader = new Subject();
    public sendCategoriesToBottomHeader$ = this._sendCategoriesToBottomHeader.asObservable();

    constructor(
        private _articlesHTTPService: ArticlesHTTPService,
        private _configurationService: ConfigurationService
    ){ }

    getCategories(timestring: string){
        this._configurationService.getCategories(timestring).subscribe(
            response => this.sendNumberOfNewArticlesToHeader(response),
            error => console.log(error)
        )
    }

    sendNumberOfNewArticlesToHeader(data: object){
        this._sendCategoriesToBottomHeader.next(data);
    }

    
}
