import { Injectable } from '@nestjs/common'
import { CreateStripeDto } from './dto/create-stripe-session.dto'
import { BookingsService } from '../bookings/graphql/bookings.service'
import { CreateBookingInput } from '../bookings/graphql/dtos/create-booking.input'

@Injectable()
export class StripeMockService {
  constructor(private readonly bookingService: BookingsService) {}

  async createStripeSession({
    totalPriceObj,
    uid,
    bookingData,
  }: CreateStripeDto) {
    const totalPriceCalculated =
      totalPriceObj.parkingCharge +
      totalPriceObj.valetChargeDropoff +
      totalPriceObj.valetChargePickup

    const bookingInput: CreateBookingInput = {
      customerId: uid,
      startTime: bookingData.startTime,
      endTime: bookingData.endTime,
      garageId: bookingData.garageId,
      type: bookingData.type,
      vehicleNumber: bookingData.vehicleNumber,
      phoneNumber: bookingData.phoneNumber,
      pricePerHour: bookingData.pricePerHour,
      totalPrice: totalPriceCalculated,
    }
    await this.bookingService.create(bookingInput)

    return { redirectUrl: process.env.BOOKINGS_REDIRECT_URL }
  }
}
