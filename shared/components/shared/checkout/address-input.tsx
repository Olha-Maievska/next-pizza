import React from 'react'
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

interface Props {
  onChange?: (value?: string) => void
}

const token = '3783088602684536a93197375c3c2f96'

const AddressInput: React.FC<Props> = ({ onChange }) => {
  const handlePlaceSelect = (place: string) => {
    onChange?.(place)
  }

  return (
    <GeoapifyContext apiKey={token}>
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter address here"
        lang="en"
        limit={3}
        filterByCountryCode={['cz']}
        skipIcons={true}
        onUserInput={handlePlaceSelect}
      />
    </GeoapifyContext>
  )
}

export default AddressInput
