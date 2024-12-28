import { components } from "@/types/eurosender-api-types";
import { addCommissionToPrice } from "@/utils/price";
import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

interface AppleRecipetEmailInterface {
  data: components["schemas"]["OrderRequest.OrderResponse"];
}

export const OrderConfirmationEmail = ({
  data,
}: AppleRecipetEmailInterface) => {
  const shipment = data?.shipment!;
  const estimatedDeliveryTime = `${data?.estimatedDeliveryTime} days`;
  const invoiceDate = new Date().toLocaleDateString();
  const orderNumber = data?.orderCode!;

  const { discount, netPrice, grossPrice, insurance, parcels } =
    addCommissionToPrice(data);
  console.log({ grossPrice });
  return (
    <Html>
      <Head />
      <Preview>Order Confirmation #{orderNumber}</Preview>

      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Section>
              <Row>
                <Column>
                  <Img
                    src={`${baseUrl}/assets/icons/brand-logo.png`}
                    width="auto"
                    height="42"
                    alt="Logo"
                  />
                </Column>

                {/* <Column align="right" style={tableCell}>
                <Text style={heading}>Cargo Sender</Text>
              </Column> */}
              </Row>
            </Section>
            <Section>
              <Text style={cupomText}>
                Your order has been confirmed. -- {orderNumber}
              </Text>
            </Section>

            {/* <Section style={{ ...informationTable, paddingTop: "30px" }}>
              <Row>
                <Column style={informationTableColumn} colSpan={2}>
                  <Text style={informationTableLabel}>PICKUP ADDRESS</Text>
                  <Text style={informationTableValue}>
                    {shipment?.pickupAddress?.zip},{" "}
                    {shipment?.pickupAddress?.street}
                  </Text>
                  <Text style={informationTableValue}>
                    {shipment?.pickupAddress?.city}
                  </Text>
                  <Text style={informationTableValue}>
                    {shipment?.pickupAddress?.street}
                  </Text>
                </Column>
                <Column
                  style={informationTableColumn}
                  align="right"
                  colSpan={2}
                >
                  <Text style={informationTableLabel}>DELIVERY ADDRESS</Text>
                  <Text style={informationTableValue}>
                    {shipment?.deliveryAddress?.zip},{" "}
                    {shipment?.deliveryAddress?.street}
                  </Text>
                  <Text style={informationTableValue}>
                    {shipment?.deliveryAddress?.city}
                  </Text>
                  <Text style={informationTableValue}>
                    {shipment?.deliveryAddress?.street}
                  </Text>
                </Column>
              </Row>
            </Section> */}

            <Section style={informationTable}>
              <Row>
                <Column style={informationTableColumn} colSpan={2}>
                  <Text style={informationTableLabel}>ORDER NUMBER</Text>
                  <Link
                    style={{
                      ...informationTableValue,
                      color: "#15c",
                      textDecoration: "underline",
                    }}
                    href={`${baseUrl}/dashboard/orders/${orderNumber}`}
                  >
                    {orderNumber}
                  </Link>
                </Column>

                <Column
                  style={informationTableColumn}
                  align="right"
                  colSpan={2}
                >
                  <Text style={informationTableLabel}>INVOICE DATE</Text>
                  <Text style={informationTableValue}>{invoiceDate}</Text>
                </Column>
              </Row>
            </Section>

            <Section style={informationTable}>
              <Row>
                <Column style={informationTableColumn} colSpan={2}>
                  <Text style={informationTableLabel}>PICKUP DATE</Text>
                  <Text style={informationTableValue}>
                    {shipment?.pickupDate}
                  </Text>
                  {/* <Text style={informationTableValue}>Alan Turing</Text> */}
                </Column>
                <Column
                  style={informationTableColumn}
                  align="right"
                  colSpan={2}
                >
                  <Text style={informationTableLabel}>
                    ESTIMATED DELIVERY TIME
                  </Text>
                  <Text style={informationTableValue}>
                    {estimatedDeliveryTime}
                  </Text>
                  {/* <Text style={informationTableValue}>Alan Turing</Text> */}
                </Column>
              </Row>
            </Section>
            <Section style={productTitleTable}>
              <Row>
                <Column style={informationTableColumn} colSpan={2}>
                  <Text style={informationTableLabel}>BILLED TO</Text>
                  <Text style={informationTableValue}>
                    {shipment?.pickupDate}
                  </Text>
                  <Text style={informationTableValue}>
                    {shipment?.pickupContact?.name}
                  </Text>
                  <Text style={informationTableValue}>
                    {shipment?.pickupAddress?.street}
                  </Text>
                  <Text style={informationTableValue}>
                    {shipment?.pickupAddress?.city}{" "}
                    {shipment?.pickupAddress?.zip}
                  </Text>
                  <Text style={informationTableValue}>
                    {shipment?.pickupAddress?.country}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section style={productTitleTable}>
              <Text style={productsTitle}>Order Summary</Text>
            </Section>
            <Section style={{ paddingLeft: "12px" }}>
              {!!parcels?.packages && (
                <Row>
                  {parcels.packages?.map((item, index) => (
                    <Row style={{ marginBottom: "10px" }} key={index}>
                      <Column key={index} style={{ marginBottom: "10px" }}>
                        <Text style={productTitle}>Package #{index + 1}</Text>
                        <Text style={productDescription}>
                          {item.height} x {item.width} x {item.length} cm
                        </Text>
                      </Column>
                      <Column style={productPriceWrapper} align="right">
                        <Text style={productDescription}>{item.weight} KG</Text>
                      </Column>
                    </Row>
                  ))}
                </Row>
              )}
              {!!parcels?.pallets && (
                <Row>
                  {parcels.pallets?.map((item, index) => (
                    <Row style={{ marginBottom: "10px" }} key={index}>
                      <Column key={index} style={{ marginBottom: "10px" }}>
                        <Text style={productTitle}>Pallet #{index + 1}</Text>
                        <Text style={productDescription}>
                          {item.height} x {item.width} x {item.length} cm
                        </Text>
                      </Column>
                      <Column style={productPriceWrapper} align="right">
                        <Text style={productDescription}>{item.weight} KG</Text>
                      </Column>
                    </Row>
                  ))}
                </Row>
              )}
              {!!parcels?.envelopes && (
                <Row>
                  {parcels.pallets?.map((item, index) => (
                    <Row style={{ marginBottom: "10px" }} key={index}>
                      <Column key={index} style={{ marginBottom: "10px" }}>
                        <Text style={productTitle}>Envelope #{index + 1}</Text>
                      </Column>
                      <Column style={productPriceWrapper} align="right">
                        <Text style={productDescription}>{item.weight} KG</Text>
                      </Column>
                    </Row>
                  ))}
                </Row>
              )}
            </Section>
            <Hr style={productPriceLine} />
            <Section>
              <Row>
                <Column style={tableCell} align="right">
                  <Text style={productPriceTotal}>GROSS TOTAL</Text>
                </Column>
                <Column style={productPriceLargeWrapper}>
                  <Text style={productPriceTotal}>EUR {grossPrice}</Text>
                </Column>
              </Row>
              {insurance && (
                <Row>
                  <Column style={tableCell} align="right">
                    <Text style={productPriceTotal}>INSURANCE</Text>
                  </Column>
                  <Column style={productPriceLargeWrapper}>
                    <Text style={productPriceTotal}>EUR {insurance}</Text>
                  </Column>
                </Row>
              )}
              <Row>
                <Column style={tableCell} align="right">
                  <Text style={productPriceTotal}>DISCOUNT</Text>
                </Column>
                <Column style={productPriceLargeWrapper}>
                  <Text style={productPriceTotal}>EUR {discount}</Text>
                </Column>
              </Row>
              <Row>
                <Column style={tableCell} align="right">
                  <Text style={productPriceLarge}>TOTAL</Text>
                </Column>
                <Column style={productPriceLargeWrapper}>
                  <Text style={productPriceLarge}>EUR {netPrice}</Text>
                </Column>
              </Row>
            </Section>

            <Text style={footerCopyright}>
              Copyright © 2023 Cargo Sender. <br /> All rights reserved
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OrderConfirmationEmail;

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
  maxWidth: "100%",
};

const tableCell = { display: "table-cell" };

const heading = {
  fontSize: "32px",
  fontWeight: "300",
  color: "#888888",
};

const cupomText = {
  textAlign: "center" as const,
  margin: "36px 0 40px 0",
  fontSize: "22px",
  fontWeight: "500",
  color: "#111111",
};

const supStyle = {
  fontWeight: "300",
};

const informationTable = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
};

