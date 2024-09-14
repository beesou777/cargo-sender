import { LOCATION_API } from "@/api/location";
import useQuery from "@/hooks/useQuery";
import { LocationT } from "@/store/cargo";
import { components } from "@/types/eurosender-api-types";
import { Icon } from "@iconify/react";
import { Select, SelectProps } from "@mantine/core";
import React from "react";

const LocationSelect = (
  props: Omit<SelectProps, "onChange"> & {
    countryCode: string;
    onChange: (
      locationName: string,
      locationData: components["schemas"]["CityRequest.CityResponse"][]
    ) => void;
  }
) => {
  const [cityLabel, setCityLabel] = React.useState<string>();
  const { countryCode, onChange, ...restProps } = props;

  const { isLoading, data } = useQuery<
    components["schemas"]["CityRequest.CityResponse"][]
  >(LOCATION_API.GET_countryLocation(countryCode), [countryCode]);

  const onChangeHandler = (cityLabel: string | null) => {
    if (!cityLabel) return;
    setCityLabel(cityLabel);
    if (!data?.length) return;
    if (!onChange) return;
    onChange(cityLabel, data);
  };
  return (
    <Select
      defaultValue={cityLabel}
      searchable
      className="w-full"
      placeholder={isLoading ? "Loading..." : "Select location"}
      data={
        data?.map(({ name }) => ({
          label: name as string,
          value: name as string,
        })) ?? []
      }
      {...restProps}
      onChange={onChangeHandler}
    />
  );
};

type CountryWithRegionSelect = {
  value?: LocationT;
  defaultValue?: LocationT;
  onChange?: (data: LocationT) => void;
  error?: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const CountryWithRegionSelect = (props: CountryWithRegionSelect) => {
  const [countryCode, setCountryCode] = React.useState<string>();

  const [country, setCountry] =
    React.useState<components["schemas"]["CountryResponse"]>();

  const [location, setLocation] =
    React.useState<components["schemas"]["CityRequest.CityResponse"]>();

  const { isLoading, isError, data } = useQuery<
    components["schemas"]["CountryResponse"][]
  >(LOCATION_API.GET_country);
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
    const location = locationData.find((city) => city.name === locationName);
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
          defaultValue={countryCode}
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
        {countryCode ? (
          <LocationSelect
            className="w-full"
            countryCode={countryCode}
            onChange={onLocationChangeHandler}
          />
        ) : (
          <Select className="w-full" disabled />
        )}
      </div>
      {isError && (
        <div className="bg-red-100 py-2 px-4 text-red-500 text-xs font-semibold">
          Unable to fetch country data.
        </div>
      )}
      {props?.error && (
        <div className="bg-red-100 py-2 px-4 text-red-500 text-xs font-semibold">
          {props.error}
        </div>
      )}
    </section>
  );
};

export default CountryWithRegionSelect;
