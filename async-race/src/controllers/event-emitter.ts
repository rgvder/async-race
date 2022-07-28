import { BaseObject } from '../models/base.interface';

export default class EventEmitter {
  private events: Map<string, ((data: BaseObject) => void)[]> = new Map();

  private static instance: EventEmitter;

  public static init() {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new EventEmitter();
    }

    return EventEmitter.instance;
  }

  public on(name: string, listener: (data: BaseObject) => void): void {
    if (!this.events.has(name)) {
      this.events.set(name, []);
    }

    this.events.get(name)?.push(listener);
  }

  public removeListener(name: string, listenerToRemove: () => void): void {
    if (!this.events.has(name)) {
      return;
    }

    this.events.set(name, (this.events.get(name) ?? [])
      .filter((listener: (data: BaseObject) => void) => listener !== listenerToRemove));
  }

  public emit(name: string, data: BaseObject): void {
    if (!this.events.has(name)) {
      return;
    }

    this.events.get(name)?.forEach((callback: (data: BaseObject) => void) => callback(data));
  }
}
