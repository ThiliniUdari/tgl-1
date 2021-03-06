import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editUser} from '../../../../store/actions/adminActions'

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
//  if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

// Form to edit customer details
class EditCustomer extends Component {

    state = {
        id: '',
        password: '',
        firstName: '',
        lastName: '',
        mobile: '',
        dob: '',
        loading: 1,
        updated: 1,
        errors:{
            nic: '',
            mobile: '',
            dob: ''
        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            updated: ''
        })

        const {name, value} = e.target
        let errors = this.state.errors

        switch(name){
            case 'nic': 
                // errors.nic = 
                // value.length <10 || (value.length <10 && isNaN(value)) ? 'Invalid NIC number'
                // : value.length === 10 && value[9] !== 'v' || isNaN(value[0] ) || isNaN(value[1] ) || isNaN(value[2] ) || isNaN(value[3] ) || isNaN(value[4] ) || isNaN(value[5] ) || isNaN(value[6] ) || isNaN(value[7] ) || isNaN(value[8]) 
                //     ? 'Invalid NIC number'
                //     :value.length > 12 ?'NIC is too long':''
                if(value.length === 10 && !isNaN(value[0] ) && !isNaN(value[1] ) && !isNaN(value[2] ) && !isNaN(value[3] ) && !isNaN(value[4] ) && !isNaN(value[5] ) && !isNaN(value[6] ) && !isNaN(value[7] ) && !isNaN(value[8] ) && value[9] === 'v' ){
                    errors.nic = ''
                }else if(value.length === 12 && !isNaN(value[0] ) && !isNaN(value[1] ) && !isNaN(value[2] ) && !isNaN(value[3] ) && !isNaN(value[4] ) && !isNaN(value[5] ) && !isNaN(value[6] ) && !isNaN(value[7] ) && !isNaN(value[8] ) && !isNaN(value[9] ) && !isNaN(value[10] ) && !isNaN(value[11] ) ){
                    errors.nic = ''
                }else{
                    errors.nic = 'Invalid NIC'
                }
                break
            case 'mobile': 
                errors.mobile = 
                    value.length != 10 || isNaN(value) || value[0] != 0 || value[1] != 7
                    ? 'Invalid Mobile No.(Ex: 07xxxxxxxx)'
                    : ''
                break;
            case 'dob':
                    errors.dob=
                    new Date(value) > Date.now()
                    ?'Invalid Date Of Birth.Check again'
                    :''
                break
            default:
                break
        }
        this.setState({errors, [name]: value}, ()=> {
            this.setState({errors, [name]: value})

        })
    }

    handleDate = (e) => {
        e.preventDefault();
        e.target.type = 'date'
        e.target.max = "2020-01-01"
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.editUser(this.props.id, this.state, 'customers')
        // this.setState({
        //     updated: 1
        // })
        if(validateForm(this.state.errors)){
            this.setState({
                valid: 'valid',
                updated: 1
            })
            this.props.editUser(this.props.id, this.state, 'customers')
        }else{
            this.setState({
                vlaid: 'invalid'
            })
        }
    }
    componentWillMount(){
        if(this.props.customer){
            this.setState({
                ...this.props.customer,loading: 0,updated: !this.state.updated
            });
        }
    }

    render() {
        const {errors} = this.state
        const load = this.state.loading === 0 ? (
            <div className="container">
                    <h2 className="center" style={{paddingTop: '50px'}}>Edit Customer</h2><br/><br/>
                    <div className="green-text center">
                        <h4>{this.state.updated ? "Updated Successfully" : null}</h4>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col-5 row">
                                <h6 className='blue-text'>First name</h6>
                                <input placeholder="First Name" type="text" id="firstName" value={this.state.firstName}  onChange={this.handleChange} required />
                            </div>
                            <div className='col-2'></div>
                            <div className="input-field col-5 row">
                                <h6 className='blue-text'>Last name</h6>
                                <input placeholder="Last Name" type="text" id="lastName" value={this.state.lastName}  onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-5 row">
                                <h6 className='blue-text'>Mobile No</h6>
                                <input placeholder="Mobile" type="text" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} required noValidate/>
                                {this.state.errors.mobile.length > 0 && 
                                    <small><span className='error red-text center'>{this.state.errors.mobile}</span></small>
                                }
                            </div>
                            <div className='col-2'></div>
                            <div className="input-field col-5 row">
                                <h6 className='blue-text'>Date of Birth</h6>
                                <input placeholder="Date of Birth" onFocus={this.handleDate} type="text" name="dob" id="dob" value={this.state.dob} onChange={this.handleChange} required noValidate/>
                                {errors.dob.length > 0 && 
                                    <small><span className='error red-text center'>{errors.dob}</span></small>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-5 row ">
                                <h6 className='blue-text'>NIC</h6>
                                <input placeholder="NIC No" type="text" id="nic" name="nic" value={this.state.nic}  onChange={this.handleChange} required noValidate/>
                                {errors.nic.length > 0 && 
                                    <small><span className='error red-text center' >{errors.nic}</span></small>
                                }
                            </div>
                        </div><br/>
                        <div className="input-field center">
                            <button className="btn blue lighten-1 z-depth-0">Update</button>
                        </div>
                    </form>
                </div>
                
        ) : <div><br/><br/><br/>Loading</div>
        return <div>{load}</div>
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        editUser: (id, customer, collec) => dispatch(editUser(id,customer,collec))
    }
}

export default connect(null, mapDispatchToProps)(EditCustomer)