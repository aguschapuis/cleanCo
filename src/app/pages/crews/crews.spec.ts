import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crews } from './crews';

describe('Crews', () => {
  let component: Crews;
  let fixture: ComponentFixture<Crews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Crews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
