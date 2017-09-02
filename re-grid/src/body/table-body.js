/**
 * Created by nour on 8/25/17.
 */
import React, { Component } from 'react';
import Row from './rows/row';

class TableBody extends Component{


    createRow(row, rowIndex){
        return (
            <Row
                key={rowIndex}
                rowData = {row}
                editSaveHandler={this.props.editSaveHandler}
            />
        );
    }

    render(){

        let rows = [];
        for (let row of this.props.rows) {
            rows.push(this.createRow(row,this.props.rows.indexOf(row)));
        }

        return(
            <tbody>{rows}</tbody>
        );
    }
}

export default TableBody;