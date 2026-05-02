import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private articles: Article[] = [
    {
      id: 1,
      title: 'Getting Started with Angular',
      excerpt: 'Learn the basics of Angular and how to create your first component.',
      content: `Angular is a powerful framework for building web applications. In this article, we'll explore the fundamentals of Angular including components, services, and dependency injection. You'll learn how to structure your application for scalability and maintainability. We'll cover topics like template syntax, data binding, and routing. By the end of this article, you'll have a solid understanding of how Angular works and be ready to build your own applications.`,
      author: 'John Developer',
      date: new Date('2026-04-20'),
      category: 'Tutorial',
      tags: ['Angular', 'JavaScript', 'Web Development']
    },
    {
      id: 2,
      title: 'TypeScript Best Practices',
      excerpt: 'Master TypeScript with these essential best practices and patterns.',
      content: `TypeScript brings static typing to JavaScript, making your code more robust and maintainable. This comprehensive guide covers TypeScript best practices including proper use of types, interfaces, and generics. Learn how to avoid common pitfalls, write type-safe code, and leverage TypeScript's advanced features. We'll discuss strict mode, decorators, and practical patterns that real-world applications use. Follow these guidelines to write cleaner, more professional TypeScript code.`,
      author: 'Sarah Code',
      date: new Date('2026-04-18'),
      category: 'Best Practices',
      tags: ['TypeScript', 'JavaScript', 'Programming']
    },
    {
      id: 3,
      title: 'Reactive Programming with RxJS',
      excerpt: 'Dive deep into reactive programming and master RxJS observables.',
      content: `RxJS is a library for reactive programming using Observables. It makes it easier to compose asynchronous or callback-based code. In this article, we'll explore Observables, Subjects, and operators. Learn how to handle complex asynchronous flows, manage multiple data sources, and create pipelines for data transformation. We'll cover practical examples including HTTP requests, user input handling, and real-time data updates. Master RxJS to write more elegant and maintainable asynchronous code.`,
      author: 'Mike Stream',
      date: new Date('2026-04-15'),
      category: 'Advanced',
      tags: ['RxJS', 'Reactive', 'Angular']
    },
    {
      id: 4,
      title: 'Building Responsive Web Design',
      excerpt: 'Create beautiful, responsive layouts that work on any device.',
      content: `Responsive web design is essential in today's multi-device world. Learn how to build layouts that adapt seamlessly to different screen sizes. We'll cover CSS Grid, Flexbox, media queries, and mobile-first design principles. Discover techniques for creating flexible components, optimizing images, and ensuring performance across devices. This guide includes practical examples and real-world projects that demonstrate responsive design in action.`,
      author: 'Emma Design',
      date: new Date('2026-04-10'),
      category: 'Design',
      tags: ['CSS', 'Responsive', 'Web Design']
    },
    {
      id: 5,
      title: 'Testing Angular Applications',
      excerpt: 'Write comprehensive tests to ensure your Angular app is reliable.',
      content: `Testing is crucial for maintaining code quality and preventing bugs. This article covers unit testing, component testing, and integration testing for Angular applications. Learn how to use Jasmine and Karma, mock services, and test asynchronous code. We'll explore best practices for structuring tests, achieving good code coverage, and writing maintainable test suites. Discover how to use testing to catch bugs early and have confidence in your code deployments.`,
      author: 'Tom Quality',
      date: new Date('2026-04-05'),
      category: 'Testing',
      tags: ['Testing', 'Angular', 'Jasmine']
    }
  ];

  getArticles(): Observable<Article[]> {
    return of(this.articles);
  }

  getArticle(id: number): Observable<Article | undefined> {
    return of(this.articles.find(article => article.id === id));
  }

  getArticlesByCategory(category: string): Observable<Article[]> {
    return of(this.articles.filter(article => article.category === category));
  }

  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.articles.map(a => a.category))];
    return of(categories);
  }
}
