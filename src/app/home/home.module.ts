import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LeftSidebarModule } from '../shared/modules/left-sidebar/left-sidebar.module';

import { HomeComponent } from './home.component';
import { AllArticlesComponent } from './components/all-articles/all-articles.component';
import { CategoryComponent } from './components/category/category.component';
import { HomeIndexComponent } from './components/index/home-index.component';
import { SingleArticleComponent } from './components/single-article/single-article.component';
import { SpecificCategoriesComponent } from './components/specific-categories/specific-categories.component';

/* RESOLVERS */
import { CategoryResolver } from './resolvers/category.resolver';
import { SpecificCategoryResolver } from './resolvers/specific-category.resolver';

@NgModule({
  imports: [CommonModule, RouterModule, LeftSidebarModule],
  declarations: [
    HomeComponent,
    AllArticlesComponent,
    CategoryComponent,
    SpecificCategoriesComponent,
    SingleArticleComponent,
    HomeIndexComponent
  ],
  exports: [HomeComponent],
  providers: [CategoryResolver, SpecificCategoryResolver]
})
export class HomeModule {}
