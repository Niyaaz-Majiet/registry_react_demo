import React, {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import TextInputWithLabel from "../../components/SubComponents/TextInputWithLabel/TextInputWithLabel";
import {CAMPAIGN, getLocalStorageObject, setLocalStorageObject} from "../../Services/Util";
import "./CampaignDetails.css";

function CampaignDetails() {
    const navigate = useNavigate();
    const params = useParams();
    let id = Number(params.id) || 0;
    let initialData;

    if (id === 0) {
        initialData = {
            id: id,
            name: "",
            startDate: "",
            endDate: "",
            Budget: 0,
        }
    } else {
        initialData = getLocalStorageObject(CAMPAIGN).filter((ele: any) => ele.id === id);
        initialData = initialData[0];
    }

    const [data, updateDate] = useState(initialData);

    const getRandomUniqueIdentifier = () => {
        return Math.floor(Math.random() * 25);
    }

    const isBudgetValid = (budget: any) => {
        if(budget){
            const numbersOnlyRegex = RegExp('^\\d+$');

            const isValidNumber = budget.charAt(0) !== '0';

            if(!isValidNumber){
                return false;
            }

            return numbersOnlyRegex.test(budget) ;
        }else{
            return false;
        }

    }

    const isFormValid = (budget:any) => {
       const isBudgetCorrect = isBudgetValid(budget);

        return data.name.length > 0 && data.startDate.length > 0 && data.endDate.length > 0 && data.Budget > 0 && isBudgetCorrect;
    }

    const checkDatesValid = (date: string) => {
        const regex = new RegExp("\\d{1,2}\\/\\d{1,2}\\/\\d{2,4}");
        const isDateValid = regex.test(date);

        if (isDateValid) {
            const dateArr = date.split("/");

            if (Number(dateArr[0]) > 12) {
                return false;
            }

            if (Number(dateArr[1]) > 31) {
                return false;
            }

            return !(dateArr[2].length !== 4);
        } else {
            return false;
        }
    }


    const handleUpsert = (data: any) => {
        let campaignData = getLocalStorageObject(CAMPAIGN);
        let isValid = isFormValid(data.Budget);
        if (isValid) {
            const isStartValid = checkDatesValid(data.startDate);
            const isEndValid = checkDatesValid(data.endDate);

            if(isStartValid && isEndValid){
                if (data.id === 0) {
                    let isUnique = false;

                    do {
                        let newId = getRandomUniqueIdentifier();
                        if (!(campaignData.some((e: any) => e.id === newId))) {
                            data.id = newId;
                            isUnique = true;
                        }
                    } while (!isUnique)

                    data.Budget = Number(data.Budget);
                    campaignData.push(data);
                } else {
                    let foundIndex = campaignData.findIndex((x: any) => x.id === id);
                    let tempData = campaignData[foundIndex];

                    tempData.Budget = Number(data.Budget);
                    campaignData.push(tempData);
                }

                updateDate([...campaignData]);
                setLocalStorageObject(CAMPAIGN, campaignData);
            }else{
                alert("Invalid Date Format. Must be 'MM/DD/YYYY'");
            }
        } else {
            alert("Missing or Invalid data. Please update your data and try again.")
        }
        navigate("/");
    }

    const handleDelete = (id: number) => {
        let campaignData = getLocalStorageObject(CAMPAIGN);

        campaignData = campaignData.filter((ele: any) => ele.id !== id);

        updateDate([...campaignData]);
        setLocalStorageObject(CAMPAIGN, campaignData);
        navigate("/");
    }

    const updateFormData = (event: any, name: string) => {
        updateDate({
            ...data,
            [name]: event.target.value
        })
    }

    return (
        <div className="campaign-details-container">
            <h1>{(id === null || id === 0) ? "Add Campaign" : "Update Campaign"}</h1>
            {
                id !== 0 && <TextInputWithLabel
                    name={data.id}
                    title={"ID :"}
                    value={data.id}
                    placeHolder={data.id}
                    handleChange={(e: any) => {
                    }}
                    inputClass={""}
                    readOnly={true}
                />
            }
            <TextInputWithLabel
                name={data.name}
                title={"NAME :"}
                value={data.name}
                placeHolder={data.name}
                handleChange={(e: any) => updateFormData(e, 'name')}
                inputClass={""}
                readOnly={false}
            />
            <TextInputWithLabel
                name={data.startDate}
                title={"Start Date (MM/DD/YYY) :"}
                value={data.startDate}
                placeHolder={data.startDate}
                handleChange={(e: any) => updateFormData(e, 'startDate')}
                inputClass={""}
                readOnly={false}
            />
            {
                data.startDate?.length > 0 && <label className={`error-message ${checkDatesValid(data.startDate) ? "": "show"}`}>Invalid Format must match MM/DD/YYYY.</label>
            }
            <TextInputWithLabel
                name={data.endDate}
                title={"End Date (MM/DD/YYY) :"}
                value={data.endDate}
                placeHolder={data.endDate}
                handleChange={(e: any) => updateFormData(e, 'endDate')}
                inputClass={""}
                readOnly={false}
            />
            {
                data.endDate?.length > 0 && <label className={`error-message ${checkDatesValid(data.endDate) ? "": "show"}`}>Invalid Format must match MM/DD/YYYY.</label>
            }
            <TextInputWithLabel
                name={data.Budget}
                title={"Budget :"}
                value={data.Budget}
                placeHolder={data.Budget}
                handleChange={(e: any) => updateFormData(e, 'Budget')}
                inputClass={""}
                readOnly={false}
            />
            {
                data.Budget?.length > 0 && <label className={`error-message ${isBudgetValid(data.Budget) ? "": "show"}`}>Invalid Number.</label>
            }

            <button onClick={() => handleUpsert(data)}>{id !== 0 ? "Update" : "Add"}</button>
            {
                id !== 0 && <button onClick={() => handleDelete(id)}>Delete Campaign</button>
            }
        </div>
    );
}

export default CampaignDetails;
