import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  importProvidersFrom
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgModule } from '@angular/core';
import { RouterModule, } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    // importProvidersFrom(StoreModule.forRoot({ count: counterReducer }))
    // provideStore(),
    // provideState({ name: 'count', reducer: counterReducer })
  ],
};
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

