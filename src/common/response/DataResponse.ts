import Response from './response';

export default class ResponseData<T> extends Response {
  data: T;

  constructor(status: number, message: string, data: T) {
    super(status, message);
    this.data = data;
  }

  public static dataOk<T>(message: string, data: T): ResponseData<T> {
    return new ResponseData(200, message, data);
  }
}
