import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import data from "../countryCodes";

const DropdownComponent = () => {
  const [value, setValue] = useState("+93");
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      selectedTextProps={{ numberOfLines: 1 }}
      style={{ width: 80 }}
      containerStyle={{ width: 350 }}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
        setIsFocus(false);
      }}
    />
  );
};

export default DropdownComponent;
