import React from 'react';
import "./CampaignTable.css"

const CampaignTable: React.FC<{ data: Array<any>,handleItemClick:any }> = ({data,handleItemClick}) => {
    return <div className="table-container">
        <table>
            <thead>
            <tr>
                {
                    Object.keys(data[0]).map((data, key) => {
                        return <th key={key}>{data.toUpperCase()}</th>
                    })
                }
            </tr>
            </thead>
            <tbody>
            {
                data.map((item, key) => {
                    return <tr key={key} onClick={()=>handleItemClick(item.id)}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.startDate}</td>
                        <td>{item.endDate}</td>
                        <td>{item.Budget}</td>
                    </tr>
                })

            }
            </tbody>
        </table>
    </div>

}

export default CampaignTable;
