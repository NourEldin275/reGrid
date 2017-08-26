/**
 * Created by nour on 8/26/17.
 */
import React, { Component } from 'react';
import { Cell } from '../cells/cells';

class Row extends Component{

    render(){
        let row = this.props.rowData;
        let rowCells = row.map((cell) => {
            return (
                <Cell
                    key={cell.id.toString()}
                    value={cell.value}
                    editing={cell.editing}
                />
            );
        });

        return(<tr>{rowCells}</tr>);
    }
}

export default Row;