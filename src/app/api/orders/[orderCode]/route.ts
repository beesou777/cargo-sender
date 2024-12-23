import { HttpException } from '@/utils/errors';
import { cancelOrderFromEuroSender, getSingleOrderFromEuroSender } from '@/utils/euro_sender';
import { getUser } from '@/utils/firebase';
import { getRevolutPayment } from '@/utils/revolut';
import { prisma } from '@/utils/prisma';
import { NextRequest } from 'next/server';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

async function getSingleOrder(uid: string | null, orderCode: string) {
  try {
    const result = await prisma.userOrder.findFirst({
      where: { order_code: orderCode, uid: uid ?? undefined },
    });
    if (!result) throw new HttpException(`Order doesn't belong to you or not found`, 403);
    const singleOrder = await getSingleOrderFromEuroSender(orderCode);
    return {
      ...result,
      order: singleOrder,
      payment: result.revolut_order_id ? await getRevolutPayment(result.revolut_order_id!) : null,
    };
  } catch (e: any) {
    if (!(e instanceof HttpException)) throw new HttpException(e.message, 500, { original: e.toString() });
    throw e;
  }
}

export async function GET(req: NextRequest, { params }: { params: { orderCode: string } }) {
  try {
    const anon = req.nextUrl.searchParams.get('anon');
    const orderCode = params.orderCode;
    const user = anon === 'true' ? null : await getUser(req);
    console.log('anon:', anon, 'orderCode:', orderCode);
    if (!orderCode)
      return Response.json({
        message: 'Invalid data - orderCode is required',
      });
    const { order, payment } = await getSingleOrder(user?.uid ?? null, orderCode);
    return Response.json({
      message: 'Order fetched succesfully',
      details: {
        ...order,
        revolutPayment: payment,
      },
    });
  } catch (e) {
    if (e instanceof HttpException) {
      console.log(e);
      return e.getHttpResponse();
    }
    throw e;
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { orderCode: string } }) {
  try {
    const orderCode = params.orderCode;
    const user = await getUser(req);
    if (!user.isAdmin)
      return NextResponse.json(
        {
          message: 'You are not an admin',
        },
        {
          status: 403,
        },
      );
    if (!orderCode)
      return Response.json({
        message: 'Invalid data - orderCode is required',
      });
    const { order } = await getSingleOrder(user.uid, orderCode);
    const deleted = await cancelOrderFromEuroSender(orderCode);

    if (!deleted)
      return Response.json(
        {
          message: 'Order deletion failed',
        },
        {
          status: 500,
        },
      );

    return Response.json({
      message: 'Order cancelled succesfully',
      details: {
        ...order,
      },
    });
  } catch (e) {
    if (e instanceof HttpException) {
      return e.getHttpResponse();
    }
    if (e instanceof AxiosError) {
      const err = new HttpException('Order validation error', 400, {
        cargoSenderHttpStatus: e?.response?.status,
        cargoSenderError: e?.response?.data,
      });
      return err.getHttpResponse();
    }

    throw e;
  }
}
export async function HEAD(request: Request) {}
