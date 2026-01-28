// import { Button } from "./components/ui/Button"
import { Button } from './components/ui/Button';
// import { Input } from './components/ui/Input';
// import Input from "./components/ui/input"
// import "../styles/style.css"
import { Checkbox } from './components/ui/CheckBox';
import { Select } from './components/ui/Selects';

function App() {
  const optionss = [
    {
      value: 'hello1',
      text: 'hello1',
    },
    {
      value: 'hello2',
      text: 'hello2',
    },
    {
      value: 'hello3',
      text: 'hello3',
    },
    {
      value: 'hello4',
      text: 'hello4',
    },
  ];
  return (
    <div>
      <Button className="next_btn btn" text="click me" />
      <Checkbox
        className="checkbox_items"
        name="healthConcerns"
        id="healthConcerns"
        value="hello"
        labelText="hello"
      />
      <Select name="hell" id="hell" options={optionss} value="val" />
    </div>
  );
}

export default App;
