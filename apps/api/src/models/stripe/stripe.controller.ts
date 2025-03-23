import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import StripeService from './stripe.service'
import { BookingsService } from '../bookings/graphql/bookings.service'
import { CreateStripeDto } from './dto/create-stripe-session.dto'
import { CreateBookingInput } from '../bookings/graphql/dtos/create-booking.input'
import { Response } from 'express'
import { StripeMockService } from './stripe-mock.service'

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly stripeMockService: StripeMockService,
    private readonly bookingService: BookingsService,
  ) {}

  @Post()
  create(@Body() createStripeDto: CreateStripeDto) {
    return this.stripeService.createStripeSession(createStripeDto)
  }

  @Get('success')
  async handleStripeSuccess(
    @Query('session_id') sessionId: string,
    @Res() res: Response,
  ) {
    if (!sessionId) {
      throw new BadRequestException('Session id missing.')
    }
    const session =
      await this.stripeService.stripe.checkout.sessions.retrieve(sessionId)
    const { bookingData } = session.metadata

    const bookingInput: CreateBookingInput = JSON.parse(bookingData)
    await this.bookingService.create(bookingInput)
    res.redirect(process.env.BOOKINGS_REDIRECT_URL)
  }

  @Post('fake-payment')
  async createFakePayment(
    @Body() createStripeDto: CreateStripeDto,
    @Res() res: Response,
  ) {
    await this.stripeMockService.createStripeSession(createStripeDto)
    return res.json({ redirectUrl: process.env.BOOKINGS_REDIRECT_URL })
  }
}
