import { AbstractControlOptions, FormControl, ValidatorFn } from '@angular/forms';
import { IFormControlParams } from './form-config';

export interface IFormTextAreaParams extends IFormControlParams {
}

export class FormTextArea extends FormControl {
    /**
     *
     */
    constructor(public params: IFormTextAreaParams) {
        super(params.formState, params.validatorOrOpts);
    }
}
