import { ObservableProperty } from './Listener';



export class PasswordModel {
    public password: ObservableProperty<string> = new ObservableProperty("abc");
    public satificatory: ObservableProperty<boolean | null> = new  ObservableProperty(null);
    public hintText: ObservableProperty<string> = new ObservableProperty("");
}