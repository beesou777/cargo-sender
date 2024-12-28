import { components } from "@/types/eurosender-api-types";

export const addCommissionToPrice = (
  data: components["schemas"]["OrderRequest.OrderResponse"]
): {
  grossPrice: number;
  discount: number;
  netPrice: number;
  insurance?: number;
  parcels: components["schemas"]["OrderRequest.OrderResponse"]["parcels"];
} => {
  const discount = data?.discount?.discount?.original?.net ?? 0;

  let price = data?.price?.original?.gross ?? 0;

  const insurance = data?.insurance?.price?.original?.net;

  if (insurance) {
    price += +insurance;
  }

  return {
    grossPrice: price * 1.5,
    discount: discount * 1.5,
    ...(insurance && { insurance: insurance * 1.5 }),
    netPrice: (price - discount + (insurance ?? 0)) * 1.5,

    parcels: {
      packages: data?.parcels?.packages?.map((p) => {
        return {
          ...p,
          price: {
            ...p.price,
            original: {
              ...p.price?.original,
              currencyCode: p.price?.original?.currencyCode!,
              gross: (p.price?.original?.gross ?? 0) * 1.5,
            },
          },
        };
      }),
      envelopes: data?.parcels?.envelopes?.map((e) => {
        return {
          ...e,
          price: {
            ...e.price,
            original: {
              ...e.price?.original,
              currencyCode: e.price?.original?.currencyCode!,
              gross: (e.price?.original?.gross ?? 0) * 1.5,
            },
          },
        };
      }),
      pallets: data?.parcels?.pallets?.map((p) => {
        return {
          ...p,
          price: {
            ...p.price,
            original: {
              ...p.price?.original,
              currencyCode: p.price?.original?.currencyCode!,
              gross: (p.price?.original?.gross ?? 0) * 1.5,
            },
          },
        };
      }),
    },
  };
};
