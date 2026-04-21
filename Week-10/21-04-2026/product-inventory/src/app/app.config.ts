import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

// Configures app-wide providers for standalone bootstrap.
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })]
};
