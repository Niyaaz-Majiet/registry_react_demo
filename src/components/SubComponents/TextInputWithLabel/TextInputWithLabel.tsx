import React from "react";
import "./TextInputWithLabel.css"
import TextInput from "../TextInput/TextInput";

const TextInputWithLabel: React.FC<{
    value: string,
    title:string,
    placeHolder: string,
    name: string,
    inputClass: string,
    readOnly: boolean,
    handleChange: any
}>  = ({inputClass = "",name,title,placeHolder,value,handleChange,readOnly=false}) => {
    return (
        <div className={'input-wrapper'}>
            <label htmlFor={name} className={'input-label'} title={title}>{title}</label>
            <TextInput
            name={name}
            handleChange={(e:any)=>handleChange(e)}
            inputClass={inputClass}
            placeHolder={placeHolder}
            value={value}
            readOnly={readOnly}
            />
        </div>
    );
}

export default TextInputWithLabel;
