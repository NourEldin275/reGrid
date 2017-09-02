/**
 * Created by nour on 8/26/17.
 */
import React, { Component } from 'react';
import { Cell } from '../cells/cells';

class Row extends Component{

    constructor(props){
        super(props);
        this.cellChangeHandler = this.cellChangeHandler.bind(this);
        this.state = {
            rowData: this.props.rowData
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
                />
            );
        });

        return(<tr>{rowCells}</tr>);
    }
}

export default Row;