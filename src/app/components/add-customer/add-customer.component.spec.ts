import { createComponent } from '@angular/compiler/src/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatStepper } from '@angular/material/stepper';
import { of } from 'rxjs';

import { ControlService } from 'src/app/services/control.service';
import { AddCustomerComponent } from './add-customer.component';

describe('AddCustomerComponent', () => {
  let component: AddCustomerComponent;
  let fixture: ComponentFixture<AddCustomerComponent>;
  let controlService: ControlService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomerComponent ],
      providers:[{
          provide:ControlService, useValue:{ getControls: () => of([{
           name: 'salutation',
            entityName: 'Salutation' ,
            isRequired:true,
            controlType:2,Module:1,
            dropdownValues:['value1','value2']}]) }
        }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerComponent);
    component = fixture.componentInstance;
    controlService = TestBed.get(ControlService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('populateControls should be called',()=>{
    spyOn(controlService,'getControls').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(controlService.getControls).toHaveBeenCalled();
  })

  it('populateControls should return controls',()=>{
    spyOn(controlService,'getControls').and.callThrough();
    component.ngOnInit();

    fixture.detectChanges();

    expect(component.controls).toEqual([{ name: 'salutation',
    entityName: 'Salutation' ,
    isRequired:true,
    controlType:2,Module:1,
    dropdownValues:['value1','value2']}]);
  })

  // it('goForward() should go forward in stepper.',()=>{
  //   let MatFixture : ComponentFixture<MatStepper>;
  //   MatFixture = createComponent(MatStepper);

  //   component.goForward(stepper);
  //   fixture.detectChanges();
  //   expect(stepper.selectedIndex).toEqual(1);
  // })

})
