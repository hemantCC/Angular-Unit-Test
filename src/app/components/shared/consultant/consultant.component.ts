import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})

// handles consultant realted functionalities
export class ConsultantComponent implements OnChanges, OnDestroy {

  //#region variables

  @Input() master4Controls: any[];      // gets controls from parent 
  master4Form: FormGroup;               // formGroup object
  subscription: Subscription;           // subscription for form submition

  //#endregion variables
  
  constructor(
    private formBuilder: FormBuilder,
    private _customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.master4Form = this.formBuilder.group({});
  }

  //#region methods

  // initializes the form after getting input
  ngOnChanges() {
    this.master4Controls.forEach(control => {
      if (control.module === 'Consultant')
        this.master4Form.addControl(control.entityName, new FormControl(''));
    });
  }

  // handles submit
  async onSubmit() {
    this.subscription = this._customerService
      .postCustomer(this.master4Form.value)
      .subscribe(
        (res: Response) => {
          console.log(res);
          this.toastr.success(
            'Your Customer data has been saved!',
            'Sucessful'
          );
          localStorage.removeItem('customerData');
          this.router.navigateByUrl('/');
        },
        err => {
          console.log(err);
          this.toastr.error('Could not save data!', 'Failed');
        }
      );
  }

  // handles unsubscribe
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  //#endregion methods
}
