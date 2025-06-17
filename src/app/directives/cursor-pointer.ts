import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCursorPointer]',
})
export class CursorPointer {
  constructor(private ef: ElementRef) {
    this.ef.nativeElement.style.cursor = 'pointer';
  }
}
