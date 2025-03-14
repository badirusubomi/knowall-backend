export class QueueServiceFactory {
  public getQueue() {
    const queueServiceChoice = process.env.QUEUE_URL;
    switch (queueServiceChoice) {
      case 'kafka':
        return true;

      default:
        return false;
    }
  }
}
