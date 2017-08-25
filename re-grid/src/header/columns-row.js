/**
 * Created by nour on 8/25/17.
 */
import React, { Component } from 'react';

class HeaderRow extends Component{

    render(){
        const columns = this.props.columns;
        const columnConfig = columns.map((column) =>
            <td key={column.id.toString()}>
                {column.label} <span name={column.id} className="sort-direction-toggle glyphicon glyphicon-sort" aria-hidden="true" onClick={column.sortHandler}></span>
            </td>
        );
        return(
            <tr>{columnConfig}</tr>
        );
    }
}

export default HeaderRow;