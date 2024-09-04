import { ApplicationConfig, provideExperimentalZonelessChangeDetection, ɵZONELESS_ENABLED, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection(), provideRouter(routes)]
};
