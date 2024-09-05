import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

@Component({
  selector: "ns-products",
  standalone: true,
  imports: [NativeScriptCommonModule],
  templateUrl: "./products.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {}
