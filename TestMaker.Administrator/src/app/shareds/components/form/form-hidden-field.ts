import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from "@angular/forms";

export class FormHiddenField extends FormControl {
    /**
     *
     */
    constructor(
        formState?: any,
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null) {
        super(formState, validatorOrOpts);
    }
}
