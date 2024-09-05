import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  NativeScriptModule,
  NativeScriptRouterModule,
} from "@nativescript/angular";

import { AppComponent } from "./app.component";
import { routes } from "./app.routes";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, NativeScriptRouterModule.forRoot(routes)],
  declarations: [AppComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
