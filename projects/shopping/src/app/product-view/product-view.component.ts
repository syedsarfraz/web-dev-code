import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [],
  templateUrl: './product-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductViewComponent {
  route = inject(ActivatedRoute);

  id = this.route.snapshot.paramMap.get('id')!

}
