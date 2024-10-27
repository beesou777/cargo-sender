import { LOCATION_API } from "@/api/location";
import useQuery from "@/hooks/useQuery";
import { components } from "@/types/eurosender-api-types";
import { Icon } from "@iconify/react";
import { Select } from "@mantine/core";
import React from "react";
import { RegionSelect } from "./regionSelect";
import { CitySelect } from "./citySelect";


export type countryType = components["schemas"]["CountryResponse"]
export type cityType = components["schemas"]["CityRequest.CityResponse"]
export type regionType = components["schemas"]["RegionRequest.RegionResponse"]

export type LocationSelectValue = {
  country: countryType
  city: cityType
  region: regionType

}

type CountryWithRegionSelect = {
  value?: LocationSelectValue;
  onChange?: (data: LocationSelectValue) => void;
  error?: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const CountryWithRegionSelect = (props: CountryWithRegionSelect) => {
  const [countryCode, setCountryCode] = React.useState<string | null>(
    props.value?.country.code || null
  );

  const [city, setCity] =
    React.useState<cityType | null>(props.value?.city || null);

  const [country, setCountry] =
    React.useState<countryType | null>(props.value?.country || null);

  const [region, setRegion] =
    React.useState<regionType | null>(props.value?.region || null);


  const { isLoading, isError, data } = useQuery<
    components["schemas"]["CountryResponse"][]
  >(LOCATION_API.GET_COUNTRY);

  // COUNTRY
  const onChangeHandler = (countryCode: string | null) => {
    if (!countryCode) return;
    setCountryCode(countryCode as string);
    if (!data?.length) return;
    const newCountry = data.find((country) => country.code === countryCode);
    setCountry(newCountry as countryType);
  };

  // CITY
  const onCityChangeHandler = (
    cityName: string | null,
    cityData: cityType[]
  ) => {
    if (!cityName) return;
    if (!cityData?.length) return;
    const newCity = cityData.find(
      (city) => String(city.id) === cityName
    );
    setCity(newCity as cityType);
  };

  React.useEffect(() => {
    if (country && (city || region))
      if (props.onChange) props?.onChange({ country, region: region! || {}, city: city! || {} });
  }, [region, city, country]);

  // REGION
  const onRegionChangeHandler = (
    regionId: string | null,
    regionData: components["schemas"]["RegionRequest.RegionResponse"][]
  ) => {
    if (!regionId) return;
    if (!regionData?.length) return;
    const newRegion = regionData.find(
      (region) => String(region.id) === regionId
    );
    setRegion(newRegion as regionType);
  };


  return (
    <section className="grid gap-2">
      <div className="grid sm:flex gap-4">
        <Select
          label="Country"
          required
          disabled={isLoading}
          value={country?.code ?? countryCode}
          className="sm:max-w-[180px] w-full"
          leftSection={
            countryCode ? (
              <Icon icon={`flagpack:${countryCode?.toLocaleLowerCase()}`} />
            ) : null
          }
          searchable
          placeholder={isLoading ? "Loading..." : "Select country"}
          onChange={onChangeHandler}
          data={
            data?.map(({ code, name }) => ({
              label: name as string,
              value: code as string,
            })) ?? []
          }
        />
        {country?.requiresRegion && <RegionSelect
          required={country?.requiresRegion ?? false}
          countryCode={countryCode as string}
          onChange={onRegionChangeHandler}
          value={props.value?.region}
        />}
        {country ? <CitySelect
          required={country?.requiresCity ?? false}
          countryCode={countryCode as string}
          onChange={onCityChangeHandler}
          value={props.value?.city}
        /> : <Select label={"City"} disabled />}
      </div>
      {isError && (
        <div className="error-info">Unable to fetch country data.</div>
      )}
      {props?.error && <div className="error-info">{props.error}</div>}
    </section>
  );
};

export default CountryWithRegionSelect;