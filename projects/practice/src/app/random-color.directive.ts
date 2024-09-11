import {
  Directive,
  ElementRef,
  HostBinding,
  inject,
  Input,
  numberAttribute,
  Output,
  signal,
} from '@angular/core';

const MAX_COLOR = 16 ** 3;
const MAX_COLOR_6 = 255 ** 3;

@Directive({
  selector: '[appRandomColor]',
  standalone: true,
})
export class RandomColorDirective {
  @Input({ alias: 'appRandomColor' }) strategy: 'random' | 'smooth' | '' =
    'random';
  @Input({ transform: numberAttribute }) digits: 3 | 6 = 3;

  elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  constructor() {
    let color =
      this.digits === 3 ? generateRandomColor() : generateRandomColor6();
    this.elementRef.nativeElement.style.color = `#${color}`;

    setInterval(() => {
      if (this.strategy === 'smooth') {
        if (this.digits === 3) {
          const newColorHex = (Number(`0x${color}`) + 1) % MAX_COLOR;
          color = newColorHex.toString(16).padStart(3, '0');
        } else {
          const newColorHex = (Number(`0x${color}`) + 255) % MAX_COLOR_6;
          color = newColorHex.toString(16).padStart(6, '0');
        }
        this.elementRef.nativeElement.style.color = `#${color}`;
      } else {
        this.elementRef.nativeElement.style.color = `#${generateRandomColor()}`;
      }
    }, 10);
  }
}

const MAX_DEG = 360;

@Directive({
  selector: '[appRainbowColor]',
  standalone: true,
  host: {
    class: 'rainbow',
    '[style.color]': 'color()',
    '(click)': 'onClick($event)',
  },
})
export class RainbowColorDirective {
  @Input({ alias: 'appRainbowColor' }) strategy: 'random' | 'smooth' | '' =
    'random';
  @Input({ transform: numberAttribute }) speed = 50;

  @HostBinding('style.color')
  get colorValue() {
    return this.color();
  }

  color = signal('');

  onClick(e: Event) {
    console.log(e)
  }

  // elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  constructor() {
    let colorDeg = generateRandom(MAX_DEG);
    this.color.set(`hwb(${colorDeg}deg 0% 30%)`);
    // this.elementRef.nativeElement.style.color = `hwb(${colorDeg}deg 0% 30%)`;

    setInterval(() => {
      if (this.strategy === 'smooth') {
        colorDeg = (colorDeg + 1) % MAX_DEG;
        this.color.set(`hwb(${colorDeg}deg 0% 30%)`);
        // this.elementRef.nativeElement.style.color = `hwb(${colorDeg}deg 0% 30%)`;
      } else {
        this.color.set(`hwb(${generateRandom(MAX_DEG)}deg 0% 30%)`);
        // this.elementRef.nativeElement.style.color = `hwb(${generateRandom(
        //   MAX_DEG
        // )}deg 0% 30%)`;
      }
    }, this.speed);
  }
}

function generateRandomColor() {
  return Math.floor(Math.random() * MAX_COLOR)
    .toString(16)
    .padStart(3, '0');
}

function generateRandomColor6() {
  return Math.floor(Math.random() * MAX_COLOR_6)
    .toString(16)
    .padStart(6, '0');
}

function generateRandom(len: number) {
  return Math.floor(Math.random() * len);
}
