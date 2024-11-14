import { WEBHOOK_ORDER_NOT_FOUND, insertLog } from "@/utils/logging";
import { turso } from "@/utils/turso";
import { NextRequest } from "next/server";

enum WebhookTriggerCodeEnum {
  LABELS_READY = 1,
  ORDER_SUBMITTED_TO_COURIER = 2,
  ORDER_TRACKING_READY_TRIGGER = 3,
  ORDER_WAS_CANCELLED = 4,
  ORDER_DELIVERY_STATUS_UPDATED = 5,
}

interface OrderTrackingCodeInterface {
  orderCode: string;
  trackingNumber: string;
  trackingUrl: string;
}

interface WebhookBodyInterface {
  triggerId: number;
  orderCode: string;
  courierId: number;
  trackingCodes: OrderTrackingCodeInterface[];
  notifications: unknown[];
}

export async function POST(req: NextRequest) {
  try {
    const body: WebhookBodyInterface = await req.json();
    const triggerId = +WebhookTriggerCodeEnum[body["triggerId"]];
    const orderCode = body.orderCode;
    const order = await turso.execute({
      sql: `SELECT * FROM user_orders WHERE order_id = ? `,
      args: [orderCode],
    });
    const latestWebhookEvent = req.headers.get("Webhook-Event");
    if (order.rows.length != 0) {
      await insertLog(`${WEBHOOK_ORDER_NOT_FOUND}: ${orderCode} was not found`);
    } else if (!latestWebhookEvent) {
      await insertLog(`Webhook was fired without webhook event type`);
    } else {
      await turso.execute({
        sql: `UPDATE user_orders SET latest_webhook_event = ? WHERE order_code = ?`,
        args: [latestWebhookEvent],
      });
      switch (triggerId) {
        case WebhookTriggerCodeEnum.LABELS_READY: {
          await turso.execute({
            sql: `UPDATE user_orders SET labels_ready = True WHERE order_code = ?`,
            args: [orderCode],
          });
        }
        case WebhookTriggerCodeEnum.ORDER_SUBMITTED_TO_COURIER: {
          await turso.execute({
            sql: `UPDATE user_order SET courier_id = ? WHERE order_code = ?`,
            args: [body.courierId, orderCode],
          });
          if (body?.trackingCodes && body.trackingCodes.length > 0) {
            const trackingCode = body.trackingCodes[0].trackingNumber;
            const trackingUrl = body.trackingCodes[0].trackingUrl;
            await turso.execute({
              sql: `UPDATE user_order SET tracking_code = ?, tracking_url = ? WHERE order_code = ?`,
              args: [trackingCode, trackingUrl, orderCode],
            });
          }
        }
        case WebhookTriggerCodeEnum.ORDER_TRACKING_READY_TRIGGER: {
          await turso.execute({
            sql: `UPDATE user_order SET courier_id = ? WHERE order_code = ?`,
            args: [body.courierId, orderCode],
          });
          if (body?.trackingCodes && body.trackingCodes.length > 0) {
            const trackingCode = body.trackingCodes[0].trackingNumber;
            const trackingUrl = body.trackingCodes[0].trackingUrl;
            await turso.execute({
              sql: `UPDATE user_order SET tracking_code = ?, tracking_url = ? WHERE order_code = ?`,
              args: [trackingCode, trackingUrl, orderCode],
            });
          }
        }
        case WebhookTriggerCodeEnum.ORDER_WAS_CANCELLED: {
          await turso.execute({
            sql: `UPDATE user_order SET status=?  WHERE order_code = ?`,
            args: ["CANCELLED", orderCode],
          });
        }
      }
    }
    return Response.json({
      message: "Webhook successfully processed",
      data: {},
    });
  } catch (e) {
    return Response.json({
      messgae: "Webhook processing unsuccessful",
      data: {},
      // @ts-ignore-next-line
      error: e["message"],
    });
  }
}
