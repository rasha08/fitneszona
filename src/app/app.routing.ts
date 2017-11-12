import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { homeRoutes } from './home/home.routing';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [...homeRoutes]
  },
  { path: '**', component: HomeComponent }
];
