import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import AddHireImport from './addHireImport'
import AddHireExports from './addHireExport'


// Component that joins import and export hire addition
class CustomerAddHire extends React.Component{
   
    render(){
        return(
            <div className="hire_background fadeIn animated faster ">
                <div className="select2">
                <div id="content" className="container " role="main">
                <br/><br/><br/><br/> <br/><br/>
                <Tabs className="center fadeIn animated slow">

                    <TabList className="tablist fadeInDown animated fast ">
                        <Tab>IMPORTS</Tab>
                        <Tab>EXPORTS</Tab>
                    </TabList>
                    <br/><br/>
                    <TabPanel>

                        <AddHireImport />
                    </TabPanel>
                    <TabPanel>
                        <AddHireExports />
                    </TabPanel>
                </Tabs>
            </div>
                </div>

            </div>
        )
    }
}
export default CustomerAddHire; 
