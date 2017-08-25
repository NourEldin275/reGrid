/**
 * Created by nour on 8/25/17.
 */
import React, { Component } from 'react';
import { Cell } from './cells/cells';

class TableBody extends Component{
    constructor(props){
        super(props);
        this.rows = this.props.rows;
    }

    render(){

        let rows = [];
        for (let row of this.rows) {
            let rowData = row.map((data) => {
                return(<Cell key={data.id.toString()} value={data.value} />);
            });

            let tableRow =
                <tr key={this.rows.indexOf(row)}>{rowData}</tr>;
            rows.push(tableRow);
        }

        return(
            <tbody>{rows}</tbody>
        );
    }
}

export default TableBody;