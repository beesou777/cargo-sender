import { WEBHOOK_ORDER_NOT_FOUND, insertLog } from "@/utils/logging";
import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

enum WebhookTriggerCodeEnum {
  LABELS_READY = "1",
  ORDER_SUBMITTED_TO_COURIER = "2",
  ORDER_TRACKING_READY_TRIGGER = "3",
  ORDER_WAS_CANCELLED = "4",
  ORDER_DELIVERY_STATUS_UPDATED = "5",
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

export async function GET(req: NextRequest) {
  const systemLogs = await prisma.systemLog.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
  let data = `All of the system logs related to webhook \n`;
  data += JSON.stringify(systemLogs, null, 2);
  return new NextResponse(data, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body: WebhookBodyInterface = await req.json();
    const bodyTriggerId = `${body["triggerId"]}` as "1" | "2" | "3" | "4" | "5";
    const orderCode = body.orderCode;
    const order = await prisma.userOrder.findFirst({
      where: {
        order_code: orderCode,
      },
    });
    const latestWebhookEvent = req.headers.get("Webhook-Event");
    await insertLog(
      `${latestWebhookEvent} fired for ${orderCode} at ${new Date().toISOString()}`,
    );
    if (!order) {
      await insertLog(`${WEBHOOK_ORDER_NOT_FOUND}: ${orderCode} was not found`);
    } else if (!latestWebhookEvent) {
      await insertLog(`Webhook was fired without webhook event type`);
    } else {
      await prisma.userOrder.update({
        where: {
          order_id: order.order_id,
        },
        data: {
          latest_webhook_event: latestWebhookEvent,
        },
      });
      switch (bodyTriggerId) {
        case WebhookTriggerCodeEnum.LABELS_READY: {
          await prisma.userOrder.update({
            where: {
              order_id: order.order_id!,
            },
            data: {
              labels_ready: 1,
            },
          });
        }
        case WebhookTriggerCodeEnum.ORDER_SUBMITTED_TO_COURIER: {
          await prisma.userOrder.update({
            where: { order_code: orderCode },
            data: { courier_id: `${body.courierId}` },
          });

          if (body?.trackingCodes && body.trackingCodes.length > 0) {
            const { trackingNumber: trackingCode, trackingUrl } =
              body.trackingCodes[0];
            await prisma.userOrder.updateMany({
              where: { order_code: orderCode },
              data: {
                tracking_code: trackingCode,
                tracking_url: trackingUrl,
              },
            });
          }
        }
        case WebhookTriggerCodeEnum.ORDER_TRACKING_READY_TRIGGER: {
          await prisma.userOrder.update({
            where: { order_id: order.order_id },
            data: { courier_id: body.courierId.toString() },
          });

          if (body?.trackingCodes && body.trackingCodes.length > 0) {
            const { trackingNumber: trackingCode, trackingUrl } =
              body.trackingCodes[0];
            await prisma.userOrder.update({
              where: { order_id: order.order_id },
              data: {
                tracking_code: trackingCode,
                tracking_url: trackingUrl,
              },
            });
          }
        }
      }
    }
    return Response.json({
      message: "Webhook successfully processed",
      data: {},
    });
  } catch (e) {
    console.log(e);
    return Response.json({
      messgae: "Webhook processing unsuccessful",
      data: {},
      // @ts-ignore-next-line
      error: e["message"],
      originalError: e,
    });
  }
}
