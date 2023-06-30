import React from "react";
import "./TextInput.css";

const TextInput: React.FC<{
    value: string,
    placeHolder: string,
    name: string,
    inputClass: string,
    readOnly: boolean,
    handleChange: any
}> = ({
          value,
          placeHolder,
          name,
          inputClass = "",
          handleChange,
          readOnly
      }) => {
    return (
        <input name={name} readOnly={readOnly} className={`input-border ${inputClass}`} type={"text"}
               placeholder={placeHolder} value={value} onChange={(e) => handleChange(e)}/>
    );
}

export default TextInput;
