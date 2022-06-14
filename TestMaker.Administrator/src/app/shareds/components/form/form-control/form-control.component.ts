import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { IFormControlParams } from '../form-config';
import { FormFile } from '../form-file';
import { FormHiddenField } from '../form-hidden-field';
import { FormInput } from '../form-input';
import { FormRadio } from '../form-radio';
import { FormSelect } from '../form-select';
import { FormTextArea } from '../form-text-area';

@Component({
    selector: 'app-form-control',
    templateUrl: './form-control.component.html',
    styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {

    @Input()
    form!: FormGroup;

    @Input()
    name!: string;

    @Input()
    index: number = -1;

    @Input()
    get isFull(): boolean {
        return this.index >= 0;
    }

    constructor() { }

    ngOnInit() {
    }

    castToFormInput(formControl: AbstractControl) {
        if (formControl instanceof FormInput)
            return formControl as FormInput;
        return undefined;
    }

    castToParamsObject(formControl: AbstractControl) :{
        params: IFormControlParams
    }{
        return <any>formControl;
    }

    castToFormTextArea(formControl: AbstractControl) {
        if (formControl instanceof FormTextArea)
            return formControl as FormTextArea;
        return undefined;
    }

    castToFormHiddenField(formControl: AbstractControl) {
        if (formControl instanceof FormHiddenField)
            return formControl as FormHiddenField;
        return undefined;
    }

    castToFormSelect(formControl: AbstractControl) {
        if (formControl instanceof FormSelect)
            return formControl as FormSelect;
        return undefined;
    }

    castToFormRadio(formControl: AbstractControl) {
        if (formControl instanceof FormRadio)
            return formControl as FormRadio;
        return undefined;
    }
}
