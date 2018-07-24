import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[minValue]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValueValidatorDirective, multi: true}]
})
export class MinValueValidatorDirective implements Validator {
  @Input()
  minValue: number;

  constructor() { }
  validate(c: FormControl): {[key: string]: any} {
      const v = +c.value;
      return ( v < this.minValue) ? {'minValue': true} : null;
  }
}
