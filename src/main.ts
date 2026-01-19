import './style.css';
import { customInput } from './components/input';

// let input = customInput({inputType : "checkbox",className : "something",id : "some"})
const primeContainer = document.createElement('div') as HTMLDivElement;
primeContainer.appendChild(
  customInput({ inputType: 'checkbox', className: 'something', id: 'some' }),
);

// app?.appendChild(primeContainer)
