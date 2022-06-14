import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormConfig, FormInput, TableConfig } from './shareds/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TestMaker.Administrator';

  formConfig: FormConfig = {
    id: 'home-form',
    title: 'Home',
    form: new FormGroup({
      'test': new FormInput({
        title: 'test text',
        order: 1,
        validatorOrOpts: Validators.required
      })
    }),
    buttons: [{
      title: 'button test',
      event: () =>{
        console.log('button test');
      }
    }]
  }

  tableConfig: TableConfig = {
    title: 'Table',
    url: 'http://localhost:40000/api/Admin/Tests',
    columns: [{
      property: 'name',
      text: '[name] 123456',
      title: 'Name'
    }],
    buttons: []
  }
}
