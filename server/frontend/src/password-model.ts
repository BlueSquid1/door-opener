import { ObservableProperty } from './Listener';



export class PasswordModel {
    public password: ObservableProperty<string> = new ObservableProperty("");
    public satificatory: ObservableProperty<boolean | null> = new  ObservableProperty(null);
}