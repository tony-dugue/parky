'use client'
import { SearchPage } from '@parky/ui/src/components/templates/SearchPage'
import { FormProviderSearchGarage } from '@parky/forms/src/searchGarages'

export default function Page() {
  return (
    <FormProviderSearchGarage>
      <SearchPage />
    </FormProviderSearchGarage>
  )
}
