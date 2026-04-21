import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Bootstraps the root standalone component with global application config.
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
