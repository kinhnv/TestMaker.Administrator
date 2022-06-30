import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormConfig } from './form-config';
import { FormInput } from './form-input';
import { FormRadio } from './form-radio';
import { FormTable } from './form-table';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input()
  config!: FormConfig;

  constructor() { }

  get names(): string[] {
    return this.getNames(this.config.form);
  }

  ngOnInit() {
  }

  getNames(form: FormGroup): string[] {
    if (!form || !form.controls) {
      return [];
    }
    let result: { key: string, order: number }[] = [];
    for (const key in form.controls) {
      if (Object.prototype.hasOwnProperty.call(form.controls, key)) {
        const element = form.controls[key];
        result.push({ key: key, order: (<any>element).order || 0 });
      }
    }
    result = result.sort((a, b) => a.order - b.order);
    return result.map(a => a.key);
  }

  castToFromTable(control: AbstractControl): FormTable | undefined {
    return control instanceof FormTable ? control as FormTable : undefined;
  }

  castToFromGroup(control: AbstractControl) {
    return control as FormGroup;
  }

  addFormGroup(form: FormTable | undefined): void {
    if (form)
      form.addFormGroup();
  }

  removeFromGroup(form: FormTable | undefined, index: number): void {
    if (form) {
      form.removeFormGroup(index);
    }
  }

  cloneAbstractControl<T extends AbstractControl>(control: T): T {
    let newControl: T = <any>null;

    if (control instanceof FormGroup) {
      const formGroup = new FormGroup({}, control.validator, control.asyncValidator);
      const controls = control.controls;

      Object.keys(controls).forEach(key => {
        formGroup.addControl(key, this.cloneAbstractControl(controls[key]));
      });

      newControl = formGroup as any;
    } else if (control instanceof FormArray) {
      const formArray = new FormArray([], control.validator, control.asyncValidator);

      control.controls.forEach(formControl => formArray.push(<never>this.cloneAbstractControl(formControl)))

      newControl = formArray as any;
    } else if (control instanceof FormControl) {
      if (control instanceof FormInput) {
        newControl = new FormInput({
          title: control.params.title,
          order: control.params.order,
          formState: control.value,
          validatorOrOpts: control.validator
        }) as any;
      } else if (control instanceof FormRadio) {
        newControl = new FormRadio({
          title: control.params.title,
          options: control.params.options,
          order: control.params.order,
          events: control.params.events,
          formState: control.value,
          validatorOrOpts: control.validator
        }) as any;
      }
    } else {
      throw new Error('Error: unexpected control value');
    }

    if (control.disabled) { newControl.disable({ emitEvent: false }); }

    return newControl;
  }
}
