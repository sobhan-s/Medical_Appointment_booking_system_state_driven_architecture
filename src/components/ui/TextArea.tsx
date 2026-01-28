interface ITextAreaProps {
  name: string;
  id: string;
  placeHolder?: string;
  value?: string;
}

export const TextArea: React.FC<ITextAreaProps> = ({
  name,
  id,
  placeHolder,
  value,
}) => {
  return (
    <textarea
      name={name}
      id={id}
      placeholder={placeHolder}
      value={value}
    ></textarea>
  );
};
