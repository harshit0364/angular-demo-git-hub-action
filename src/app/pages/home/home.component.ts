import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  features = [
    {
      title: '🏗️ Angular Standalone',
      description: 'Built with modern Angular standalone components',
    },
    {
      title: '📦 TypeScript',
      description: 'Type-safe development with TypeScript 5.4+',
    },
    {
      title: '🚀 GitHub Actions',
      description: 'Automated CI/CD pipelines for dev and stage',
    },
    {
      title: '☁️ Azure Static Web Apps',
      description: 'Scalable hosting on Azure cloud infrastructure',
    },
    {
      title: '🔄 Multi-Environment',
      description: 'Separate dev and stage deployments with automatic builds',
    },
    {
      title: '📊 Responsive Design',
      description: 'Mobile-friendly interface with modern styling',
    },
  ];

  deploymentInfo = {
    environment: this.getEnvironment(),
    timestamp: new Date(),
    apiVersion: 'v1',
  };

  private getEnvironment(): string {
    const hostname = window.location.hostname;
    if (hostname.includes('stage')) {
      return 'Stage Environment';
    } else if (hostname.includes('dev')) {
      return 'Dev Environment';
    }
    return 'Production Environment';
  }
   getCurrentHost(): string {
    return window.location.host;
  }
}
