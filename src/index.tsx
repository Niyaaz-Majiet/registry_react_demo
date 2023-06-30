import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import CampaignDetails from "./pages/CampaignDetails/CampaignDetails";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import './index.css';
import {
    CAMPAIGN,
    DEFAULT_CAMPAIGNS,
    setLocalStorageObject
} from "./Services/Util";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

if (localStorage.getItem(CAMPAIGN) === null) {
    setLocalStorageObject(CAMPAIGN,DEFAULT_CAMPAIGNS);
}

root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Home/>}/>
            <Route path="campaign/:id" element={<CampaignDetails/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </BrowserRouter>
);
