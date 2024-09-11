import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-template-basic',
  standalone: true,
  imports: [],
  templateUrl: './template-basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateBasicComponent {
  showContent = false;
  userType: 'guest' | 'member' | 'admin' = 'guest';

  tabs = [
    { name: 'Tab 1', content: 'Tab 1 Content', type: 'admin' },
    { name: 'Tab 2', content: 'Tab 2 Content', type: 'guest' },
    { name: 'Tab 3', content: 'Tab 3 Content', type: 'member' },
  ];

  veggies = [
    'Coriander',
    'Mint',
    'Carrot',
    'Potato',
    'Brocoli',
    'Cabbage',
    'Spinach',
    'Grout',
    'Bitter Grout',
  ];

  selectedTab: (typeof this.tabs)[number] | null = null;

  toggleSecret() {
    this.showContent = !this.showContent;
  }

  promote() {
    this.userType = 'admin';
  }

  login() {
    this.userType = 'member';
  }
  logout() {
    this.userType = 'guest';
  }

  selectTab(tab: (typeof this.tabs)[number]) {
    this.selectedTab = tab;
  }

  debug<T>(value: T) {
    console.log(value);
    return value;
  }

  removeVeg(i: number) {
    this.veggies.splice(i, 1);
  }
}
