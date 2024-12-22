import { HttpException } from '@/utils/errors';
import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getQueryParams } from '@/utils/url_utils';

export async function GET(req: NextRequest) {
  try {
    const URL = 'https://sandbox.eurosender.com/api/v1/parcels/check_dimensions';

    const query = getQueryParams(req);

    try {
      const res = await axios.post(URL, {
        ...query,
      });
      return NextResponse.json({
        message: 'Dimensions checked succesfully',
        data: res.data,
      });
    } catch (e) {
      if (e instanceof AxiosError)
        throw new HttpException('Order validation error', 400, {
          cargoSenderHttpStatus: e?.response?.status,
          cargoSenderError: e?.response?.data,
        });
    }
  } catch (e) {
    if (e instanceof HttpException) {
      return e.getHttpResponse();
    }
    throw e;
  }
}
