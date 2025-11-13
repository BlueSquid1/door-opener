export type Listener<T> = (newValue: T, oldValue: T) => void;

export class ObservableProperty<T> {
  private _value: T;
  private listeners: Listener<T>[] = [];

  constructor(initialValue: T) {
    this._value = initialValue;
  }

  get value(): T {
    return this._value;
  }

  set value(newValue: T) {
    if (newValue === this._value) return;
    const oldValue = this._value;
    this._value = newValue;
    this.listeners.forEach(fn => fn(newValue, oldValue));
  }

  subscribe(fn: Listener<T>): void {
    this.listeners.push(fn);
  }

  unsubscribe(fn: Listener<T>): void {
    this.listeners = this.listeners.filter(f => f !== fn);
  }
}