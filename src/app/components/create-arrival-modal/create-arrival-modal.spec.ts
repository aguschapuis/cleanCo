import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArrivalModal } from './create-arrival-modal';

describe('CreateArrivalModal', () => {
  let component: CreateArrivalModal;
  let fixture: ComponentFixture<CreateArrivalModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateArrivalModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateArrivalModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
