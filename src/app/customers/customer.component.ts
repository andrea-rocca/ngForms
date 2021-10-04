import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Customer } from './customer';

function ratingRange(min: number, max:number): ValidatorFn {
  return (c:AbstractControl): {[key:string]:boolean} | null => {
    
    if(c.value!=undefined && !(isNaN(c.value) || c.value<min || c.value>max)) {
      return {'range':true};
    };
    
    // return null;
    return {'range':false};
  }
}

function emailMatcher(c:AbstractControl) {

  let emailControl = c.get('email');
  let confirmControl = c.get('confirmEmail');

  if(emailControl?.pristine || confirmControl?.pristine) {
    return null;
  }

  if(emailControl?.value === confirmControl?.value) {
    return null;
  } else {
    return {'match':true}
  }
}


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
      //second array is for async validators, which are not executed if sync validators fail
      firstName: [null,[Validators.required, Validators.minLength(3)],[]], 
      lastName: [null,[Validators.required, Validators.maxLength(50)]],

      emailGroup: this.fb.group({
        email: [null,[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
        confirmEmail: [null,Validators.required]
      },{validator:emailMatcher}),

      phone: '',
      notification: 'email',
      rating: ['',ratingRange(1,5)],
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
      // funziona solo se imposto un valore per tutti i dati
/*     this.customerForm.setValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      email: 'jack@torchwood.com',
      sendCatalog: false
    }); */

      //se voglio inserire il valore di alcuni campi e non di tutti devo usare patchValue
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      emailGroup: {
        email: 'jack@torchwood.com'
      },
      sendCatalog: false
    });
  }

  setNotification(notifyVia:string): void {
    const phoneControl = this.customerForm.get('phone');
    if(notifyVia==='text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }
}
