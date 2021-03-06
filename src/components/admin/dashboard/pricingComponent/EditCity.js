import React, {Component} from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import {editCity, deleteCity} from '../../../../store/actions/adminActions'

// Edit hire charges for a given city
class EditCity extends Component {
    state = {
        id: '',
        import20ft: '',
        import40ft: '',
        export20ft: '',
        export40ft: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.editCity(this.state)
        this.setState   ({
            updated: 1
        })
    }

    handleDelete = (e) => {
        e.preventDefault()
        this.props.deleteCity(this.state.id)
    }

    componentWillMount(){
        if(this.props.city){
            this.setState({
                ...this.props.city,
                updated: !this.state.updated
            })
        }
    }

    render(){
        const {cityEdited} = this.props
        return(
            <Card border="primary" className="text-center">
                <Card.Body>
                    <div className= { cityEdited !== 'Updated Successfully' ? "red-text" : "green-text"}>
                        {this.state.updated ? cityEdited : null}
                    </div>
                    <form onSubmit={this.handleSubmit} autoComplete='off'>
                        <div className="input-field row">
                            <h6 className='blue-text'>Import 20ft: </h6>
                            <input placeholder="Import 20ft" type="text" id="import20ft" value={this.state.import20ft}  onChange={this.handleChange} required />    
                        </div>
                        <div className="input-field row">
                            <h6 className='blue-text'>Import 40ft</h6>
                            <input placeholder="Import 40ft" type="text" id="import40ft" value={this.state.import40ft} onChange={this.handleChange} required />
                        </div>
                        <div className="input-field row">
                            <h6 className='blue-text'>Export 20ft</h6>
                            <input placeholder="Export 20ft" type="text" id="export20ft" value={this.state.export20ft}  onChange={this.handleChange} required />    
                        </div>
                        <div className="input-field row">
                            <h6 className='blue-text'>Export 40ft</h6>
                            <input placeholder="Export 40ft" type="text" id="export40ft" value={this.state.export40ft} onChange={this.handleChange} required />
                        </div>
                        <br/>
                        <div className="input-field center">
                            <button type="submit" className="btn blue lighten-1 z-depth-5 btn1" onClick={this.handleSubmit}>EDIT</button>
                            <button className="btn red lighten-1 z-depth-5 btn1" onClick={this.handleDelete}>DELETE</button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        ) 
    }
}

const mapStateToProps = (state) => {
    return {
        cityEdited: state.admin.cityEdited
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        editCity: (details) => dispatch(editCity(details)),
        deleteCity: (id) => dispatch(deleteCity(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCity);