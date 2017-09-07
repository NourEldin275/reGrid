/**
 * Created by nour on 9/6/17.
 */
import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import 'react-day-picker/lib/style.css';
import './filterCell.css';

const _textInput     = 'text';
const _numberInput   = 'number';
const _checkboxInput = 'checkbox';
const _selectInput   = 'select';
const _date          = 'date';
const _currentYear = new Date().getFullYear();
const _fromMonth = new Date(_currentYear, 0);
const _toMonth = new Date(_currentYear + 10, 11);

class FilterCell extends Component{
    constructor(props){
        super(props);

        this.onFilterChange = this.onFilterChange.bind(this);
        this.setFilterValue = this.setFilterValue.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleYearMonthChange = this.handleYearMonthChange.bind(this);

        let state = {
           value : ''
        };
        if(props.column.filter.enabled && props.column.filter.type === _date){
            state['month'] = _fromMonth;
        }
        this.state = state;
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

    /**
     * Date picker day changed.
     * @param selectedDay
     */
    handleDayChange(selectedDay){

        let value = selectedDay ?
            selectedDay.format(this.props.column.filter.options.format) : '';

        this.setState({value, selectedDay}, ()=> {
            this.props.onFilterDatePickerChangeHandler(this.props.column.id, this.state.value);
        });
    }

    /**
     * Fired when the month is changed from the date picker
     * @param month
     */
    handleYearMonthChange(month) {
        this.setState({ month });
    };

    buildFilterInput(){
        const filterOnEnterHandler = this.props.onFilterEnterHandler;
        const column = this.props.column;
        let filter = '';
        if (column.filter || column.filter.enabled){

            switch (column.filter.type){
                case _textInput:
                    filter =  <input
                        type={_textInput}
                        name={column.id}
                        onChange={this.onFilterChange}
                        value={this.setFilterValue()}
                        onKeyUp={filterOnEnterHandler}
                        placeholder={column.filter.placeHolder}
                    />;
                    break;
                case _numberInput:
                    filter =  <input
                        type={_numberInput}
                        name={column.id}
                        onChange={this.onFilterChange}
                        value={this.setFilterValue()}
                        onKeyUp={filterOnEnterHandler}
                        min={column.filter.min}
                        max={column.filter.max}
                        step="any"
                    />;
                    break;
                case _checkboxInput:
                    filter = <input
                        type={_checkboxInput}
                        name={column.id}
                        onChange={this.onFilterChange}
                        value={this.setFilterValue()}
                    />;
                    break;
                case _selectInput:
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
                case _date:

                    let dayPickerProps = {
                        month: this.state.month,
                        fromMonth: _fromMonth,
                        toMonth: _toMonth,
                        captionElement: <YearMonthForm onChange={this.handleYearMonthChange} />,
                        pagedNavigation: false
                    };

                    filter =
                        <DayPickerInput
                            name={column.id}
                            format={column.filter.options.format}
                            value={this.state.value}
                            onDayChange={this.handleDayChange}
                            dayPickerProps={dayPickerProps}
                        />;
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


// Component will receive date, locale and localeUtils props
function YearMonthForm({ date, localeUtils, onChange }) {
    const months = localeUtils.getMonths();

    const years = [];
    for (let i = _fromMonth.getFullYear(); i <= _toMonth.getFullYear(); i += 1) {
        years.push(i);
    }

    const handleChange = function handleChange(e) {
        const { year, month } = e.target.form;
        onChange(new Date(year.value, month.value));
    };

    return (
        <form className="DayPicker-Caption">
            <select name="month" onChange={handleChange} value={date.getMonth()}>
                {months.map((month, i) => <option key={i} value={i}>{month}</option>)}
            </select>
            <select name="year" onChange={handleChange} value={date.getFullYear()}>
                {years.map((year, i) =>
                    <option key={i} value={year}>
                        {year}
                    </option>
                )}
            </select>
        </form>
    );
}

export default FilterCell;