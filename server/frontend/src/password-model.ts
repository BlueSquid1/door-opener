type Listener<T> = (newValue: T, oldValue: T) => void;

class ObservableProperty<T> {
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
    console.log(newValue);
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



export class PasswordModel {
    private _password: ObservableProperty<string> = new ObservableProperty("");
    private _satificatory: ObservableProperty<boolean> = new  ObservableProperty(false);

    get password(): string {
        return this._password.value;
    }
    set password(newValue: string) {
        this._password.value = newValue;
    }
    onPasswordChange(listener: Listener<string>) {
        this._password.subscribe(listener);
    }
    get satificatory(): boolean {
        return this._satificatory.value;
    }
    set satificatory(newValue: boolean) {
        this._satificatory.value = newValue;
    }
}