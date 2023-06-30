import React from 'react';
import "./CampaignCard.css";
import TextInputWithLabel from "../TextInputWithLabel/TextInputWithLabel";

const CampaignCard: React.FC<{ id:number,name:string,startDate:string,endDate:string,budget:number,handleItemClick:any }> = ({id,name,startDate,endDate,budget,handleItemClick}) => {
    return <div className="campaign-card-container" onClick={()=> handleItemClick(id)}>
        <TextInputWithLabel
        name={id.toString()}
        title={"ID :"}
        value={id.toString()}
        placeHolder={id.toString()}
        readOnly={true}
        handleChange={()=>{}}
        inputClass={""}
        />
        <TextInputWithLabel
            name={name}
            title={"NAME :"}
            value={name}
            placeHolder={name}
            readOnly={true}
            handleChange={()=>{}}
            inputClass={""}
        />
        <TextInputWithLabel
            name={startDate}
            title={"Start Date (MM/DD/YYYY) :"}
            value={startDate}
            placeHolder={startDate}
            readOnly={true}
            handleChange={()=>{}}
            inputClass={""}
        />
        <TextInputWithLabel
            name={endDate}
            title={"End Date (MM/DD/YYYY) :"}
            value={endDate}
            placeHolder={endDate}
            readOnly={true}
            handleChange={()=>{}}
            inputClass={""}
        />
        <TextInputWithLabel
            name={budget.toString()}
            title={"Budget :"}
            value={budget.toString()}
            placeHolder={budget.toString()}
            readOnly={true}
            handleChange={()=>{}}
            inputClass={""}
        />
    </div>;

}

export default CampaignCard;
