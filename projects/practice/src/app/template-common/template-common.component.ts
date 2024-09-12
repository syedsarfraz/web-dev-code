import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  JsonPipe,
  KeyValuePipe,
  PercentPipe,
  SlicePipe,
} from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-template-common',
  standalone: true,
  imports: [
    DatePipe,
    JsonPipe,
    SlicePipe,
    CurrencyPipe,
    DecimalPipe,
    KeyValuePipe,
    PercentPipe
  ],
  templateUrl: './template-common.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateCommonComponent {
  date = new Date();
  dateString = new Date().toJSON();
  dateNumber = Date.now();

  arr = ['Apple', 'Banana', 'Mango'];
  obj = { key: 'value', key2: null, key3: undefined, key4: 4, key5: this.arr };

  number = 99;
  price = 4.99;
  priceLong = 9.1048;
}
