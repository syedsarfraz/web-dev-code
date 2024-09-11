import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';

// @Directive({
//   selector: 'input[appModel], select[appModel]',
//   standalone: true,
// })
// export class ModelDirective {
//   elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

//   @Input()
//   set appModel(value: string) {
//     this.elementRef.nativeElement.value = value;
//   }

//   @Output() appModelChange = new EventEmitter<string>();

//   constructor() {
//     this.elementRef.nativeElement.addEventListener('input', (e) => {
//       this.appModelChange.emit((e.target as HTMLInputElement).value);
//     });
//   }
// }

@Directive({
  selector: 'input[appModel], select[appModel]',
  standalone: true,
  // host: {
  //   '[value]': 'appModel'
  // },
})
export class ModelDirective {
  @HostBinding('value')
  @Input()
  appModel = '';

  @Output() appModelChange = new EventEmitter<string>();

  @HostListener('input', ['$event'])
  onInput(e: Event & { target: HTMLInputElement | HTMLSelectElement }) {
    this.appModelChange.emit(e.target.value);
  }
}
