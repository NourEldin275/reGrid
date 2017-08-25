/**
 * Created by nour on 8/25/17.
 */
import React, { Component } from 'react';

class EditableCell extends Component{

    render(){
        return <td>{this.props.value}</td>;
    }
}

function Cell(props) {
    return(
        <td>{props.value}</td>
    );
}

export {Cell, EditableCell };
