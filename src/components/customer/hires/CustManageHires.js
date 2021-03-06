import React, {Component} from 'react'
import "react-tabs/style/react-tabs.css";
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import ManageHireRequests1 from './CustManageHireRequest1'
import ManageHireRequests2 from './CustManageHireRequest2'
import ManageDeclinedHire from './CustManageDeclinedHires';
import ManageOngoingHires from './CustManageOngoingHire';
import ManageCompletedHireDetails from "./CustManageCompletedHireDetails";

// Component to manage hires based on their status
// request - new hire request
// driverPending - driver assigned but not yet accepted
// ongoing - driver accepted and the hire is ongoing
// completed - the hire is completed
//declined - the hire is declined
class ManageHires extends Component {

    static defaultProps = { // <-- DEFAULT PROPS
        hire: []
    }

    state = {
        load: 1
    }

    componentWillReceiveProps(nextProps) {

        if(this.props.hires){
            this.setState({
                // ...nextProps.hire[0],
                load: 0,
            });
        }

    }

    render() {
        const load = this.state.load === 0 ? (
            this.props.hires.filter(item => item.id === this.props.id ).map(a => a.hireStatus)[0] === "completed"?  (
                <div>
                    <ManageCompletedHireDetails hire={this.props.hires.filter(item => item.id === this.props.id)}></ManageCompletedHireDetails>
                </div>

            ) : this.props.hires.filter(item => item.id === this.props.id ).map(a => a.hireStatus)[0] === "request" && this.props.hires.filter(item => item.id === this.props.id ).map(a => a.hireType)[0] === "import"? (
                <div id="content"  role="main">
                    <ManageHireRequests1 hire={this.props.hires.filter(item => item.id === this.props.id)}></ManageHireRequests1>
                </div>
            ) : this.props.hires.filter(item => item.id === this.props.id ).map(a => a.hireStatus)[0] === "request" && this.props.hires.filter(item => item.id === this.props.id ).map(a => a.hireType)[0] === "export"? (
                <div id="content"  role="main">
                    <ManageHireRequests2 hire={this.props.hires.filter(item => item.id === this.props.id)}></ManageHireRequests2>
                </div>
            ) : this.props.hires.filter(item => item.id === this.props.id ).map(a => a.hireStatus)[0] === "ongoing" ? (
                <div id="content"  role="main">
                    <ManageOngoingHires hire={this.props.hires.filter(item => item.id === this.props.id)}></ManageOngoingHires>
                </div>
            ) : this.props.hires.filter(item => item.id === this.props.id ).map(a => a.hireStatus)[0] === "driverPending" && this.props.hires.filter(item => item.id === this.props.id ).map(a => a.hireType)[0] === "import" ? (
                <div id="content"  role="main">
                    <ManageHireRequests1 hire={this.props.hires.filter(item => item.id === this.props.id)}></ManageHireRequests1>
                </div>
            ) : this.props.hires.filter(item => item.id === this.props.id ).map(a => a.hireStatus)[0] === "driverPending" && this.props.hires.filter(item => item.id === this.props.id ).map(a => a.hireType)[0] === "export" ? (
                <div id="content"  role="main">
                    <ManageHireRequests2 hire={this.props.hires.filter(item => item.id === this.props.id)}></ManageHireRequests2>
                </div>
            ) : (
                <div id="content"  role="main">
                    <ManageDeclinedHire hire={this.props.hires.filter(item => item.id === this.props.id)}></ManageDeclinedHire>
                </div>
            )

        ) : null

        return <div>{load}</div>


    }
}

const mapStateToProps = (state, ownProps) => {

    let id = ownProps.match.params.id;
    return{
        auth: state.firebase.auth,
        id: id,
        hires: state.firestore.ordered.hires,
    }

}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [{
        collection: 'hires',
        //doc: props.id
    }])
)(ManageHires)
