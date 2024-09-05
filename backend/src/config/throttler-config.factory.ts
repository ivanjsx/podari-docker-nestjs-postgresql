import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ThrottlerOptionsFactory,
  ThrottlerModuleOptions,
} from '@nestjs/throttler';

@Injectable()
export class ThrottlerConfigFactory implements ThrottlerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createThrottlerOptions(): ThrottlerModuleOptions {
    return {
      throttlers: [
        {
          name: 'global',
          ttl: this.configService.get<number>('throttler.ttl'),
          limit: this.configService.get<number>('throttler.limit'),
        },
      ],
    };
  }
}
