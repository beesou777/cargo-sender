export type InsuranceType = {
  id: number;
  coverage: number;
  text: string;
  price: {
    converted: {
      currencyCode: string | null;
      gross: number | null;
      net: number | null;
    } | null;
    original: {
      currencyCode: string;
      gross: number;
      net: number;
    };
  };
};
