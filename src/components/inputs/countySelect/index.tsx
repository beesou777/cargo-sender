import { LOCATION_API } from "@/api/location";
import useQuery from "@/hooks/useQuery";
import { LocationT } from "@/store/cargo";
import { components } from "@/types/eurosender-api-types";
import { Icon } from "@iconify/react";
import { Select } from "@mantine/core";
import React from "react";

type CountryWithRegionSelect = {
  value?: LocationT;
  defaultValue?: LocationT;
  onChange?: (data: LocationT) => void;
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

  const [location, setLocation] =
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
  };
  // LOCATION
  const onLocationChangeHandler = (
    locationName: string | null,
    locationData: components["schemas"]["CityRequest.CityResponse"][]
  ) => {
    if (!locationName) return;
    if (!locationData?.length) return;
    const location = locationData.find(
      (city) => String(city.id) === locationName
    );
    setLocation(location);
  };
  React.useEffect(() => {
    if (location && country)
      if (props.onChange) props?.onChange({ country, location });
  }, [location]);

  return (
    <section className="grid gap-2">
      <div className="grid sm:flex gap-4">
        <Select
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

        <LocationSelect
          countryCode={countryCode as string}
          onChange={onLocationChangeHandler}
          value={props.value?.location!}
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

const LocationSelect = (props: {
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
  >(LOCATION_API.GET_COUNTRY_LOCATION(countryCode as string), [countryCode]);

  const onChangeHandler = (city_id: string | null) => {
    if (!city_id) return;
    setCityId(city_id);
    if (!data?.length) return;
    if (!onChange) return;
    onChange(city_id, data);
  };

  if (!countryCode) {
    return <Select disabled />;
  }

  return (
    <Select
      disabled={isLoading}
      value={String(cityId) || String(value?.id) || ""}
      searchable
      className="w-full"
      placeholder={
        isLoading ? "Loading..." : value?.name ? value?.name : "Select location"
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
