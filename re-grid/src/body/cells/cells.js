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

        let input = <td>{this.props.value}</td>;
        switch (settings.type){
            case textType:
                input = <input type="text" defaultValue={this.props.value.toString()}/>;
                break;
            case numberType:
                input = <input
                    type="number"
                    defaultValue={this.props.value.toString()}
                    min={settings.options.min}
                    max={settings.options.max}
                    step="any"
                />;
                break;
            case checkboxType:
                input = <input type="checkbox" defaultChecked={this.props.value}/>;
                break;
            case selectType:
                let options = settings.options.options.map((option) =>
                    <option key={settings.options.options.indexOf(option)} value={option.value}>{option.label}</option>
                );
                input = <select
                    name=""
                    id=""
                    defaultValue={this.props.value}>{options}</select>;
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
                value={props.value}
                editing={props.editing}
            />
        );
    }

    return(
        <td>{props.value}</td>
    );
}

export { Cell };
