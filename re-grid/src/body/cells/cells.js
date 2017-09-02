/**
 * Created by nour on 8/25/17.
 */
import React, { Component } from 'react';

class EditableCell extends Component{
    getInput(){
        const settings = this.props.editing;
        const textType = 'text';
        const numberType = 'number';
        const selectType = 'select';
        const checkboxType = 'checkbox';

        let input = <td>{this.props.defaultValue}</td>;
        switch (settings.type){
            case textType:
                input = <input type="text" value={this.props.defaultValue.toString()}/>;
                break;
            case numberType:
                if(settings.options){
                    input = <input
                        type="number"
                        value={this.props.defaultValue.toString()}
                        min={settings.options.min}
                        max={settings.options.max}
                        step="any"
                    />;
                }else{
                    input = <input
                        type="number"
                        value={this.props.defaultValue.toString()}
                        step="any"
                    />;
                }
                break;
            case checkboxType:
                input = <input type="checkbox" defaultChecked={this.props.defaultValue}/>;
                break;
            case selectType:
                let options = settings.options.options.map((option) =>
                    <option key={settings.options.options.indexOf(option)} value={option.value}>{option.label}</option>
                );
                input = <select
                    name=""
                    id=""
                    value={this.props.defaultValue}>{options}</select>;
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

    if(props.editing && props.editing.enabled){
        return (
            <EditableCell
                defaultValue={props.value}
                editing={props.editing}
            />
        );
    }

    return(
        <td>{props.value}</td>
    );
}

export { Cell };
