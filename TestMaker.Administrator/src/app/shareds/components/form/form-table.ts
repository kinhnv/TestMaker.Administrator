import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { IFormControlParams } from './form-config';
import { FormInput } from './form-input';
import { FormRadio } from './form-radio';

export interface IFormTableParams extends IFormControlParams {
    title: string;
    columns: { [key: string]: FormControl };
}

export class FormTable extends FormArray {
    public title: string = '';
    constructor(public params: IFormTableParams) {
        super([], params.validatorOrOpts);
        if (params.formState) {
            params.formState.forEach((row: any) => {
                this.addFormGroup();
            });
            this.setValue(params.formState);
        }
    }

    addFormGroup(): void {
        const form = this;
        const formGroup = new FormGroup({});
        for (const key in form.params.columns) {
            if (Object.prototype.hasOwnProperty.call(form.params.columns, key)) {
                const formControl = this.cloneAbstractControl(form.params.columns[key]);
                formGroup.addControl(key, this.cloneAbstractControl(formControl));
            }
        }
        form.push(formGroup);
    }

    private cloneAbstractControl<C extends AbstractControl>(control: C): C {
        let newControl: C = <any>null;

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
                // tslint:disable-next-line: max-line-length
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
