import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestapiService } from '../restapi.service';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-try-api',
  templateUrl: './try-api.component.html',
  styleUrls: ['./try-api.component.css']
})
export class TryApiComponent implements OnInit {

  fieldForm: FormGroup;
  newField_form_array: FormArray;
  validation_form_array: FormArray;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public data$: Observable<any>;
  types = ['input', 'date', 'select', 'checkbox', 'radiobutton'];

  public fields: FieldConfig[] = [
    {
      type: "input",
      label: "Username",
      inputType: "text",
      name: "name",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
        }
      ]
    },
    {
      type: "input",
      label: "Email Address",
      inputType: "email",
      name: "email",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Email Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          ),
          message: "Invalid email"
        }
      ]
    },
    {
      type: "input",
      label: "Password",
      inputType: "password",
      name: "password",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Password Required"
        }
      ]
    },
    {
      type: "radiobutton",
      label: "Gender",
      name: "gender",
      options: ["Male", "Female"],
    },
    {
      type: "date",
      label: "DOB",
      name: "dob",
      min_max_validation: true,
      min_max_date: [new Date(2018, 11, 20), new Date()],
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Date of Birth Required"
        }
      ]
    },
    {
      type: "select",
      label: "Country",
      name: "country",
      options: ["India", "UAE", "UK", "US"],
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Country is required"
        }
      ]
    },
    {
      type: "checkbox",
      label: "Accept Terms",
      name: "term",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Accept our terms"
        }
      ]
    }
  ];

  constructor(private _api: RestapiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.fieldForm = this.formBuilder.group({
      editorName: ['', Validators.required],
      editorEmail: ['', Validators.required],
      newField_form_array: this.formBuilder.array([])
    });
    this.data$ = this._api.getMockDataAPI();
  }

  add(event: MatChipInputEvent): void {
    // const input = event.input;
    // const value = event.value;

    // // Add our fruit
    // if ((value || '').trim()) {
    //   // this.fruits.push({name: value.trim()});
    // }

    // // Reset the input value
    // if (input) {
    //   input.value = '';
    // }
  }

  remove(item): void {
    // const index = this.fruits.indexOf(item);

    // if (index >= 0) {
    //   this.fruits.splice(index, 1);
    // }
  }

  createItem() {
    const field = this.formBuilder.group({
      type: ['', Validators.required],
      lable: [''],
      name: [''],
      inputType: [''],
      options: [''],
      min_max_validation: [''],
      min_max_date: [''],
      collections: [''],
      validation_form_array: this.formBuilder.array([])
    });
    this.newFieldForm.push(field);
  }

  createValidationItem(index) {
    const validator =  this.formBuilder.group({
      name: ['', Validators.required],
      validator: ['', Validators.required],
      message: ['', Validators.required]
    });
    console.log('GET this.newFieldForm : ', this.newFieldForm);
    console.log('GET this.validatorForm : ',<FormGroup>(this.newFieldForm.controls[index]));
    // <FormArray>(<FormGroup>(this.newFieldForm.controls[index]).get('validation_form_array')).controls
  }

  get newFieldForm() {
    return this.fieldForm.get('newField_form_array') as FormArray
  }

  get validatorForm() {
    return this.newFieldForm.get('validation_form_array') as FormArray
  }

  submitForm() {
    console.log('FORM VALUE : ', this.fieldForm.value);
  }

}

export interface FieldConfig {
  type: 'input' | 'date' | 'select' | 'checkbox' | 'radiobutton';
  label?: string;
  name?: string;
  inputType?: string;
  options?: string[];
  min_max_validation?: boolean;
  min_max_date?: [Date, Date];
  collections?: any;
  value?: any;
  validations?: Validator[];
}
export interface Validator {
  name: string;
  validator: any;
  message: string;
}