import { InputType, OmitType } from '@nestjs/graphql'
import { Booking } from '../entity/booking.entity'

@InputType()
export class CreateBookingInput extends OmitType(
  Booking,
  ['createdAt', 'updatedAt', 'id'],
  InputType,
) {}
