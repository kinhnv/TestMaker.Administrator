import { AbstractControlOptions, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

export interface FormConfigButton {
    title: string;
    link?: {
        url: string;
        queryParams?: any;
    }
    event?: ($event: any) => void;
}

export interface FormConfig {
    id: string;
    title: string;
    buttons: FormConfigButton[];
    form: FormGroup;
}

export interface IFormControlParams {
    title: string;
    order: number;
    events?: { [key: string]: ($event: any, row?: number) => void };
    formState?: any;
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
}
