import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from "@angular/forms";
import { IFormControlParams } from ".";

export class SelectOption {
    value!: string | number;
    title!: string;
}

export interface IFormSelectParams extends IFormControlParams {
    options: SelectOption[];
}

export class FormSelect extends FormControl {
    constructor(public params: IFormSelectParams) {
        super(params.formState, params.validatorOrOpts);
    }
}
