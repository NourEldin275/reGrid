/**
 * Created by nour on 8/25/17.
 */
import React, { Component } from 'react';
import FilterCell from './cells/filterCell';

class HeaderFiltersRow extends Component{

    render(){
        const columns = this.props.columns;
        const columnFilters = columns.map((column) => {

            if (column.filter && column.filter.enabled){
                return(
                    <td key={column.id.toString()}>
                        <FilterCell
                            column={column}
                            onFilterEnterHandler={this.props.onFilterEnterHandler}
                            onFilterChangeHandler={this.props.onFilterChangeHandler}
                            onFilterDatePickerChangeHandler={this.props.onFilterDatePickerChangeHandler}
                            clearFilter={this.props.clearFilters}
                        />
                    </td>
                );
            }else{
                return(
                    <td key={column.id.toString()}></td>
                );
            }
        });

        return (
            <tr>{columnFilters}</tr>
        );
    }
}

export default HeaderFiltersRow;