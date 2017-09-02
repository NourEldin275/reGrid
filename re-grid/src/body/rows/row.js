/**
 * Created by nour on 8/26/17.
 */
import React, { Component } from 'react';
import { Cell } from '../cells/cells';

class Row extends Component{

    constructor(props){
        super(props);
        this.cellChangeHandler        = this.cellChangeHandler.bind(this);
        this.editModeToggleHandler    = this.editModeToggleHandler.bind(this);
        this.onKeyUpHandler           = this.onKeyUpHandler.bind(this);
        this.state = {
            rowData: this.props.rowData,
            editMode: false
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({rowData: newProps.rowData});
    }


    cellChangeHandler(event, cellId){
        let rowData = this.state.rowData;
        let updated = rowData.map((cell) => {
            if(cell.id === cellId){
                rowData[rowData.indexOf(cell)].value = event.target.value;
                return true;
            }
            return false;
        });

        if(updated){
            this.setState({rowData});
        }
    }

    editModeToggleHandler(){
        this.setState({
            editMode: !this.state.editMode
        });
    }

    onKeyUpHandler(event){
        // Call save handler passed in props
        if(event.keyCode === 13){
            this.editModeToggleHandler();
            console.log("Save the following data");
            console.log(this.state.rowData);
        }
    }

    render(){
        let row = this.state.rowData;
        let rowCells = row.map((cell) => {
            return (
                <Cell
                    key={cell.id.toString()}
                    value={cell.value}
                    editing={cell.editing}
                    changeHandler = {this.cellChangeHandler}
                    cellKey={cell.id.toString()}
                    editMode={this.state.editMode}
                />
            );
        });

        if(this.state.editMode){
            // removing double click handler to prevent it from firing while editing
            return(
                <tr onKeyUp={this.onKeyUpHandler}>
                    {rowCells}
                </tr>
            );
        }

        return(
            <tr onDoubleClick={this.editModeToggleHandler} onKeyUp={this.onKeyUpHandler}>
                {rowCells}
            </tr>
        );
    }
}

export default Row;