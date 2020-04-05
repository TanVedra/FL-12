import { TestBed } from '@angular/core/testing';
import { CreditCardService } from './credit-card.service';

describe('CreditCardService', () => {
  let service: CreditCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardService);
  });

  it('should create CreditCardService', async () => {
    expect(service).toBeTruthy();
  });

  it('should show "Unknown card type" message if card name is invalid', () => {
    expect(    service.testCreditCard('4111 1111 1111 1111', 'skrepa')
    ).toEqual({
      isValid: false,
      message: 'Unknown card type'
    });
  });

  it('should show "Credit card number is invalid" message if card number is invalid', () => {
    expect(    service.testCreditCard('1111 1111 1111 1111', 'visa')
    ).toEqual({
      isValid: false,
      message: 'Credit card number is invalid'
    });
  });

  it('should show warning message if card values are valid but inappropriate to each other', () => {
    expect(    service.testCreditCard('5490 9977 7109 2064', 'Maestro')
    ).toEqual({
      isValid: false,
      message: 'Credit card number is invalid'
    });
  });

  it('should show warning message if card number is dangerous', () => {
    expect(    service.testCreditCard('5490 9977 7109 2064', 'DinersClub')
    ).toEqual({
      isValid: false,
      message: 'Warning! This credit card number is associated with a scam attempt'
    });
  });

  it('should show warning message if card number have inappropriate length', () => {
    expect(    service.testCreditCard('6011 0000 0000 04', 'Discover')
    ).toEqual({
      isValid: false,
      message: 'Credit card number has an inappropriate number of digits'
    });
  });

  it('should show warning message if card number have invalid format', () => {
    expect(    service.testCreditCard('6334 0000 0000 0004 0000', 'Solo')
    ).toEqual({
      isValid: false,
      message: 'Credit card number is in invalid format'
    });
  });

  it('should show success message if card values are valid and appropriate to each other', () => {
    expect(    service.testCreditCard('6304 1000 0000 0008', 'Maestro')
    ).toEqual({
      isValid: true,
      message: 'Credit card has a valid format'
    });
  });

});
