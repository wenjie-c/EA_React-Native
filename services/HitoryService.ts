// Copy paste desde https://github.com/wenjie-c/EA-React/blob/main/src/services/historialService.ts

export class Event {
  key: number = NaN;
  where: string = "";
  args: string = "";
  public constructor(where: string, eventArgs: string) {
    this.where = where;
    this.args = eventArgs;
  }
}

class HistoryService {
  private static _instance: HistoryService;
  counter: number = 0;
  private events: Event[] = [];

  private constructor() {
    //...
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  public add(event: Event) {
    event.key = this.counter;
    this.counter++;
    this.events.push(event);
  }

  public remove(event: Event) {
    this.events = this.events.filter((e) => e.key != event.key);
  }

  public clear() {
    while (this.events.length !== 0) this.events.pop();
  }

  // Asegura la inmutabilidad
  public getList(): Event[] {
    return this.events;
  }
}

const HistoryServiceInstance = HistoryService.Instance;

export default HistoryServiceInstance;
