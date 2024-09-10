export class HttpException extends Error {
  private code: number;
  private details: object = {};

  constructor(message: string, code: number, details?: object) {
    super(message);
    this.code = code;
    if (details) this.details = details;
  }

  getHttpResponse() {
    return Response.json(
      { name: this.message, message: super.message, details: this.details },
      { status: this.code },
    );
  }
}
