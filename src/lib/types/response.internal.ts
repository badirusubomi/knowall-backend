export class IResponse {
  constructor(message: string, meta?: any) {}

  success(message: string, meta?: any) {
    return { message, meta };
  }
}
