import React from 'react'
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

interface Props {
  onChange?: (value?: string) => void
  value?: string
}

const token = '3783088602684536a93197375c3c2f96'

const AddressInput: React.FC<Props> = ({ onChange, value }) => {
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
        value={value}
        skipIcons={true}
        onUserInput={handlePlaceSelect}
        placeSelect={(place) => onChange?.(place.properties.formatted)}
        biasByCountryCode={['cz']}
      />
    </GeoapifyContext>
  )
}

export default AddressInput
