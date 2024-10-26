import { HttpException } from "@/utils/errors";
import { getUser } from "@/utils/firebase";
import { turso } from "@/utils/turso";
import { getQueryParams } from "@/utils/url_utils";
import { zodToError } from "@/utils/zod_error_handler";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    const query = getQueryParams(req);
    const userSearch = query?.userEmail;
    const user = await getUser(req);
    const orders = await turso.execute({
      sql: `SELECT * FROM user_orders`,
      args: [],
    });
    return Response.json({
      message: "Successfully got orders data",
      data: orders.rows,
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json({ ...zodToError(e) });
    }
    if (e instanceof HttpException) {
      return e.getHttpResponse();
    }
    throw e;
  }
}
