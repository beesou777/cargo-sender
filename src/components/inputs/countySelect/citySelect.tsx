import { LOCATION_API } from "@/api/location";
import useQuery from "@/hooks/useQuery";
import { Select } from "@mantine/core";
import React from "react";
import { cityType } from ".";

export const CitySelect = (props: {
    required?: boolean
    countryCode: string;
    value?: cityType;
    onChange?: (city: cityType) => void;
}) => {
    const { countryCode, onChange, value, ...restProps } = props;
    const [cityId, setCityId] = React.useState<string | null>(
        String(value?.id ?? "") || null
    );
    const { isLoading, data } = useQuery<cityType[]>(LOCATION_API.GET_COUNTRY_CITIES(countryCode as string), [countryCode]);

    const onChangeHandler = (city_id: string | null) => {
        if (!city_id) return;
        setCityId(city_id);
        if (!data?.length) return;

        const newCity = data.find(
            (city) => String(city.id) === city_id
        );
        if (onChange && newCity) onChange(newCity)
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