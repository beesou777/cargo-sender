import { LOCATION_API } from "@/api/location";
import useQuery from "@/hooks/useQuery";
import { components } from "@/types/eurosender-api-types";
import { Icon } from "@iconify/react";
import { Select } from "@mantine/core";
import React, { useEffect } from "react";

export type LocationSelectValue = {
  country: countryType;
  city: cityType;
  region: regionType;
};

export type countryType = components["schemas"]["CountryResponse"];
export type cityType = components["schemas"]["CityRequest.CityResponse"];
export type regionType = components["schemas"]["RegionRequest.RegionResponse"];

type CountryWithRegionSelect = {
  value?: string;
  onChange?: (data: string) => void;
  error?: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const CountrySelect = (props: CountryWithRegionSelect) => {
  const [country, setCountry] = React.useState<countryType | null>();
  const countryCode = country?.code || null;

  const { isLoading, isError, data } = useQuery<
    components["schemas"]["CountryResponse"][]
  >(LOCATION_API.GET_COUNTRY);

  // COUNTRY
  const onChangeHandler = (countryCode: string | null) => {
    if (!countryCode) return;

    if (!data?.length) return;
    const newCountry = data.find((country) => country.code === countryCode);
    setCountry(newCountry as countryType);
    props?.onChange && props?.onChange(newCountry?.code!);
  };

  useEffect(() => {
    if (props.value) {
      const newCountry = data?.find((country) => country.code === props.value);
      setCountry(newCountry as countryType);
    }
  }, [props.value, data]);

  return (
    <section className="grid gap-2">
      <Select
        required
        disabled={isLoading}
        value={country?.code ?? countryCode}
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

      {isError && (
        <div className="error-info">Unable to fetch country data.</div>
      )}
      {props?.error && <div className="error-info">{props.error}</div>}
    </section>
  );
};

export default CountrySelect;
