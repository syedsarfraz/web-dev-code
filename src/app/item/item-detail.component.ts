import { Component, NO_ERRORS_SCHEMA, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
  selector: "ns-details",
  templateUrl: "./item-detail.component.html",
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ItemDetailComponent implements OnInit {
  item: Item;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.item = this.itemService.getItem(id);
  }
}
