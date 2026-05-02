import { Routes } from '@angular/router';
import { ArticlesListComponent } from './components/articles-list.component';
import { ArticleDetailComponent } from './components/article-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'articles', component: ArticlesListComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
];
