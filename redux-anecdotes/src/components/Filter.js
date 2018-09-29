import React from 'react'
 
import { clearFilter, addFilter } from '../reducers/filterReducer.js'

class Filter extends React.Component {
    handleChange = (event) => {
        // input-kentän arvo muuttujassa event.target.value
        this.props.store.dispatch(addFilter(event.target.value))

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

export default Filter
