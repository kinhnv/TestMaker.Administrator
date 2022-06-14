import { AbstractControlOptions, FormControl, ValidatorFn } from '@angular/forms';
import { IFormControlParams } from '.';

export interface IFormRadioParams extends IFormControlParams {
    options: {
        value: string | number | boolean;
        title: string;
    }[];
}

export class FormRadio extends FormControl {
    constructor(
        public params: IFormRadioParams) {
        super(params.formState, params.validatorOrOpts);
    }
}
