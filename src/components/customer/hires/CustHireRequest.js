import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import ExportRequest from './CustExportRequest'
import ImportRequest from './CustImportRequest'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'


class HireRequests extends Component {
    static defaultProps = { // <-- DEFAULT PROPS
        hires: []
    }

    render() {
        const {auth} = this.props
        if (!auth.uid) return <Redirect to='/signin' />

        const importHireRequests = this.props.hires.filter(item => item.hireType === "import" && item.hireStatus === 'request')
        const exportHireRequests = this.props.hires.filter(item => item.hireType === "export" && item.hireStatus === 'request')

        return (
            // <div className="main-panel">
            <div id="content" className="container-fluid" role="main">
                <br/><br/><br/><br/>
                <Tabs className="center">
                    <TabList>
                        <Tab>IMPORTS</Tab>
                        <Tab>EXPORTS</Tab>
                    </TabList>
                    <TabPanel>
                        <ImportRequest importHireRequests={importHireRequests} history={this.props.history}></ImportRequest>
                    </TabPanel>
                    <TabPanel>
                        <ExportRequest exportHireRequests={exportHireRequests} history={this.props.history}></ExportRequest>
                    </TabPanel>
                </Tabs>
            </div>
            // </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        auth: state.firebase.auth,
        hires: state.firestore.ordered.hires
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'hires'}
    ])
)(HireRequests)
