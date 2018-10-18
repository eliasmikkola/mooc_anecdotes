import React from 'react'
import { connect } from 'react-redux'

import { addFilter } from '../reducers/filterReducer.js'


const mapDispatchToProps = {
    addFilter
}

class Filter extends React.Component {
    handleChange = (event) => {
        // input-kentän arvo muuttujassa event.target.value
        this.props.addFilter(event.target.value)

    }
    render() {
        const style = {
            marginBottom: 10
        }

        return (
            <div style={style}>
                filter <input onChange={this.handleChange}/>
            </div>
        )
    }
}
const ConnectedFilter = connect(null,
    mapDispatchToProps
)(Filter)
export default ConnectedFilter

