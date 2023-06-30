import React from 'react';
import "./CampaignList.css"
import CampaignCard from "../SubComponents/CampaignCard/CampaignCard";

const CampaignList: React.FC<{ data: Array<any>, handleItemClick: any }> = ({data, handleItemClick}) => {
    return <div className="campaign-list-container">
        {data.map((item, key) => <CampaignCard key={key} id={item.id} budget={item.Budget} endDate={item.endDate}
                                               name={item.name} startDate={item.startDate}
                                               handleItemClick={() => handleItemClick(item.id)}/>)}
    </div>;

}

export default CampaignList;
