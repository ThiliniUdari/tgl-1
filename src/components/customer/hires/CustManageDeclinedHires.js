import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {Link, Redirect} from 'react-router-dom'
import {acceptHireRequest} from '../../../store/actions/adminHireActions'
import {declineHireRequest} from '../../../store/actions/adminHireActions'
import {Spinner} from "react-activity";
import Card from "react-bootstrap/Card";

// declined hire page, A hire which is currently declined
class ManageDeclinedHires extends Component {
    state = {
        loading: 1,
        redir: 0
    }

    // handleChange = (e) => {
    //     this.setState({
    //         [e.target.id]: e.target.value
    //     })
    // }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.acceptHireRequest(this.props.hire[0].id, this.state)
    //     // console.log(this.state)
    //     this.setState({
    //         redir : 1
    //     })
    // }

    componentWillReceiveProps(nextProps) {

        if(this.props.drivers && this.props.hires){
            this.setState({
                ...nextProps, loading: 0,
                // remarks: this.props.hire[0].remarks
            });
        }

    }

    render() {

        if(this.state.redir === 1){
            return <Redirect to='/User/UserManageTools' />
        }
        return (
            this.state.loading === 1 ? (
                    <div className="text-center" style={{paddingTop:"400px"}}><Spinner color="#007bff" size={32} speed={1} animating={true} /></div>
                ) :

                    <div className="container-fluid managehire_form1 ">

                        <br/><br/><br/><br/><br/><br/><br/><br/>

                        <div className="container www fadeIn animated slow delay-1s">
                            <Card border="primary">
                                <Card.Body>
                                    <h1 className="center add_head"><span className="topic1">Declined</span> <span className="topic">Hire</span><hr className="bg-dark mb-4 w-25"/></h1><br/><br/>
                                    <Card border="primary" className="text-center">
                                        <Card.Body>
                                    <div className="row">
                                    <div className="col-6" style={{padding: '20px'}}>
                                        <h6 className="left"><b className='blue-text'>Hire Type: </b> {this.props.hire[0].hireType.toUpperCase()}</h6>
                                    </div>
                                    <div className="col-6" style={{padding: '20px'}}>
                                        <h6 className="left"><b className='blue-text'>Container Type: </b> {this.props.hire[0].containerType + " ft"}</h6>
                                    </div>
                                    </div>
                                        </Card.Body>
                                    </Card>
                                    <br/>
                                    {this.props.hire[0].hireType === "import" ?
                                        <div>
                                            <Card border="primary" className="text-center">
                                                <Card.Header color="blue"><h4>Container Pickup Details</h4></Card.Header>
                                                <Card.Body>
                                                    <h5>Pickup Date and Time</h5>
                                                    <div className="row" style={{paddingTop: '40px'}}>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text right-aligned'>Container Pickup Date: </b> {moment(this.props.hire[0].pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <h5>Location</h5>
                                                    <div className="row" style={{paddingTop: '40px'}}>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text right-aligned'>Address Line 1: </b> {this.props.hire[0].containerPickupAddressLine1}</h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text right-aligned'>Address Line 2: </b> {this.props.hire[0].containerPickupAddressLine2}</h6>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text right-aligned'>City: </b> {this.props.hire[0].containerPickupCity}</h6>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                            <br/>
                                            <Card border="primary" className="text-center">
                                                <Card.Header color="blue"><h4>Cargo Details</h4></Card.Header>
                                                <Card.Body>
                                                    <div className="row" style={{paddingTop: '40px'}}>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Cargo Type(s): </b> {this.props.hire[0].cargoType}</h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Net Weight: </b> {this.props.hire[0].netWeight}</h6>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                            <br/>
                                            <Card border="primary" className="text-center">
                                                <Card.Header color="blue"><h4>Unloading Details</h4></Card.Header>
                                                <Card.Body>
                                                    <div className="row" style={{paddingTop: '40px'}}>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Unloading Port: </b> {this.props.hire[0].unloadingPort}</h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Unloading Terminal: </b> {this.props.hire[0].unloadingTerminal}</h6>
                                                        </div>
                                                    </div>
                                                    <hr/><h5>Vessel Details</h5>
                                                    <div className="row" style={{paddingTop: '40px'}}>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Vessel: </b> {this.props.hire[0].vessel}</h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text center'>Vessel Arrival Date: </b> {moment(this.props.hire[0].vesselArrivalDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                            <br/>
                                            <Card border="primary" className="text-center">
                                                <Card.Header color="blue"><h4>Destination Address</h4></Card.Header>
                                                <Card.Body>
                                                    <div className="row" style={{paddingTop: '40px'}}>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Address Line 1: </b> {this.props.hire[0].destinationAddressLine1}</h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Address Line 2: </b> {this.props.hire[0].destinationAddressLine2}</h6>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>City: </b> {this.props.hire[0].destinationCity}</h6>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div> :
                                        <div>
                                            <br/>
                                            <Card border="primary" className="text-center">
                                                <Card.Header color="blue"><h4>Container Pickup Details</h4></Card.Header>
                                                <Card.Body>
                                                    <div className="row" style={{paddingTop: '40px'}}>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Address Line 1: </b> {this.props.hire[0].containerPickupAddressLine1}</h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Address Line 2: </b> {this.props.hire[0].containerPickupAddressLine2}</h6>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>City: </b> {this.props.hire[0].containerPickupCity}</h6>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                            <br/>
                                            <Card border="primary" className="text-center">
                                                <Card.Header color="blue"><h4>Cargo Details</h4></Card.Header>
                                                <Card.Body>
                                                    <br/>
                                                    <h5>Pick up Date and Time</h5>
                                                    <div className="row" style={{paddingTop: '40px'}}>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Cargo Pickup Date: </b> {moment(this.props.hire[0].pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    <hr/><h5>Location</h5>
                                                    <div className="row" style={{paddingTop: '40px'}}>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Address Line 1: </b> {this.props.hire[0].cargoLocationAddressLine1}</h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Address Line 2: </b> {this.props.hire[0].cargoLocationAddressLine2}</h6>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>City: </b> {this.props.hire[0].cargoLocationCity}</h6>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    <hr/>
                                                    <div className="row" style={{paddingTop: '40px'}}>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Cargo Type: </b> {this.props.hire[0].cargoType}</h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Net Weight: </b> {this.props.hire[0].netWeight}</h6>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                            <br/>
                                            <Card border="primary" className="text-center">
                                                <Card.Header color="blue"><h4>Loading Details</h4></Card.Header>
                                                <Card.Body>
                                                    <div className="row" style={{paddingTop: '40px'}}>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Loading Port: </b> {this.props.hire[0].loadingPort}</h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Loading Terminal: </b> {this.props.hire[0].loadingTerminal}</h6>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Loading Date: </b> {this.props.hire[0].loadingDatetime}</h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <h6 className="left"><b className='blue-text'>Vessel: </b> {this.props.hire[0].vessel}</h6>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    }
                                    <br/>



                                    <Card border="primary" className="text-center">
                                        <Card.Header color="blue"><h4>Special Notes</h4></Card.Header>
                                        <Card.Body>
                                            <div className="row" style={{paddingTop: '40px'}}>
                                                <div className="col-12">
                                                    <textarea style={{ minHeight: 100 }} type="text" id="remarks" value={this.props.hire[0].remarks}/>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <br/>
                                    <Card border="primary" className="text-center">
                                        <Card.Header color="blue"><h4>Hire Status</h4></Card.Header>
                                        <Card.Body>
                                            <div className="row" style={{paddingTop: '40px'}}>
                                                <div className="col-12">
                                                    <h6 className="left"><b className='blue-text'>Status: </b> <b className="red badge1">{this.props.hire[0].hireStatus}</b> </h6>
                                                </div>
                                            </div>

                                        </Card.Body>
                                    </Card>

                            <br/><br/>
                            <div className="input-field right">
                                <Link to="/User/UserManageTools"><button className="btn orange lighten-1 z-depth-5 btn1" style={{marginRight: '50px'}}>Back</button></Link>
                            </div>
                                </Card.Body>
                            </Card>
                    </div>
                    <br/><br/>
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         acceptHireRequest: (id, hireRequest) => dispatch(acceptHireRequest(id, hireRequest)),
//         declineHireRequest: (id, hireRequest) => dispatch(declineHireRequest(id, hireRequest))
//     }
// }

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        {collection: 'hires'},
        {collection: 'customers'},
        {collection: 'drivers'},
        {collection: 'vehicles'},
    ])
)(ManageDeclinedHires);
