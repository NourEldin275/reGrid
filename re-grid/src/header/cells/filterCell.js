/**
 * Created by nour on 9/6/17.
 */
import React, { Component } from 'react';

const textInput     = 'text';
const numberInput   = 'number';
const checkboxInput = 'checkbox';
const selectInput   = 'select';

class FilterCell extends Component{
    constructor(props){
        super(props);

        this.onFilterChange = this.onFilterChange.bind(this);
        this.setFilterValue = this.setFilterValue.bind(this);

        this.state = {
            value: ''
        };
    }

    onFilterChange(event){
        event.persist();
        this.setState({value: event.target.value}, ()=>{
            this.props.onFilterChangeHandler(event);
        });
    }

    componentWillReceiveProps(newProps){
        if(newProps.clearFilter){
            this.setState({
                value: ''
            });
        }
    }

    setFilterValue(){
        return this.state.value;
    }


    buildFilterInput(){
        const filterOnEnterHandler = this.props.onFilterEnterHandler;
        const column = this.props.column;
        let filter = '';
        if (column.filter || column.filter.enabled){

            switch (column.filter.type){
                case textInput:
                    filter =  <input
                        type={textInput}
                        name={column.id}
                        onChange={this.onFilterChange}
                        value={this.setFilterValue()}
                        onKeyUp={filterOnEnterHandler}
                        placeholder={column.filter.placeHolder}
                    />;
                    break;
                case numberInput:
                    filter =  <input
                        type={numberInput}
                        name={column.id}
                        onChange={this.onFilterChange}
                        value={this.setFilterValue()}
                        onKeyUp={filterOnEnterHandler}
                        min={column.filter.min}
                        max={column.filter.max}
                        step="any"
                    />;
                    break;
                case checkboxInput:
                    filter = <input
                        type={checkboxInput}
                        name={column.id}
                        onChange={this.onFilterChange}
                        value={this.setFilterValue()}
                    />;
                    break;
                case selectInput:
                    let selectOptions = column.filter.options.map((option) =>
                        <option key={option.value.toString()} value={option.value}>
                            {option.label}
                        </option>
                    );
                    filter =
                        <select
                            name={column.id}
                            onChange={this.onFilterChange}
                            value={this.setFilterValue()}
                        >
                            {selectOptions}
                        </select>;
                    break;
                case undefined:
                    console.error('Undefined Filter Object passed to filter in the following object');
                    console.error(column.filter);
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
        return this.buildFilterInput();
    }

}

export default FilterCell;