import { FormControl } from '@angular/forms';
import { IFormControlParams } from './form-config';

export interface IFormFileParams extends IFormControlParams {
}

export class FormFile extends FormControl {
    constructor( public params: IFormFileParams) {
        super(params.formState, params.validatorOrOpts);
    }
}