const informationTableRow = {
  height: "46px",
};

const informationTableColumn = {
  paddingLeft: "20px",
  paddingRight: "20px",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "0px 1px 1px 0px",
  height: "44px",
};

const informationTableLabel = {
  ...resetText,
  color: "rgb(102,102,102)",
  fontSize: "10px",
};

const informationTableValue = {
  fontSize: "12px",
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const productTitleTable = {
  ...informationTable,
  margin: "30px 0 15px 0",
  height: "24px",
};

const productsTitle = {
  background: "#fafafa",
  paddingLeft: "10px",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const productIcon = {
  margin: "0 0 0 20px",
  borderRadius: "14px",
  border: "1px solid rgba(128,128,128,0.2)",
};

const productTitle = { fontSize: "12px", fontWeight: "600", ...resetText };

const productDescription = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  ...resetText,
};

const productLink = {
  fontSize: "12px",
  color: "rgb(0,112,201)",
  textDecoration: "none",
};

const divisor = {
  marginLeft: "4px",
  marginRight: "4px",
  color: "rgb(51,51,51)",
  fontWeight: 200,
};

const productPriceTotal = {
  margin: "0",
  color: "rgb(102,102,102)",
  fontSize: "10px",
  fontWeight: "600",
  padding: "0px 30px 0px 0px",
  textAlign: "right" as const,
};

const productPrice = {
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
};

const productPriceLarge = {
  margin: "0px 28px 0px 0px",
  fontSize: "14px",
  fontWeight: "600",
  whiteSpace: "nowrap" as const,
  textAlign: "right" as const,
};

const productPriceWrapper = {
  display: "table-cell",
  padding: "0px 20px 0px 0px",
  width: "100px",
  verticalAlign: "top",
};

const productPriceLine = { margin: "30px 0 0 0" };

const productPriceVerticalLine = {
  height: "48px",
  borderLeft: "1px solid",
  borderColor: "rgb(238,238,238)",
};

const productPriceLargeWrapper = { display: "table-cell", width: "90px" };

const productPriceLineBottom = { margin: "0 0 75px 0" };

const block = { display: "block" };

const ctaTitle = {
  display: "block",
  margin: "15px 0 0 0",
};

const ctaText = { fontSize: "24px", fontWeight: "500" };

const walletWrapper = { display: "table-cell", margin: "10px 0 0 0" };

const walletLink = { color: "rgb(0,126,255)", textDecoration: "none" };

const walletImage = {
  display: "inherit",
  paddingRight: "8px",
  verticalAlign: "middle",
};

const walletBottomLine = { margin: "65px 0 20px 0" };

const footerText = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  margin: "0",
  lineHeight: "auto",
  marginBottom: "16px",
};

const footerTextCenter = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  margin: "20px 0",
  lineHeight: "auto",
  textAlign: "center" as const,
};

const footerLink = { color: "rgb(0,115,255)" };

const footerIcon = { display: "block", margin: "40px 0 0 0" };

const footerLinksWrapper = {
  margin: "8px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};

const footerCopyright = {
  margin: "25px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};

const walletLinkText = {
  fontSize: "14px",
  fontWeight: "400",
  textDecoration: "none",
};
