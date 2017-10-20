import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";


import { ArticlesHTTPService } from "./atricles-http.service";
import { ConfigurationService } from "./configuration.service";
@Injectable()

export class ArticlesCounterService{
    private _bottomHeader = new Subject();
    public bottomHeader$ = this._bottomHeader.asObservable();

    constructor(
        private _articlesHTTPService: ArticlesHTTPService,
        private _configurationService: ConfigurationService
    ){ }

    getNewAritlcesForEveryCategory(timestring: string){
        this._configurationService.getNewArticleForEveryCategory(timestring).subscribe(
            response => this.sendNumberOfNewArticlesToHeader(response),
            error => console.log(error)
        )
    }

    sendNumberOfNewArticlesToHeader(data: object){
        this._bottomHeader.next(data);
    }

    
}
