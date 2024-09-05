import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
} from "@nativescript/angular";

@Component({
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  templateUrl: "./order-complete.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCompleteComponent {
  route = inject(ActivatedRoute)

  id = this.route.snapshot.queryParamMap.get('orderId')
}
