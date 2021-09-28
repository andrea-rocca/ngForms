import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormGroup, FormControl } from '@angular/forms';

import { FormBuilder } from '@angular/forms';

import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
    
  customerForm: FormGroup;

  customer = new Customer();

  constructor(private fb:FormBuilder) {
/*     this.customerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true)
    }); */

    this.customerForm = this.fb.group({
      firstName: [null],
      lastName: null,
      email: null,
      sendCatalog: {value: true, disabled: false}
    });
  }

  ngOnInit(): void {
  }

  save(): void {
/*     console.log(customerForm.form);
    console.log('Saved: ' + JSON.stringify(customerForm.value)); */
  }

  populateData() {
/* 
    this.customerForm.setValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      email: 'jack@torchwood.com',
      sendCatalog: false
    }); */

    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      sendCatalog: false
    });

  }
}
