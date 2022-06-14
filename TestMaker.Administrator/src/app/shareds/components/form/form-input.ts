import { FormControl } from '@angular/forms';
import { IFormControlParams } from './form-config';

export interface IFormInputParams extends IFormControlParams {
}

export class FormInput extends FormControl {
    constructor(public params: IFormInputParams) {
        super(params.formState, params.validatorOrOpts);
    }
}
