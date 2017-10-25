import { Component, OnInit } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { ArticlesService } from "../../../services/articles.service";
import { Article } from "../../../models/article";
@Component({
    selector: 'app-single-article',
    templateUrl: './single-article.html'
})

export class SingleArticleComponent {

    private _articleSubscription: Subscription;
    public article;
    public errorMessage;
    public liked;
    public disliked;

    constructor(
        private _articleService: ArticlesService
    ) {}

    ngOnInit(){

    }

    public subscribeToArticle(){
        this._articleSubscription = this._articleService.openArticle$.subscribe(
            article => this.article = article,
            error => this.errorMessage = error
        )
    }

    public like(){
        let dateAndTime = new Date();
        let date = dateAndTime.toLocaleDateString().replace(/\//g,'-');
        let time = dateAndTime.toTimeString().slice(0,8);
        //TODO

    }

    public dislike(){
        let dateAndTime = new Date();
        let date = dateAndTime.toLocaleDateString().replace(/\//g,'-');
        let time = dateAndTime.toTimeString().slice(0,8);
        //TODO
    }

}