import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';

import { Master1Component } from './master1.component';

describe('Master1Component', () => {
  let component: Master1Component;
  let fixture: ComponentFixture<Master1Component>;
  let toastrService: ToastrService;
  let customerService: CustomerService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Master1Component ],
      imports:[ReactiveFormsModule, ToastrModule.forRoot({
        preventDuplicates: true
      }),HttpClientModule],
      providers:[CustomerService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Master1Component);
    component = fixture.componentInstance;
    toastrService = TestBed.get(ToastrService);
    customerService = TestBed.get(CustomerService);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should create dynamic form controls ngOnChange()',()=>{
    //arrange
    component.master1Controls = [{ entityName:'Salutation', module:'Master1' },{entityName:'Ta', module:'Master1'}]

    //act
    component.ngOnChanges();

    //assert
    expect(component.master1Form.get('Salutation')).toBeTruthy();
    expect(component.master1Form.get('Ta')).toBeTruthy();
  })


  it('should call customer service on clicking submit button',()=>{
    //arrange
    const compiled = fixture.debugElement.nativeElement;  
    spyOn(customerService,'saveCustomerData').and.callThrough();    
    spyOn(component,'onSubmit');
    
    //act
    fixture.debugElement.query(By.css('#submitBtn'))
    .triggerEventHandler('click',null);
    fixture.detectChanges();

    //assert
    fixture.whenStable().then(() => {
        expect(component.onSubmit).toHaveBeenCalled();
        expect(customerService.saveCustomerData).toHaveBeenCalled();
      });
  })

});
