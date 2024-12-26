import { NextRequest, NextResponse } from "next/server";
import { cancelOrderFromEuroSender } from "@/utils/euro_sender";
import { cancelRevolutOrder } from "@/utils/revolut";
import { prisma } from "@/utils/prisma";

interface RevolutWebhookBodyInterface {
  event: "ORDER_PAYMENT_FAILED" | "ORDER_PAYMENT_DECLINED";
  order_id: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RevolutWebhookBodyInterface =
      (await req.json()) as RevolutWebhookBodyInterface;
    const order = await prisma.userOrder.findFirst({
      where: {
        revolut_order_id: body.order_id,
      },
    });
    if (!order || !order.order_code) return NextResponse.json(false);
    await cancelOrderFromEuroSender(order.order_code!);
    await cancelRevolutOrder(order.revolut_order_id!);
    await prisma.userOrder.update({
      where: {
        order_id: order.order_id,
      },
      data: {
        status: "PAYMENT_FAILED",
      },
    });
    return NextResponse.json(
      {
        processed: true,
      },
      {
        status: 200,
      }
    );
  } catch (e) {}
}
