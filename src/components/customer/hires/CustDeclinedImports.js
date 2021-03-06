import React from 'react'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'

// List of import declined hires with sorting and filtering
const DeclinedImports = ({declinedImportHires, history}) => {
    if (!declinedImportHires.length) return <div><br/><br/><h3>No Declined Imports</h3><br/></div>

    const columns = [
        { title: "Type", field: "containerType", width: 75, align: "center"},
        { title: "Pickup Date", field: "pickupDatetime", headerFilter:"input"},
        { title: "Pickup City", field: "containerPickupCity", headerFilter:"input", width: 150},
        { title: "Cargo Type", field: "cargoType", headerFilter:"input", width: 150},
        { title: "Vessel Arrival Date", field: "vesselArrivalDatetime", headerFilter:"input"},
        { title: "Destination City", field: "destinationCity", headerFilter:"input", width: 150},
        {title:"Status",align: "center", field:"hireStatus", formatter:"traffic", formatterParams:{
                color:["red"],
            }}
    ];

    var data = []

    {declinedImportHires && declinedImportHires.map(imp =>{
            data.push({
                id: imp.id,
                containerType: imp.containerType,
                pickupDatetime: moment(imp.pickupDatetime).format('MMM Do YYYY, h:mm:ss a'),
                containerPickupCity: imp.containerPickupCity,
                cargoType: imp.cargoType,
                vesselArrivalDatetime: moment(imp.vesselArrivalDatetime).format('MMM Do YYYY, h:mm:ss a'),
                destinationCity: imp.destinationCity,
                hireStatus: imp.hireStatus === "declined" ? 1 : 2
            })
        }
    )}

    var rowClick = (e, row) => {
        let path = '/User/UserManageTools/' + row.getData().id;
        history.push(path)
    };

    return(
        <div>
            <br/><br/>
            <ReactTabulator
                data={data}
                columns={columns}
                tooltips={true}
                layout={"fitData"}
                rowClick={rowClick}
                options={{ pagination: 'local',paginationSize: 5}}
            />
        </div>
    )
}




export default DeclinedImports
