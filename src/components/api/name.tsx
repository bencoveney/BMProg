import * as React from "react";

interface NameProps {
  name: string;
  id?: number;
  set: (name: string) => void;
}

const nonAlphanumeric = /[^a-z0-9]/ig;

export const Name: React.StatelessComponent<NameProps> = (
  props: NameProps,
) => {
  const changeHandler: React.ChangeEventHandler<any> = (
    event: React.ChangeEvent<any>,
  ) => {
    const rawValue: string = event.target.value;
    const cleanValue = rawValue.replace(nonAlphanumeric, "");
    props.set(cleanValue);
  };
  const identifier = props.id ? `Program #${props.id} ` : "";
  return (
    <label>
      {identifier}
      <input
        onChange={changeHandler}
        value={props.name}
      />
    </label>
  );
};
