import { Injectable } from '@nestjs/common';
import { add } from '@parky/sample-lib';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! ' + add(2374, 34);
  }
}
