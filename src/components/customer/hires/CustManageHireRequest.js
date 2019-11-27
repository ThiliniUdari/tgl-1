import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {Redirect} from 'react-router-dom'
import {declineHireRequests} from '../../../store/actions/customerHireActions'
import {Link} from "react-router-dom";

class ManageHireRequest extends Component {
    state = {
        // driverId: '',
        // driverName: '',
        // vehicleId: '',
        // vehicleNo: '',
        // remarks: '',
        loading: 1,
        // freeDrivers: '',
        redir: 0
    }

    // handleChange = (e) => {
    //     this.setState({
    //         [e.target.id]: e.target.value
    //     })
    // }
    //
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.acceptHireRequest(this.props.hire[0].id, this.state)
    //     this.setState({
    //         redir : 1
    //     })
    // }

    declineHire = (e) => {
        e.preventDefault();
        this.props.declineHireRequests(this.props.hire[0].id, this.state)
        this.setState({
            redir : 1
        })
    }

    componentWillReceiveProps(nextProps) {

        if(this.props.drivers && this.props.hires){
            this.setState({
                ...nextProps,
                loading: 0,
            });
        }

    }

    render() {

        if(this.state.redir === 1){
            return <Redirect to='/User/UserManageTools' />
        }
        return (
            this.state.loading === 1 ? (
                    <div className="center"><br/><br/><br/><br/><br/><br/><br/><br/><h1>Loading...</h1></div>
                ) :
                <div>
                    <br/><br/><br/><br/><br/>
                    <h1 className="center add_head">Hire <span className="topic">Request</span></h1><hr className="bg-dark mb-4 w-25"/><br/><br/>

                    <div className="container">
                        <div className="col-4" style={{padding: '20px'}}>
                            <h6><b className='blue-text'>Hire Type: </b> {this.props.hire[0].hireType.toUpperCase()}</h6>
                        </div>
                        <div className="col-4" style={{padding: '20px'}}>
                            <h6><b className='blue-text'>Container Type: </b> {this.props.hire[0].containerType}ft</h6>
                        </div>
                        <br/><hr/><h5 className="center">Container Pickup Details</h5> <br/>
                        <div className="row" style={{padding: '20px'}}>
                            <div className="col-6">
                                <h6><b className='blue-text right-aligned'>Container Pickup Location: </b> {this.props.hire[0].pickupLocation}</h6>
                            </div>
                            <div className="col-6">
                                <h6 className="right"><b className='blue-text'>Container Pickup Date: </b> {moment(this.props.hire[0].pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                            </div>
                        </div>
                        <br/><hr/><h5 className="center">Cargo Details</h5> <br/>
                        <div className="row" style={{padding: '20px'}}>
                            <div className="col-6">
                                <h6><b className='blue-text'>Cargo Type: </b> {this.props.hire[0].cargoType}</h6>
                            </div>
                            <div className="col-6">
                                <h6 className="right"><b className='blue-text'>Cargo Weight: </b> {this.props.hire[0].weight}</h6>
                            </div>
                        </div>
                        {this.props.hire[0].hireType === "import" ?
                            <div>
                                <br/><hr/><h5 className="center">Unloading Details</h5><br/>
                                <div className="row" style={{padding: '20px'}}>
                                    <div className="col-6">
                                        <h6><b className='blue-text'>Unloading Port: </b> {this.props.hire[0].unloadingPort}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="right"><b className='blue-text center'>Vessel Arrival Date: </b> {moment(this.props.hire[0].vesselArrivalDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                                    </div>
                                </div>
                                <div className="row" style={{padding: '20px'}}>
                                    <div className="col-6">
                                        <h6><b className='blue-text'>Destination: </b> {this.props.hire[0].destination}</h6>
                                    </div>
                                </div>
                            </div> :
                            <div>
                                <br/><hr/><h5 className="center">Loading Details</h5><br/>
                                <div className="row" style={{padding: '20px'}}>
                                    <div className="col-6">
                                        <h6><b className='blue-text'>Loading Port: </b> {this.props.hire[0].loadingPort}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="right"><b className='blue-text'>Loading Date: </b> {this.props.hire[0].loadingDatetime}</h6>
                                    </div>
                                </div>
                            </div>
                        }
                        <br/><hr/><h5 className="center">Customer</h5><br/>
                        <div className="row" style={{padding: '20px'}}>
                            <div className="col-3">
                                <h6><b className='blue-text'>Name: </b> {this.props.hire[0].customerName}</h6>
                            </div>
                            <div className="col-3">
                                <h6><b className='blue-text'>Mobile: </b> {this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.mobile)[0]}</h6>
                            </div>
                            <div className="col-4">
                                <h6><b className='blue-text'>Email: </b> {this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.email)[0]}</h6>
                            </div>
                            <div className="col-2">
                                <h6><b className='blue-text'>NIC: </b> {this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.nic)[0]}</h6>
                            </div>
                        </div>
                        <br/><hr/><h5 className="center">Remarks</h5><br/>
                        <div className="input-field row col-12" style={{padding: '20px'}}>
                            <textarea placeholder="Remarks" value={this.state.hire[0].remarks} style={{ minHeight: 100 }} type="text" id="remarks" onChange={this.handleChange}/>
                        </div>
                        <br/><br/>
                    </div>

                    <div className="container">
                        <form onSubmit={this.handleSubmit} >

                            <div className="input-field center">
                                <Link to='/User/EditHireRequest'><button className="btn blue lighten-1 z-depth-5 btn1" type="submit">Edit</button></Link>
                                <button className="btn red lighten-1 z-depth-5 btn1" onClick={this.declineHire}>Delete</button>
                            </div>
                            <br/><br/>
                        </form>
                    </div>
                </div>
        )

    }
}

const mapStateToProps = (state) => {
    return{
        customer: state.firestore.ordered.customers,
        drivers: state.firestore.ordered.drivers,
        vehicles: state.firestore.ordered.vehicles,
        hires: state.firestore.ordered.hires
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        declineHireRequests: (id) => dispatch(declineHireRequests(id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        {collection: 'hires'},
        {collection: 'customers'},
        {collection: 'drivers'},
        {collection: 'vehicles'},
    ])
)(ManageHireRequest);



