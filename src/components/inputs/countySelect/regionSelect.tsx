import { LOCATION_API } from "@/api/location";
import useQuery from "@/hooks/useQuery";
import { Select } from "@mantine/core";
import React from "react";
import { regionType } from ".";

export const RegionSelect = (props: {
    required: boolean
    countryCode: string;
    value?: regionType;
    onChange?: (
        locationName: string,
        locationData: regionType[]
    ) => void;
}) => {
    const { countryCode, onChange, value, ...restProps } = props;
    const [regionId, setRegionId] = React.useState<string | null>(
        String(value?.id ?? "") || null
    );
    const { isLoading, data } = useQuery<
        regionType[]
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