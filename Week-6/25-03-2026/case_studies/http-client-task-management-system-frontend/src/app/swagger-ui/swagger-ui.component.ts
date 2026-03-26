import { Component, OnInit } from '@angular/core';

declare var SwaggerUIBundle: any;

@Component({
  selector: 'app-swagger-ui',
  standalone: true,
  template: `
    <div class="swagger-container">
      <div id="swagger-ui"></div>
    </div>
  `,
  styles: [`
    .swagger-container {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class SwaggerUiComponent implements OnInit {
  ngOnInit() {
    this.loadSwaggerUI();
  }

  private loadSwaggerUI() {
    const ui = SwaggerUIBundle({
      url: '/openapi.json',
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ],
      layout: 'BaseLayout',
      deepLinking: true,
      requestInterceptor: (request: any) => {
        request.headers['X-CSRF-TOKEN'] = this.getCSRFToken();
        return request;
      }
    });
  }

  private getCSRFToken(): string {
    // For demo purposes, return empty string
    // In production, retrieve actual CSRF token
    return '';
  }
}
