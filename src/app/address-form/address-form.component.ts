import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
})

/// T E S T  form
export class AddressFormComponent implements OnInit {
  testForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.testForm = this.fb.group({
      ///
      ///
      //
      ///
      list: this.fb.array([]),
    });
  }

  get list() {
    return this.testForm.get('list') as FormArray;
  }
  get addressControls() {
    return this.list.controls as any;
  }

  addAddress() {
    const address = this.fb.group({
      district: [
        '',
        [Validators.required, Validators.pattern(/(\d*[A-Za-z]+\d*)+/)],
      ],
      street: [
        '',
        [Validators.required, Validators.pattern(/(\d*[A-Za-z]+\d*)+/)],
      ],
      country: ['', [Validators.required, Validators.pattern(/[A-Za-z]+/)]],
      city: ['', [Validators.required, Validators.pattern(/[A-Za-z]+/)]],
    });

    this.list.push(address);



    // for (let x of this.list.controls) {
    //   console.log(x.get('city'));
    // }
    // console.log('------');
    // console.log(this.list.controls[0].get('district')?.errors);
  }

  delete(i: number) {
    this.list.removeAt(i);
  }

  ngOnInit(): void {}
}
