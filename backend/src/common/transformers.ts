// libraries
import { ValueTransformer } from 'typeorm';

// constants
import { MONEY_DECIMAL_SCALE } from './constants';

// content

export const moneyTransformer: ValueTransformer = {
  to(value: number = 0): string {
    return value.toFixed(MONEY_DECIMAL_SCALE);
  },

  from(value: string): number {
    return parseFloat(value);
  },
};
