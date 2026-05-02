import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Article } from '../models/article.model';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="article-detail-container">
      <div *ngIf="article" class="article-content">
        <button routerLink="/articles" class="back-button">← Back to Articles</button>

        <article class="article">
          <header class="article-header">
            <h1>{{ article.title }}</h1>
            <div class="article-meta">
              <span class="category">{{ article.category }}</span>
              <span class="author">By {{ article.author }}</span>
              <span class="date">{{ article.date | date: 'MMMM d, y' }}</span>
            </div>
          </header>

          <div class="article-body">
            {{ article.content }}
          </div>

          <footer class="article-footer">
            <div class="tags">
              <span class="tag-label">Tags:</span>
              <a *ngFor="let tag of article.tags" href="#" class="tag">{{ tag }}</a>
            </div>
          </footer>
        </article>

        <div class="navigation">
          <a *ngIf="previousArticle" [routerLink]="['/article', previousArticle.id]" class="nav-link prev">
            ← {{ previousArticle.title }}
          </a>
          <a *ngIf="nextArticle" [routerLink]="['/article', nextArticle.id]" class="nav-link next">
            {{ nextArticle.title }} →
          </a>
        </div>
      </div>

      <div *ngIf="!article && !loading" class="not-found">
        <h2>Article Not Found</h2>
        <p>Sorry, the article you're looking for doesn't exist.</p>
        <a routerLink="/articles" class="back-link">Back to Articles</a>
      </div>

      <div *ngIf="loading" class="loading">
        <p>Loading article...</p>
      </div>
    </div>
  `,
  styles: [`
    .article-detail-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }

    .back-button {
      background: none;
      border: none;
      color: #667eea;
      font-size: 1rem;
      cursor: pointer;
      margin-bottom: 2rem;
      transition: color 0.3s ease;
    }

    .back-button:hover {
      color: #764ba2;
    }

    .article {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .article-header {
      margin-bottom: 2rem;
      border-bottom: 2px solid #f0f0f0;
      padding-bottom: 1.5rem;
    }

    .article-header h1 {
      font-size: 2.2rem;
      margin: 0 0 1rem 0;
      color: #333;
      line-height: 1.3;
    }

    .article-meta {
      display: flex;
      gap: 1.5rem;
      font-size: 0.95rem;
      color: #666;
      flex-wrap: wrap;
    }

    .category {
      background: #667eea;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
    }

    .author::before {
      content: '✓ ';
      color: #667eea;
    }

    .date::before {
      content: '📅 ';
    }

    .article-body {
      font-size: 1.05rem;
      line-height: 1.8;
      color: #444;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    .article-footer {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 2px solid #f0f0f0;
    }

    .tags {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      align-items: center;
    }

    .tag-label {
      font-weight: 600;
      color: #333;
    }

    .tag {
      background: #f0f0f0;
      color: #667eea;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      text-decoration: none;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .tag:hover {
      background: #667eea;
      color: white;
    }

    .navigation {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 2rem;
    }

    .nav-link {
      padding: 1rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      text-decoration: none;
      color: #333;
      transition: all 0.3s ease;
      word-break: break-word;
    }

    .nav-link:hover {
      border-color: #667eea;
      color: #667eea;
      background: #f8f9ff;
    }

    .nav-link.prev {
      grid-column: 1;
    }

    .nav-link.next {
      grid-column: 2;
      text-align: right;
    }

    .not-found {
      text-align: center;
      padding: 3rem 1rem;
    }

    .not-found h2 {
      font-size: 1.8rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .not-found p {
      color: #666;
      margin-bottom: 1.5rem;
    }

    .back-link {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      transition: background 0.3s ease;
    }

    .back-link:hover {
      background: #764ba2;
    }

    .loading {
      text-align: center;
      padding: 3rem;
      color: #666;
    }

    @media (max-width: 768px) {
      .article-detail-container {
        padding: 1rem;
      }

      .article {
        padding: 1.5rem;
      }

      .article-header h1 {
        font-size: 1.6rem;
      }

      .article-meta {
        flex-direction: column;
        gap: 0.5rem;
      }

      .article-body {
        font-size: 0.95rem;
      }

      .navigation {
        grid-template-columns: 1fr;
      }

      .nav-link.next {
        text-align: left;
      }
    }
  `]
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;
  previousArticle: Article | undefined;
  nextArticle: Article | undefined;
  loading = true;
  private allArticles: Article[] = [];

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService
  ) {}

  ngOnInit() {
    this.articlesService.getArticles().subscribe(articles => {
      this.allArticles = articles;
      this.loadArticle();
    });
  }

  private loadArticle() {
    this.route.params.subscribe(params => {
      const id = parseInt(params['id'], 10);
      this.articlesService.getArticle(id).subscribe(article => {
        this.article = article;
        this.updateNavigationArticles(id);
        this.loading = false;
      });
    });
  }

  private updateNavigationArticles(currentId: number) {
    const currentIndex = this.allArticles.findIndex(a => a.id === currentId);
    this.previousArticle = currentIndex > 0 ? this.allArticles[currentIndex - 1] : undefined;
    this.nextArticle = currentIndex < this.allArticles.length - 1 ? this.allArticles[currentIndex + 1] : undefined;
  }
}
