'use client'
import { useCallback } from 'react'
import { ViewStateChangeEvent } from 'react-map-gl/maplibre'
import { useFormContext } from 'react-hook-form'
import { TbArrowDown } from 'react-icons/tb'

import { toLocalISOString } from '@parky/util/date'
import { initialViewState } from '@parky/util/constants'
import { FormTypeSearchGarage } from '@parky/forms/src/searchGarages'
import { Map } from '../organisms/map/Map'
import { Panel } from '../organisms/map/Panel'
import { DefaultZoomControls } from '../organisms/map/ZoomControls'
import { SearchPlaceBox } from '../organisms/map/SearchPlacesBox'
import { IconType } from '../molecules/IconTypes'
import { HtmlInput } from '../atoms/HtmlInput'
import { ShowGarages } from '../organisms/search/ShowGarages'
import { FilterSidebar } from '../organisms/search/FilterSidebar'

export const SearchPage = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<FormTypeSearchGarage>()

  const formData = watch()

  const handleMapChange = useCallback(
    (target: ViewStateChangeEvent['target']) => {
      const bounds = target.getBounds()
      const locationFilter = {
        ne_lat: bounds?.getNorthEast().lat || 0,
        ne_lng: bounds?.getNorthEast().lng || 0,
        sw_lat: bounds?.getSouthWest().lat || 0,
        sw_lng: bounds?.getSouthWest().lng || 0,
      }
      setValue('locationFilter', locationFilter)
    },
    [setValue],
  )

  return (
    <Map
      onLoad={(e) => handleMapChange(e.target)}
      onDragEnd={(e) => handleMapChange(e.target)}
      onZoomEnd={(e) => handleMapChange(e.target)}
      initialViewState={initialViewState}
    >
      <ShowGarages />
      <Panel position="left-top">
        <div className="flex flex-col items-stretch">
          <SearchPlaceBox />
          <div className="flex relative pl-1 flex-col mt-1 bg-white/40 items-center gap-1 backdrop-blur-sm">
            <div className=" absolute left-[1px] top-1/2 -translate-y-1/2 ">
              <TbArrowDown className="p-1" />
            </div>
            <div className="flex gap-1 items-center">
              <IconType time={formData.startTime} />
              <HtmlInput
                type="datetime-local"
                className="w-full p-2 text-lg font-light border-0"
                min={toLocalISOString(new Date()).slice(0, 16)}
                {...register('startTime', {
                  onChange() {
                    trigger('startTime')
                    trigger('endTime')
                  },
                })}
              />
            </div>
            <div className="flex gap-1 items-center">
              <IconType time={formData.endTime} />
              <HtmlInput
                min={toLocalISOString(new Date()).slice(0, 16)}
                type="datetime-local"
                className="w-full p-2 text-lg font-light border-0"
                {...register('endTime', {
                  onChange() {
                    trigger('endTime')
                  },
                })}
              />
            </div>
          </div>
        </div>
      </Panel>
      <Panel position="right-center">
        <DefaultZoomControls />
      </Panel>
      {errors ? (
        <Panel position="center-bottom">
          {Object.entries(errors).map(([key, value]) => {
            return (
              <div className="text-red-800 p-2 shadow bg-white" key={key}>
                {key}: {value.message}
              </div>
            )
          })}
        </Panel>
      ) : null}
      <Panel position="right-top">
        <FilterSidebar />
      </Panel>
    </Map>
  )
}
