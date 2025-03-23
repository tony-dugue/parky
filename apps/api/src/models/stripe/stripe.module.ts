import { Module } from '@nestjs/common'
import { BookingsService } from '../bookings/graphql/bookings.service'
import StripeService from './stripe.service'
import { StripeController } from './stripe.controller'
import { StripeMockService } from './stripe-mock.service'

@Module({
  controllers: [StripeController],
  providers: [StripeService, StripeMockService, BookingsService],
})
export class StripeModule {}
