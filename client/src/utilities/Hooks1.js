import { useState } from "react";

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onBlur: event => {
        setValue(event.target.value);
      },
      onChange: event => {
        setValue(event.target.value);
      }
    }
  };
};
