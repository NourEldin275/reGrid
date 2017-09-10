/**
 * Created by nour on 8/25/17.
 */
import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';

import 'react-day-picker/lib/style.css';

/**
 * Field Types
 */
const _textType     = 'text';
const _numberType   = 'number';
const _selectType   = 'select';
const _checkboxType = 'checkbox';
const _dateType     = 'date';

/**
 * Day Picker constants
 */
const _format        = "YYYY/MM/DD"; //TODO: Create a list of supported formats for docs. Also formats like DD/MM/YYY cause errors.
const _currentYear   = new Date().getFullYear();
const _fromYear      = new Date(0,0).getFullYear();
const _fromMonth     = new Date(_fromYear, 0);
const _toMonth       = new Date(_currentYear + 10, 11);

class EditableCell extends Component{

    constructor(props){
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleYearMonthChange = this.handleYearMonthChange.bind(this);

        let state = {};
        if(props.editing.enabled && props.editing.type === _dateType){
            state['month']  = props.editing.options && props.editing.options.fromMonth ?
                props.editing.options.fromMonth : _fromMonth;
            state['format'] = props.editing.options && props.editing.options.format ?
                props.editing.options.format : _format;
            state['value']  = moment(new Date(props.defaultValue).toISOString()).format(state.format); //new Date(props.defaultValue).toDateString();
        }
        this.state = state;
    }

    /**
     * Date picker day changed.
     * @param selectedDay
     */
    handleDayChange(selectedDay){
        let value = selectedDay ?
            selectedDay.format(this.state.format) : '';

        this.setState({value, selectedDay}, ()=> {
            this.props.dateChangeHandler(this.state.value, this.props.cellKey);
        });
    }

    /**
     * Fired when the month is changed from the date picker
     * @param month
     */
    handleYearMonthChange(month) {
        this.setState({ month });
    };

    changeHandler(event){
        this.props.changeHandler(event, this.props.cellKey);
    }

    getInput(){
        const settings = this.props.editing;

        let input = <td>{this.props.defaultValue}</td>;
        switch (settings.type){
            case _textType:
                input = <input type="text" value={this.props.defaultValue.toString()} onChange={this.changeHandler}/>;
                break;
            case _numberType:
                if(settings.options){
                    input = <input
                        type="number"
                        value={this.props.defaultValue.toString()}
                        min={settings.options.min}
                        max={settings.options.max}
                        step="any"
                        onChange={this.changeHandler}
                    />;
                }else{
                    input = <input
                        type="number"
                        value={this.props.defaultValue.toString()}
                        step="any"
                        onChange={this.changeHandler}
                    />;
                }
                break;
            case _checkboxType:
                input = <input type="checkbox" defaultChecked={this.props.defaultValue} onChange={this.changeHandler}/>;
                break;
            case _selectType:
                let options = settings.options.options.map((option) =>
                    <option key={settings.options.options.indexOf(option)} value={option.value} onChange={this.changeHandler}>{option.label}</option>
                );
                input = <select
                    name=""
                    id=""
                    value={this.props.defaultValue} onChange={this.changeHandler}>{options}</select>;
                break;
            case _dateType:
                let fromMonth     = settings.options && settings.options.fromMonth ? settings.options.fromMonth : _fromMonth;
                let toMonth       = settings.options && settings.options.toMonth   ? settings.options.toMonth   : _toMonth;
                let dayPickerProps = {
                    month: this.state.month,
                    fromMonth: fromMonth,
                    toMonth: toMonth,
                    captionElement: <YearMonthForm
                        fromMonth={fromMonth}
                        toMonth={toMonth}
                        onChange={this.handleYearMonthChange} />,
                    pagedNavigation: false
                };
                input = <DayPickerInput
                    name={this.props.cellKey}
                    format={this.state.format}
                    value={this.state.value}
                    onDayChange={this.handleDayChange}
                    dayPickerProps={dayPickerProps}
                />;
                break;
            default:
                break;
        }

        return input;
    }


    render(){
        return (<td>{this.getInput()}</td>);
    }
}

function Cell(props) {

    if(props.editing && props.editing.enabled && props.editMode ){
        return (
            <EditableCell
                defaultValue={props.value}
                editing={props.editing}
                changeHandler={props.changeHandler}
                cellKey={props.cellKey}
                dateChangeHandler={props.dateChangeHandler}
            />
        );
    }

    return(
        <td>{props.value}</td>
    );
}

// Component will receive date, locale and localeUtils props
//TODO: Move this to a file and reuse it instead.
function YearMonthForm({ date, localeUtils, onChange, fromMonth, toMonth }) {
    const months = localeUtils.getMonths();

    const years = [];
    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
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

export { Cell };
