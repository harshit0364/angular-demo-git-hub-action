import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Article } from '../models/article.model';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="articles-container">
      <div class="header">
        <h1>Blog Articles</h1>
        <p>Explore our latest articles and tutorials</p>
      </div>

      <div class="filters">
        <button 
          class="filter-btn"
          [class.active]="selectedCategory === null"
          (click)="selectedCategory = null">
          All Articles
        </button>
        <button 
          *ngFor="let category of categories"
          class="filter-btn"
          [class.active]="selectedCategory === category"
          (click)="selectedCategory = category">
          {{ category }}
        </button>
      </div>

      <div class="articles-grid">
        <article *ngFor="let article of filteredArticles" class="article-card">
          <div class="article-header">
            <h2>{{ article.title }}</h2>
            <span class="category-badge">{{ article.category }}</span>
          </div>
          <p class="article-excerpt">{{ article.excerpt }}</p>
          <div class="article-meta">
            <span class="author">By {{ article.author }}</span>
            <span class="date">{{ article.date | date: 'MMM d, y' }}</span>
          </div>
          <div class="article-tags">
            <span *ngFor="let tag of article.tags" class="tag">{{ tag }}</span>
          </div>
          <a [routerLink]="['/article', article.id]" class="read-more">
            Read More →
          </a>
        </article>
      </div>

      <div *ngIf="filteredArticles.length === 0" class="no-articles">
        <p>No articles found in this category.</p>
      </div>
    </div>
  `,
  styles: [`
    .articles-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .header p {
      font-size: 1.1rem;
      color: #666;
    }

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .filter-btn {
      padding: 0.5rem 1rem;
      border: 2px solid #ddd;
      background: white;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.95rem;
    }

    .filter-btn:hover {
      border-color: #667eea;
      color: #667eea;
    }

    .filter-btn.active {
      background: #667eea;
      border-color: #667eea;
      color: white;
    }

    .articles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .article-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .article-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .article-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .article-header h2 {
      font-size: 1.3rem;
      margin: 0;
      color: #333;
      flex: 1;
    }

    .category-badge {
      background: #f0f0f0;
      color: #666;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .article-excerpt {
      color: #666;
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 0 0 1rem 0;
      flex-grow: 1;
    }

    .article-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.85rem;
      color: #999;
      margin-bottom: 1rem;
    }

    .article-tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }

    .tag {
      background: #e8e8f0;
      color: #667eea;
      padding: 0.25rem 0.6rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }

    .read-more {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
      align-self: flex-start;
    }

    .read-more:hover {
      color: #764ba2;
    }

    .no-articles {
      text-align: center;
      padding: 2rem;
      color: #999;
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .articles-container {
        padding: 1rem;
      }

      .header h1 {
        font-size: 1.8rem;
      }

      .articles-grid {
        grid-template-columns: 1fr;
      }

      .filters {
        justify-content: flex-start;
        overflow-x: auto;
      }
    }
  `]
})
export class ArticlesListComponent implements OnInit {
  articles: Article[] = [];
  categories: string[] = [];
  selectedCategory: string | null = null;

  get filteredArticles(): Article[] {
    if (!this.selectedCategory) {
      return this.articles;
    }
    return this.articles.filter(a => a.category === this.selectedCategory);
  }

  constructor(private articlesService: ArticlesService) {}

  ngOnInit() {
    this.articlesService.getArticles().subscribe(articles => {
      this.articles = articles;
    });

    this.articlesService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
