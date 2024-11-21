import { Routes } from '@angular/router';
import { BasicContentComponent } from './basic-content/basic-content.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TemplateBasicComponent } from './template-basic/template-basic.component';
import { TemplateCommonComponent } from './template-common/template-common.component';
import { StateManagerComponent } from './state-manager/state-manager.component';
import { StateMachineComponent } from './state-machine/state-machine.component';


export const routes: Routes = [
  { path: 'basic-content', component: BasicContentComponent },
  { path: 'template-basic', component: TemplateBasicComponent },
  { path: 'template-common', component: TemplateCommonComponent },
  { path: 'state', component: StateManagerComponent },
  { path: 'state-machine', component: StateMachineComponent },
  { path: '', redirectTo: 'basic-content', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
