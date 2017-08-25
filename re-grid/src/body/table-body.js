/**
 * Created by nour on 8/25/17.
 */
import React, { Component } from 'react';
import { Cell } from './cells/cells';

class TableBody extends Component{

    render(){

        let rows = [];
        for (let row of this.props.rows) {
            let rowData = row.map((data) => {
                return(<Cell key={data.id.toString()} value={data.value} />);
            });

            let tableRow =
                <tr key={this.props.rows.indexOf(row)}>{rowData}</tr>;
            rows.push(tableRow);
        }

        return(
            <tbody>{rows}</tbody>
        );
    }
}

export default TableBody;