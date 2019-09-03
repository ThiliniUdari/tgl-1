import React from 'react'
import {Link} from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import AdminNavbar from '../admin/layout/AdminNavbar'
import AdminSidebar from '../admin/layout/AdminSidebar'


const Navbar = () => {
    return(
        <div>
            <AdminSidebar></AdminSidebar>
            <AdminNavbar></AdminNavbar>
            {/* <SignedInLinks></SignedInLinks> */}
            {/* <SignedOutLinks></SignedOutLinks> */}
        </div>
    )
}

export default Navbar;