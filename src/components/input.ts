interface IcustomInputPropsType {
  inputType: string;
  className: string;
  id: string;
  // value ?: string;
}

// const defaultProps = {
//   inputType: "text",
//   className: "",
//   id: "",
//   // value : ""
// };

export const customInput = ({
  inputType = 'text',
  className,
  id,
}: IcustomInputPropsType): HTMLElement => {
  const input = document.createElement('input');
  input.type = inputType;
  input.className = className;
  input.id = id;
  // input.value = value;

  return input;
};

// const createInput = (label: string, placeholder: string): HTMLDivElement => {
//     const inputDiv = document.createElement('div') as HTMLDivElement
//     inputDiv.classList.add('inputDiv')

//     const inputLabel = document.createElement('label') as HTMLLabelElement
//     inputLabel.textContent = label

//     const input = document.createElement('input') as HTMLInputElement
//     input.placeholder = placeholder

//     inputDiv.append(inputLabel, input)

//     return inputDiv;
// }

// export {createInput}
