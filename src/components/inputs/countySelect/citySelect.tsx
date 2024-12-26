import { LOCATION_API } from "@/api/location";
import useQuery from "@/hooks/useQuery";
import { Select } from "@mantine/core";
import React from "react";
import { cityType } from ".";

export const CitySelect = (props: {
  required?: boolean;
  countryCode: string;
  value?: cityType;
  onChange?: (city: cityType) => void;
}) => {
  const { countryCode, onChange, value, ...restProps } = props;
  const [cityId, setCityId] = React.useState<number | null>(value?.id ?? null); // Use number type
  const { isLoading, data } = useQuery<cityType[]>(
    LOCATION_API.GET_COUNTRY_CITIES(countryCode as string),
    [countryCode]
  );

  const onChangeHandler = (city_id: string | null) => {
    if (!city_id) return;
    const cityIdNum = Number(city_id); // Convert to number
    setCityId(cityIdNum);

    if (!data?.length) return;

    const newCity = data.find((city) => city.id === cityIdNum); // Match number type
    if (onChange && newCity) onChange(newCity);
  };

  if (!countryCode) {
    return <Select label={"City"} disabled />;
  }

  return (
    <Select
      disabled={isLoading}
      label={"City"}
      value={String(cityId || value?.id || null)} // Display as string but store as number
      searchable
      className="w-full"
      placeholder={
        isLoading ? "Loading..." : value?.name ? value?.name : "Select City"
      }
      data={
        data?.map(({ id, name }) => ({
          label: name as string,
          value: String(id), // UI handles strings
        })) ?? []
      }
      {...restProps}
      onChange={onChangeHandler}
    />
  );
};
