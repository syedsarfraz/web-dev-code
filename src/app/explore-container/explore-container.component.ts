import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: true,
  imports: [IonButton, RouterLink]
})
export class ExploreContainerComponent {
  @Input() name?: string = "No parent Screen";
}
