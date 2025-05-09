'use client'
import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { loadStripe } from '@stripe/stripe-js'
import { Radio, RadioGroup } from '@headlessui/react'
import { useTranslation } from 'react-i18next'

import {
  CreateBookingInput,
  SearchGaragesQuery,
} from '@parky/network/src/gql/generated'
import { FormTypeBookSlot } from '@parky/forms/src/bookSlot'
import { toLocalISOString } from '@parky/util/date'
import { TotalPrice } from '@parky/util/types'
import { useTotalPrice } from '@parky/util/hooks/price'
import { Form } from '../../atoms/Form'
import { Badge } from '../../atoms/Badge'
import { AutoImageChanger } from '../AutoImageChanger'
import { DateRangeBookingInfo } from '../../molecules/DateRangeBookingInfo'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { IconTypes } from '../../molecules/IconTypes'
import { FormError } from '../../atoms/FormError'
import { HtmlInput } from '../../atoms/HtmlInput'
import { CostTitleValue } from '../../molecules/CostTitleValue'
import { ManageValets } from '../ManageValets'
import { toast } from '../../molecules/Toast'
import { Modal } from '../../atoms/Modal'

export const BookSlotModal = ({
  garage,
  showPopup,
  setShowPopup,
}: {
  garage: SearchGaragesQuery['searchGarages'][0]
  showPopup: boolean
  setShowPopup: Dispatch<SetStateAction<boolean>>
}) => {
  const session = useSession()

  const { t } = useTranslation()

  const uid = session.data?.user?.uid

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<FormTypeBookSlot>()

  const { startTime, endTime, type } = useWatch<FormTypeBookSlot>()

  const pricePerHour = garage.availableSlots.find(
    (slot) => slot.type === type,
  )?.pricePerHour

  const totalPriceObj = useTotalPrice({
    pricePerHour,
  })

  const totalPrice =
    totalPriceObj.parkingCharge +
    totalPriceObj.valetChargeDropoff +
    totalPriceObj.valetChargePickup

  const [booking, setBooking] = useState(false)

  useEffect(() => {
    if (!showPopup) {
      reset()
    }
  }, [showPopup, reset])

  const onSubmit = handleSubmit(async (data) => {
    if (!uid) {
      toast(t('toast.not-loggin'))
      return
    }

    const bookingData: CreateBookingInput = {
      phoneNumber: data.phoneNumber,
      customerId: uid,
      endTime: data.endTime,
      startTime: data.startTime,
      type: data.type,
      garageId: garage.id,
      vehicleNumber: data.vehicleNumber,
      totalPrice,
      pricePerHour,
      ...(data.valet?.pickupInfo && data.valet?.dropoffInfo
        ? {
            valetAssignment: {
              pickupLat: data.valet?.pickupInfo?.lat,
              pickupLng: data.valet?.pickupInfo?.lng,
              returnLat: data.valet?.dropoffInfo?.lat,
              returnLng: data.valet?.dropoffInfo?.lng,
            },
          }
        : null),
    }

    try {
      setBooking(true)
      // Create booking session
      await createBookingSession(uid!, totalPriceObj, bookingData)
    } catch (err) {
      console.log('err', err)
      toast(t('toast.error-creating-booking'))
    } finally {
      setBooking(false)
    }
  })

  const bodyContent = (
    <div className="flex gap-2 text-left border-t-2 border-white bg-white/50 backdrop-blur-sm">
      <Form>
        <div className="flex items-start gap-2">
          <div className="mb-2 text-lg font-bold">{garage.displayName}</div>
          {garage.verification?.verified ? (
            <Badge variant="green" size="sm">
              {t('badge.verified')}
            </Badge>
          ) : (
            <Badge variant="gray" size="sm">
              {t('badge.not-verified')}
            </Badge>
          )}
        </div>
        <div className="mb-2 text-xl font-extralight">
          {garage.address?.address}
        </div>

        <AutoImageChanger
          images={garage.images || []}
          durationPerImage={10000}
          aspectRatio="aspect-video"
          noAutoChange
        />

        <DateRangeBookingInfo startTime={startTime} endTime={endTime} />

        <div className="flex flex-wrap gap-2 mt-2">
          <HtmlLabel
            title={t('form.title.slot-type')}
            error={errors.type?.message}
          >
            <Controller
              name="type"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <RadioGroup
                    value={value || ''}
                    onChange={onChange}
                    className="flex w-full gap-2"
                    defaultValue={''}
                  >
                    {garage.availableSlots.map((slot) => (
                      <div
                        key={slot.type}
                        className="flex flex-wrap items-center gap-2 bg-white"
                      >
                        <Radio key={slot.type} value={slot.type}>
                          {({ checked }) => (
                            <div
                              className={`cursor-default border-2 p-2 ${
                                checked
                                  ? 'border-primary-500 shadow-md'
                                  : 'border-gray-200'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {slot.type ? IconTypes[slot.type] : null}
                                <div>
                                  <span className="text-lg font-bold">
                                    ${slot.pricePerHour}
                                  </span>
                                  {t('unit-label.per-hour')}
                                </div>
                              </div>

                              <div className="text-gray-600">
                                {slot.count}{' '}
                                {t(
                                  slot.count > 1
                                    ? 'form.message.opens'
                                    : 'form.message.open',
                                )}
                              </div>
                            </div>
                          )}
                        </Radio>
                      </div>
                    ))}
                  </RadioGroup>
                )
              }}
            />
          </HtmlLabel>
        </div>

        {!type && !errors.type?.message ? (
          <FormError error={t('form.message.set-slot-type')} />
        ) : null}

        <HtmlLabel
          title={t('form.title.start-time')}
          error={errors.startTime?.message}
        >
          <HtmlInput
            type="datetime-local"
            min={toLocalISOString(new Date()).slice(0, 16)}
            {...register('startTime')}
          />
        </HtmlLabel>
        <HtmlLabel
          title={t('form.title.end-time')}
          error={errors.endTime?.message}
        >
          <HtmlInput
            min={toLocalISOString(new Date()).slice(0, 16)}
            type="datetime-local"
            {...register('endTime')}
          />
        </HtmlLabel>

        <HtmlLabel
          title={t('form.title.vehicle-number')}
          error={errors.vehicleNumber?.message}
        >
          <HtmlInput
            placeholder={t('form.placeholder.vehicle-number')}
            {...register('vehicleNumber')}
          />
        </HtmlLabel>

        <HtmlLabel
          title={t('form.title.phone-number')}
          error={errors.phoneNumber?.message}
        >
          <HtmlInput
            placeholder={t('form.placeholder.phone-number')}
            {...register('phoneNumber')}
          />
        </HtmlLabel>

        <ManageValets garage={garage} />

        {totalPriceObj ? (
          <div className="mt-4">
            <CostTitleValue
              title={t('form.message.parking')}
              price={totalPriceObj.parkingCharge}
            />
            <CostTitleValue
              title={t('form.message.valet-pickup')}
              price={totalPriceObj.valetChargePickup}
            />
            <CostTitleValue
              title={t('form.message.valet-dropoff')}
              price={totalPriceObj.valetChargeDropoff}
            />
            <CostTitleValue
              title={t('form.message.total')}
              price={totalPrice}
            />
          </div>
        ) : null}
      </Form>
    </div>
  )

  return (
    <Modal
      isOpen={showPopup}
      onClose={() => setShowPopup(false)}
      onSubmit={onSubmit}
      loading={booking}
      actionLabel={t('button.book-now')}
      secondaryActionLabel={t('button.cancel')}
      secondaryAction={() => setShowPopup(false)}
      title={t('message.booking')}
      body={bodyContent}
    />
  )
}

export const createBookingSession = async (
  uid: string,
  totalPriceObj: TotalPrice,
  bookingData: CreateBookingInput,
) => {
  if (process.env.NEXT_PUBLIC_STRIPE_ACTIVATE === 'false') {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/stripe/fake-payment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalPriceObj,
          uid,
          bookingData,
        }),
      },
    )
    const res = await response.json()
    return (window.location.href = res.redirectUrl)
  }

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalPriceObj,
        uid,
        bookingData,
      }),
    })
    const checkoutSession = await response.json()

    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

    const stripe = await loadStripe(publishableKey || '')
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.sessionId,
    })

    return result
  } catch (error) {
    console.error('Error creating booking session:', error)
    throw error
  }
}
