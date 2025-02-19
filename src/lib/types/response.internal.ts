export class IResponse {
  constructor(message: string, meta?: any) {}

  get message() {
    return this.message;
  }

  get meta() {
    return this.meta;
  }

  success(message: string, meta?: any) {
    return { message, meta };
  }
}
