import { LOCATION_API } from "@/api/location";
import useQuery from "@/hooks/useQuery";
import { components } from "@/types/eurosender-api-types";
import { Icon } from "@iconify/react";
import { Select } from "@mantine/core";
import React from "react";

export type LocationSelectValue = {
  country: components["schemas"]["CountryResponse"]
  city: components["schemas"]["CityRequest.CityResponse"]
  region: components["schemas"]["RegionRequest.RegionResponse"]

}

type CountryWithRegionSelect = {
  value?: LocationSelectValue;
  defaultValue?: any;
  onChange?: (data: LocationSelectValue) => void;
  error?: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const CountryWithRegionSelect = (props: CountryWithRegionSelect) => {
  const [countryCode, setCountryCode] = React.useState<string | null>(
    props.value?.country.code || null
  );

  const [country, setCountry] =
    React.useState<components["schemas"]["CountryResponse"]>();

  const [region, setRegion] =
    React.useState<components["schemas"]["RegionRequest.RegionResponse"]>();

  const [city, setCity] =
    React.useState<components["schemas"]["CityRequest.CityResponse"]>();

  const { isLoading, isError, data } = useQuery<
    components["schemas"]["CountryResponse"][]
  >(LOCATION_API.GET_COUNTRY);

  // COUNTRY
  const onChangeHandler = (countryCode: string | null) => {
    if (!countryCode) return;
    setCountryCode(countryCode as string);
    if (!data?.length) return;
    const country = data.find((country) => country.code === countryCode);
    setCountry(country);
    console.log(country)
  };

  // CITY
  const onCityChangeHandler = (
    cityName: string | null,
    cityData: components["schemas"]["CityRequest.CityResponse"][]
  ) => {
    if (!cityName) return;
    if (!cityData?.length) return;
    const location = cityData.find(
      (city) => String(city.id) === cityName
    );
    setRegion(location);
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
    const location = regionData.find(
      (region) => String(region.id) === regionId
    );
    setRegion(location);
  };


  return (
    <section className="grid gap-2">
      <div className="grid sm:flex gap-4">
        <Select
          label="Country"
          required
          disabled={isLoading}
          value={countryCode}
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
          value={props.value?.region!}
        />}
        <CitySelect
          required={country?.requiresCity ?? false}
          countryCode={countryCode as string}
          onChange={onCityChangeHandler}
          value={props.value?.city!}
        />
      </div>
      {isError && (
        <div className="error-info">Unable to fetch country data.</div>
      )}
      {props?.error && <div className="error-info">{props.error}</div>}
    </section>
  );
};

export default CountryWithRegionSelect;

const CitySelect = (props: {
  required: boolean
  countryCode: string;
  value?: components["schemas"]["CityRequest.CityResponse"];
  onChange?: (
    locationName: string,
    locationData: components["schemas"]["CityRequest.CityResponse"][]
  ) => void;
}) => {
  const { countryCode, onChange, value, ...restProps } = props;
  const [cityId, setCityId] = React.useState<string | null>(
    String(value?.id ?? "") || null
  );

  const { isLoading, data } = useQuery<
    components["schemas"]["CityRequest.CityResponse"][]
  >(LOCATION_API.GET_COUNTRY_CITIES(countryCode as string), [countryCode]);

  const onChangeHandler = (city_id: string | null) => {
    if (!city_id) return;
    setCityId(city_id);
    if (!data?.length) return;
    if (!onChange) return;
    onChange(city_id, data);
  };

  if (!countryCode) {
    return <Select label={"City"} disabled />;
  }

  return (
    <Select
      disabled={isLoading}
      label={"City"}
      value={String(cityId) || String(value?.id) || ""}
      searchable
      className="w-full"
      placeholder={
        isLoading ? "Loading..." : value?.name ? value?.name : "Select City"
      }
      data={
        data?.map(({ id, name }) => ({
          label: String(name) as string,
          value: String(id) as string,
        })) ?? []
      }
      {...restProps}
      onChange={onChangeHandler}
    />
  );
};

const RegionSelect = (props: {
  required: boolean
  countryCode: string;
  value?: components["schemas"]["RegionRequest.RegionResponse"];
  onChange?: (
    locationName: string,
    locationData: components["schemas"]["RegionRequest.RegionResponse"][]
  ) => void;
}) => {
  const { countryCode, onChange, value, ...restProps } = props;
  const [regionId, setRegionId] = React.useState<string | null>(
    String(value?.id ?? "") || null
  );

  const { isLoading, data } = useQuery<
    components["schemas"]["RegionRequest.RegionResponse"][]
  >(LOCATION_API.GET_COUNTRY_REGIONS(countryCode as string), [countryCode]);

  const onChangeHandler = (region_id: string | null) => {
    if (!region_id) return;
    setRegionId(region_id);
    if (!data?.length) return;
    if (!onChange) return;
    onChange(region_id, data);
  };

  if (!countryCode) {
    return <Select label="Region" disabled />;
  }

  return (
    <Select
      label="Region"
      disabled={isLoading}
      value={String(regionId) || String(value?.id) || ""}
      searchable
      className="w-full"
      placeholder={
        (isLoading ? "Loading..." : value?.name ? value?.name : "Select Region") as string
      }
      data={
        data?.map(({ id, name }) => ({
          label: String(name) as string,
          value: String(id) as string,
        })) ?? []
      }
      {...restProps}
      onChange={onChangeHandler}
    />
  );
};