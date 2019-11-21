import Transport from 'winston-transport';

export class InMemoryWinstonTransport extends Transport {
  public logs: any[] = [];

  public log(info: any, callback: () => void) {
    this.logs.push(info);

    callback();
  }

  public clear() {
    this.logs = [];
  }
}
