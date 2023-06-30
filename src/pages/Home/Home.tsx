import React, {useEffect, useState} from 'react';
import {CAMPAIGN, getLocalStorageObject} from "../../Services/Util";
import {useNavigate} from "react-router-dom";
import CampaignTable from "../../components/CampaignTable/CampaignTable";
import CampaignList from "../../components/CampaignList/CampaignList";

import "./Home.css";
import TextInputWithLabel from "../../components/SubComponents/TextInputWithLabel/TextInputWithLabel";

function Home() {
    const navigate = useNavigate();
    const [isMobile, setMobile] = useState(window.innerWidth < 600);
    const [campaignData, updateCampaignData] = useState(getLocalStorageObject(CAMPAIGN));
    const [searchItem, updateSearchItem] = useState("");

    const handleWindowSizeChange = () => {
        setMobile(window.innerWidth < 600);
    }

    const handleItemClick = (id: number) => {
        navigate(`campaign/${id}`);
    }

    const handleSearchItemUpdate = (event: any) => {
        updateSearchItem(event.target.value);
        if (event.target.value.length > 0) {
            const itemsMatched = campaignData.filter(
                (data: any) =>
                    data.name.toString().toLowerCase().includes(event.target.value.toString().toLowerCase())
            );

            if (itemsMatched.length > 0) {
                updateCampaignData(itemsMatched);
            } else {
                alert("No Items Matching Search");
            }
        } else {
            updateCampaignData(getLocalStorageObject(CAMPAIGN));
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (
        <div className="home-container">
            <h1 className="header-text">Current Listed Campaigns</h1>
            <div className="search-bar">
                <TextInputWithLabel value={searchItem} title={"Search By Name"} placeHolder={""} name={"search"}
                                    inputClass={"search-input"} readOnly={false}
                                    handleChange={(e: any) => handleSearchItemUpdate(e)}/>
            </div>
            {
                isMobile ?
                    <CampaignList data={campaignData} handleItemClick={(id: number) => handleItemClick(id)}/> :
                    <CampaignTable data={campaignData} handleItemClick={(id: number) => handleItemClick(id)}/>
            }
            <button onClick={() => {
                navigate(`campaign/null`);
            }
            }>+
            </button>
        </div>
    );
}

export default Home;
