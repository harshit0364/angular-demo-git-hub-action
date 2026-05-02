import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  environment = this.getEnvironment();

  private getEnvironment(): string {
    const hostname = window.location.hostname;
    if (hostname.includes('stage')) {
      return 'STAGE';
    } else if (hostname.includes('dev')) {
      return 'DEV';
    }
    return 'PRODUCTION';
  }
}
