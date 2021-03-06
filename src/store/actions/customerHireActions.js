// Add Import hire from the authenticated customer account

export const addImportHires = (importHire) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const state= getState();
        const auth= state.firebase.auth;
        firestore.collection('hires').add({
            containerType: importHire.containerType,
            containerPickupAddressLine1: importHire.containerPickupAddressLine1,
            containerPickupAddressLine2: importHire.containerPickupAddressLine2,
            containerPickupCity: importHire.containerPickupCity,
            pickupDatetime: importHire.pickupDatetime,
            cargoType: importHire.cargoType,
            netWeight: importHire.netWeight,
            unloadingPort: importHire.unloadingPort,
            unloadingTerminal: importHire.unloadingTerminal,
            vessel: importHire.vessel,
            vesselArrivalDatetime: importHire.vesselArrivalDatetime,
            destinationAddressLine1: importHire.destinationAddressLine1,
            destinationAddressLine2: importHire.destinationAddressLine2,
            destinationCity: importHire.destinationCity,
            customerId: auth.uid,
            customerName: importHire.customerName,
            remarks: importHire.remarks,
            hireType: 'import',
            hireStatus: 'request',
            createAt: new Date(),
            timeline: {
                truckDispatched: {
                    set:0,
                    val: 'truckDispatched',
                    id: 1,
                    bg: '#f66f6',
                    img: 'https://img.icons8.com/color/48/000000/interstate-truck.png',
                    title: 'Truck Dispatched',
                },
                atCargoLocation: {
                    set:0,
                    val: 'atCargoLocation',
                    id: 2,
                    bg: '#f66f6',
                    img: 'https://img.icons8.com/color/48/000000/cargo-ship.png',
                    title: 'At Cargo Location',
                },
                cargoLoaded: {
                    set:0,
                    val: 'cargoLoaded',
                    id: 3,
                    bg: '#f66f6',
                    img: 'https://img.icons8.com/color/48/000000/container-truck.png',
                    title: 'Cargo Loaded',
                },
                inTransit: {
                    set:0,
                    val: 'inTransit',
                    id: 4,
                    bg: '#f66f6',
                    img: 'https://img.icons8.com/color/48/000000/in-transit.png',
                    title: 'In Transit',
                },
                destinationReached: {
                    set:0,
                    val: 'destinationReached',
                    id: 5,
                    bg: '#f66f6',
                    img: 'https://img.icons8.com/color/48/000000/fork-lift.png',
                    title: 'Destination Reached',
                },
                hireCompleted: {
                    set:0,
                    val: 'hireCompleted',
                    id: 6,
                    bg: '#f66f6',
                    img: 'hhttps://img.icons8.com/color/48/000000/checked-truck.png',
                    title: 'Hire Completed',
                },
            }

        }).then(() => {
            dispatch({type: 'ADD_IMPORT', importHire});
        }).catch((err) => {
            dispatch({type: 'ADD_IMPORT_ERROR', err});
        })

    }
};

// Add Export hire from the authenticated customer account
export const addExportHires = (exportHire) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const state= getState();
        const auth= state.firebase.auth;
        firestore.collection('hires').add({
            containerType: exportHire.containerType,
            containerPickupAddressLine1: exportHire.containerPickupAddressLine1,
            containerPickupAddressLine2: exportHire.containerPickupAddressLine2,
            containerPickupCity: exportHire.containerPickupCity,
            pickupDatetime: exportHire.pickupDatetime,
            cargoLocationAddressLine1: exportHire.cargoLocationAddressLine1,
            cargoLocationAddressLine2: exportHire.cargoLocationAddressLine2,
            cargoLocationCity: exportHire.cargoLocationCity,
            cargoType: exportHire.cargoType,
            netWeight: exportHire.netWeight,
            loadingPort: exportHire.loadingPort,
            loadingTerminal: exportHire.loadingTerminal,
            vessel: exportHire.vessel,
            loadingDatetime: exportHire.loadingDatetime,
            customerId: auth.uid,
            customerName: exportHire.customerName,
            remarks: exportHire.remarks,
            hireType: 'export',
            hireStatus: 'request',
            createAt: new Date(),
            timeline:{
                truckDispatched: {
                    set:0,
                    val: 'truckDispatched',
                    id: 1,
                    bg: '#f66f6',
                    img: 'https://img.icons8.com/color/48/000000/interstate-truck.png',
                    title: 'Truck Dispatched',
                },
                atContainerLocation: {
                    set:0,
                    val: 'atContainerLocation',
                    id: 2,
                    bg: '#f66f6',
                    img: 'https://img.icons8.com/color/48/000000/shipping-container.png',
                    title: 'At Container Location',
                },
                inTransit: {
                    set:0,
                    val: 'inTransit',
                    id: 3,
                    bg: '#f66f6',
                    img: 'https://img.icons8.com/color/48/000000/in-transit.png',
                    title: 'In Transit',
                },
                cargoLoaded: {
                    set:0,
                    val: 'cargoLoaded',
                    id: 4,
                    bg: '#f66f6',
                    img: 'https://img.icons8.com/color/48/000000/container-truck.png',
                    title: 'Cargo Loaded',
                },
                inTransit2: {
                    set:0,
                    val: 'inTransit2',
                    id: 5,
                    bg: '#f66f6',
                    img: 'https://img.icons8.com/color/48/000000/in-transit.png',
                    title: 'In Transit',
                },
                portReached: {
                    set:0,
                    val:'portReached',
                    id: 6,
                    bg: '#f66f6',
                    img: 'https://img.icons8.com/color/48/000000/cargo-ship.png',
                    title: 'Port Reached',
                },
                hireCompleted: {
                    set:0,
                    val: 'hireCompleted',
                    id: 7,
                    bg: '#f66f6',
                    img: 'https://img.icons8.com/color/48/000000/checked-truck.png',
                    title: 'Hire Completed',
                },
            }
        }).then(() => {
            dispatch({type: 'ADD_EXPORT', exportHire});
        }).catch((err) => {
            dispatch({type: 'ADD_EXPORT_ERROR', err});
        })

    }
};

//Customer can decline requested hires
// Hire status is changed to declined when customer declines a hire request
export const declineHireRequests = (id) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('hires').doc(id).update({
            hireStatus: 'declined'
        }).then(() => {
            dispatch({type: 'HIRE_REQUEST_DECLINED'});
        }).catch((err) => {
            dispatch({type: 'ERROR_DECLINING_HIRE_REQUEST', err})
        })
    }
};

//Customer can update requested hires
export const updateRequest = (id,data,hireRequest) => {

    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection(hireRequest).doc(id).update({
            ...data
        }).then(() => {
            dispatch({type: 'DOCUMENT_UPDATED'});
        }).catch((err) => {
            dispatch({type: 'ERROR_UPDATING_DOCUMENT', err});
        })
    }
};

