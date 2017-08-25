/**
 * Created by nour on 8/25/17.
 */
import React, { Component } from 'react';

class HeaderFiltersRow extends Component{

    buildFilterInput(column){
        const textInput     = 'text';
        const numberInput   = 'number';
        const checkboxInput = 'checkbox';
        const selectInput   = 'select';
        let filter = '';
        if (column.filter || column.filter.enabled){

            switch (column.filter.type){
                case textInput:
                    filter = <input
                        type={textInput}
                        name={column.id}
                        onChange={column.filter.changeHandler}
                        placeholder={column.filter.placeHolder}
                    />;
                    break;
                case numberInput:
                    filter = <input
                        type={numberInput}
                        name={column.id}
                        onChange={column.filter.changeHandler}
                        min={column.filter.min}
                        max={column.filter.max}
                        step="any"
                    />;
                    break;
                case checkboxInput:
                    filter = <input
                        type={checkboxInput}
                        name={column.id}
                        onChange={column.filter.changeHandler}
                    />;
                    break;
                case selectInput:
                    let selectOptions = column.filter.options.map((option) =>
                        <option key={option.value.toString()} value={option.value}>
                            {option.label}
                        </option>
                    );
                    filter = <select name={column.id} onChange={column.filter.changeHandler}>
                        {selectOptions}
                    </select>;
                    break;
                case undefined:
                    break;
                default:
                    console.error(
                        'Unsupported input type passed as column filter type: ' + column.filter.type +
                        ' on column ' + column.id
                    );
                    filter = '';
            }
            return filter;
        }
    }

    render(){
        const columns = this.props.columns;
        const columnFilters = columns.map((column) =>

            <td key={column.id.toString()}>
                {this.buildFilterInput(column)}
            </td>
        );

        return (
            <tr>{columnFilters}</tr>
        );
    }
}

export default HeaderFiltersRow;