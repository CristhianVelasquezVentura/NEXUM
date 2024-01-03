import {Directive, ElementRef, inject, OnInit} from '@angular/core';
import {fromEvent} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Directive({
  selector: 'form',
  standalone: true
})
export class FormSubmitDirective implements OnInit{
  private readonly host: ElementRef<HTMLFormElement> = inject(ElementRef);

  public submit$ = fromEvent(this.element, 'submit').pipe(shareReplay(1));

  constructor() {
  }

  ngOnInit() {
  }

  get element() {
    return this.host.nativeElement;
  }
}
