import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-complete',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './order-complete.component.html'
})
export class OrderCompleteComponent {

  route = inject(ActivatedRoute)

  id = this.route.snapshot.queryParamMap.get('orderId')

}
