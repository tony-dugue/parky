import { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TbFilter } from 'react-icons/tb'

import {
  FormTypeSearchGarage,
  formDefaultValuesSearchGarages,
} from '@parky/forms/src/searchGarages'
import { Button } from '../../atoms/Button'
import { PulsingDot } from '../../atoms/Dot'
import { Sidebar } from '../Sidebar'
import { RangeSlider } from '../../molecules/RangeSlider'
import {
  ToggleButtonGroup,
  ToggleButton,
} from '../../molecules/ToggleButtonGroup'
import { FilterHeading } from '../../molecules/FilterHeading'
import { IconTypes } from '../../molecules/IconTypes'

export const FilterSidebar = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const {
    control,
    reset,
    getValues,
    formState: { dirtyFields },
  } = useFormContext<FormTypeSearchGarage>()

  return (
    <>
      <Button
        size="sm"
        variant="text"
        onClick={() => setOpen(true)}
        className=" hover:bg-gray-200"
      >
        <TbFilter className="stroke-1.5 text-black" />
        {Object.values(dirtyFields).length ? <PulsingDot /> : null}
      </Button>
      <Sidebar open={open} setOpen={setOpen}>
        <div className="flex flex-col items-start gap-3">
          <Controller
            name="types"
            control={control}
            render={({
              field: { value = [], onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div>
                  <FilterHeading
                    dirty={isDirty}
                    title={t('form.title.vehicle-type')}
                  />
                  <ToggleButtonGroup
                    value={value}
                    onChange={(_, value) => {
                      onChange(value.sort())
                    }}
                    aria-label=""
                  >
                    {defaultValues?.types?.map((val) => {
                      if (!val) return null
                      return (
                        <ToggleButton
                          key={val}
                          value={val}
                          selected={value.includes(val)}
                        >
                          {IconTypes[val]}
                        </ToggleButton>
                      )
                    })}
                  </ToggleButtonGroup>
                </div>
              )
            }}
          />
          <Controller
            name="pricePerHour"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading
                    dirty={isDirty}
                    title={t('form.title.price-per-hour')}
                  />
                  <RangeSlider
                    min={defaultValues?.pricePerHour?.[0]}
                    max={defaultValues?.pricePerHour?.[1]}
                    // max={200}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `$ ${sliderValue.toLocaleString()}`
                    }
                    step={5}
                  />
                </div>
              )
            }}
          />
          <Controller
            name="width"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading
                    dirty={isDirty}
                    title={t('form.title.width')}
                  />
                  <RangeSlider
                    min={defaultValues?.width?.[0]}
                    max={defaultValues?.width?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `${sliderValue.toLocaleString()} ft`
                    }
                    step={2}
                  />
                </div>
              )
            }}
          />
          <Controller
            name="height"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading
                    dirty={isDirty}
                    title={t('form.title.height')}
                  />
                  <RangeSlider
                    min={defaultValues?.height?.[0]}
                    max={defaultValues?.height?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `${sliderValue.toLocaleString()} ft`
                    }
                    step={2}
                  />
                </div>
              )
            }}
          />
          <Controller
            name="length"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading
                    dirty={isDirty}
                    title={t('form.title.length')}
                  />
                  <RangeSlider
                    min={defaultValues?.length?.[0]}
                    max={defaultValues?.length?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `${sliderValue.toLocaleString()} ft`
                    }
                    step={5}
                  />
                </div>
              )
            }}
          />
          <Button
            onClick={() =>
              reset({ ...getValues(), ...formDefaultValuesSearchGarages })
            }
            disabled={!Object.values(dirtyFields).length}
          >
            {t('button.reset')}
          </Button>
        </div>
      </Sidebar>
    </>
  )
}
