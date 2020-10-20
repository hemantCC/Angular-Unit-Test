import {
  Component,
  OnInit,
  Input,
  OnChanges,
  DoCheck,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-master2',
  templateUrl: './master2.component.html',
  styleUrls: ['./master2.component.css']
})

// handles master 2 realted functionalities
export class Master2Component implements OnChanges {

  //#region variables

  @Input() master2Controls: any[];
  master2Form: FormGroup;

  //#endregion variables

  constructor(
    private formBuilder: FormBuilder,
    private _customerService: CustomerService,
    private toastr: ToastrService
  ) {
    this.master2Form = this.formBuilder.group({});
  }


  //#region methods

// creates controls based on dynamic values
  ngOnChanges() {
    this.master2Controls.forEach(control => {
      if (control.module === 'Master2')
        this.master2Form.addControl(control.entityName, new FormControl(''));
    });
  }

  // handles submit
  onSubmit() {
    this._customerService.saveCustomerData(this.master2Form.value);
    this.toastr.success('Your Customer data has been saved!', 'Sucessful');
  }

  //#endregion methods

}
