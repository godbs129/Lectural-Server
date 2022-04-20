export class Response {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }

  public static ok(message: string) {
    return new Response(200, message);
  }
}
