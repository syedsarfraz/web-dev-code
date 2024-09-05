import { Component, NO_ERRORS_SCHEMA, OnInit } from "@angular/core";
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
} from "@nativescript/angular";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
  selector: "ns-items",
  templateUrl: "./items.component.html",
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ItemsComponent implements OnInit {
  items: Array<Item>;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }
}
