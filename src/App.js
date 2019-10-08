import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Homepage from './components/dashboard/Homepage'
import About from './components/dashboard/About'
import Services from './components/dashboard/Services'
import Contact from './components/dashboard/Contact'
import ErrorPage from './components/dashboard/ErrorPage'
import Footer from './components/layout/Footer'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import {connect} from 'react-redux'

// Admin
import AdminDashboard from './components/admin/dashboard/AdminDashboard'
import Customers from './components/admin/dashboard/Customers'
import AddCustomer from './components/admin/dashboard/AddCustomer'
import AddDriver from './components/admin/dashboard/AddDriver'
import AddVehicle from './components/admin/dashboard/AddVehicle'
import AddHire from './components/admin/dashboard/AddHire'
import Hires from './components/admin/dashboard/Hires'
import Drivers from './components/admin/dashboard/Drivers'
import Vehicles from './components/admin/dashboard/Vehicles'
import AdminSidebar from './components/admin/layout/AdminSidebar'
import HireRequests from './components/admin/dashboard/HireRequests'
import OngoingHires from './components/admin/dashboard/OngoingHires'
import ManageHire from './components/admin/dashboard/ManageHire'
// import ManageHireRequest from './components/admin/dashboard/ManageHireRequest'

import ManageCustomer from './components/admin/dashboard/ManageCustomer'
import ManageDriver from './components/admin/dashboard/ManageDriver'
import ManageVehicle from './components/admin/dashboard/ManageVehicle'


function App(props) {

  const {type} = props;

  const link = type.userType === "admin" ? null : <Footer/>
  const sidebar = type.userType === "admin" ? <AdminSidebar/> : null

  return (
    <BrowserRouter>
      <div className="App">
        <div className={type.userType === 'admin' ? "d-flex" : "wrapper"} id={type.userType === 'admin' ? "wrapper" : null}>
          {sidebar}
          <div id={type.userType === 'admin' ? "page-content-wrapper" : null} className={type.userType === 'admin' ? "" : null}> 
            <Navbar></Navbar>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route path='/about' component={About}  />
              <Route path='/services' component={Services} />
              <Route path='/contact' component={Contact} />
              <Route path='/error' component={ErrorPage} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              
              <Route exact path='/admin' component={AdminDashboard} />
              <Route exact path='/admin/customers' component={Customers} />
              <Route path='/admin/addcustomer' component={AddCustomer} />
              <Route exact path='/admin/drivers' component={Drivers} />
              <Route path='/admin/adddriver' component={AddDriver} />
              <Route exact path='/admin/vehicles' component={Vehicles} />
              <Route path='/admin/addvehicle' component={AddVehicle} />
              <Route path='/admin/addhire' component={AddHire} />
              <Route exact path='/admin/hires' component={Hires} />
              <Route exact path='/admin/hirerequests' component={HireRequests} />
              <Route path='/admin/hirerequests/:id' component={ManageHire} />
              <Route path='/admin/ongoinghires' component={OngoingHires} />
              {/* <Route path='/admin/hires/:id' component={ManageHire} /> */}

              <Route path='/admin/customers/:id' component={ManageCustomer} />
              <Route path='/admin/drivers/:id' component={ManageDriver} />
              <Route path='/admin/vehicles/:id' component={ManageVehicle} />
              <Route path='/admin/hires/:id' component={ManageHire} />
            </Switch>
          </div>
        </div>
        {link}
      </div>
      
    </BrowserRouter> 
  );
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    type: state.firebase.profile
  }
}

export default connect(mapStateToProps)(App);
