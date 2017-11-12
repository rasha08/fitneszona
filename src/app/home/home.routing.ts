import { Routes } from '@angular/router';

import { AllArticlesComponent } from './components/all-articles/all-articles.component';
import { CategoryComponent } from './components/category/category.component';
import { HomeIndexComponent } from './components/index/home-index.component';
import { SingleArticleComponent } from './components/single-article/single-article.component';
import { SpecificCategoriesComponent } from './components/specific-categories/specific-categories.component';

import { CategoryResolver } from './resolvers/category.resolver';
import { SpecificCategoryResolver } from './resolvers/specific-category.resolver';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeIndexComponent
  },
  {
    path: 'tekstovi/svi-tekstovi',
    component: AllArticlesComponent
  },
  {
    path: 'tekstovi/najcitaniji-tekstovi',
    component: SpecificCategoriesComponent,
    data: { type: 'top' },
    resolve: {
      category: SpecificCategoryResolver
    }
  },
  {
    path: 'tekstovi/najnoviji-tekstovi',
    component: SpecificCategoriesComponent,
    data: { type: 'latest' },
    resolve: {
      category: SpecificCategoryResolver
    }
  },
  {
    path: 'tekstovi/:category',
    component: CategoryComponent,
    resolve: {
      category: CategoryResolver
    }
  },
  {
    path: 'tekstovi/:category/:text',
    component: SingleArticleComponent
  },
  { path: '**', component: HomeIndexComponent }
];
