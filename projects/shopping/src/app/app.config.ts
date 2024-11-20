import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  importProvidersFrom
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    // importProvidersFrom(StoreModule.forRoot({ count: counterReducer }))
    // provideStore(),
    // provideState({ name: 'count', reducer: counterReducer })
  ],
};
