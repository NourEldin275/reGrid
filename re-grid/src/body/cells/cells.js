/**
 * Created by nour on 8/25/17.
 */
import React, { Component } from 'react';

class EditableCell extends Component{

    constructor(props){
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(event){
        this.props.changeHandler(event, this.props.cellKey);
    }

    getInput(){
        const settings = this.props.editing;
        const textType = 'text';
        const numberType = 'number';
        const selectType = 'select';
        const checkboxType = 'checkbox';

        let input = <td>{this.props.defaultValue}</td>;
        switch (settings.type){
            case textType:
                input = <input type="text" value={this.props.defaultValue.toString()} onChange={this.changeHandler}/>;
                break;
            case numberType:
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
            case checkboxType:
                input = <input type="checkbox" defaultChecked={this.props.defaultValue} onChange={this.changeHandler}/>;
                break;
            case selectType:
                let options = settings.options.options.map((option) =>
                    <option key={settings.options.options.indexOf(option)} value={option.value} onChange={this.changeHandler}>{option.label}</option>
                );
                input = <select
                    name=""
                    id=""
                    value={this.props.defaultValue} onChange={this.changeHandler}>{options}</select>;
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
            />
        );
    }

    return(
        <td>{props.value}</td>
    );
}

export { Cell };
