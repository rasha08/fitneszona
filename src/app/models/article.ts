export class Article{
    _id: any;
    _title: any;
    _description: any;
    _text: any;
    _category: any;
    _tags: any; 
    _comments_id: number[]; //vodi racuna o redosledu za comments_id
    _likes_id: number[];
    _dislikes_id: number[];
    _seen_times: number;
    _created_at: Date;
    _updated_at: Date;
    _image_url: any;
    _article_title_url_slug: any;
    
    
    constructor(
        id: any, title: any, description: any, text: any, category: any, tags: any,
        comments_id: any, likes_id: any, dislikes_id: any, seen_times: any, created_at: any, updated_at: any, image_url: any, article_title_url_slug: any
    ){
        this.id = id;
        this.title = title;
        this.description = description;
        this.text = text;
        this.category = category;
        this.tags = tags;
        this.comments_id = comments_id;
        this.likes_id = likes_id;
        this.dislikes_id = dislikes_id;
        this.seen_times = seen_times;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.image_url = image_url;
        this.article_title_url_slug = article_title_url_slug;
    }

    set id(id: any){
        this._id = Number(id);
    }

    set title(title: any){
        this._title = title;
    }

    set description(description: any){
        this._description = description;
    }

    set text(text: any){
        this._text = text;
    }

    set category(category: any){
        this._category = category;
    }

    set tags(tags: any){
        this._tags = tags;
    }

    set comments_id(comments_id: any){
        this._comments_id = comments_id;
    }

    set likes_id(likes_id){
        this._likes_id = likes_id;
    }

    set dislikes_id(dislikes_id){
        this._dislikes_id = dislikes_id; 
    }
    
    set seen_times(seen_times){
        this._seen_times = seen_times;
    }

    set created_at(created_at){
        this._created_at = created_at;
    }

    set updated_at(updated_at){
        this._updated_at = updated_at;
    }

    set image_url(image_url){
        this._image_url = image_url;
    }

    set article_title_url_slug(article_title_url_slug){
        this._article_title_url_slug = article_title_url_slug;
    }

    get id(){
        return this._id;
    }

    get title(){
        return this._title;
    }

    get description(){
        return this.description;
    }

    get text(){
        return this.text;
    }

    get category(){
        return this.category;
    }

    get tags(){
        return this._tags;
    }

    get comments_id(){
        return this._comments_id;
    }

    get likes_id(){
        return this._likes_id;
    }

    get dislikes_id(){
        return this._dislikes_id;
    }

    get seen_times(){
        return this._seen_times;
    }

    get created_at(){
        return this._created_at;
    }

    get updated_at(){
        return this._updated_at;
    }

    get image_url(){
        return this._image_url;
    }

    get article_title_url_slug(){
        return this._article_title_url_slug;
    }
}