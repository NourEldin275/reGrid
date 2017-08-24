import React, { Component } from 'react';
import './App.css';


class Grid extends Component{

    constructor(props){
        super(props);
        this.state = {
            filters: {},
            sort: {
                column: '',
                direction: ''
            }
        };
        //TODO: Pass load data method from parent
        /*
            TODO: Props to receive will be as follows

            filterOnEnter: this will be true or false field defaults to false
            loadData: a callback that will be used to get the data from whatever source
            pageLimit: -1 to show all results, a positive value
            pageOffset: the offset of each page
            nextLabel: label for next button
            previousLabel: label for previous button
            onFilterRemote: callback to be executed when a filter is triggered to fetch data remotely
            onSortRemote: callback used to sort to sort data remotely
            onEditRemote: callback used to edit data remotely.

         */
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    handleSort(event){
        let column = event.target;
        let columnName = column.getAttribute('name');
        let direction = this.state.sort.direction;
        let icon_DESC = 'glyphicon-sort-by-attributes-alt';
        let icon_ASC = 'glyphicon-sort-by-attributes';
        let icon_default = 'glyphicon-sort';

        // A different column was clicked or its the first time to sort
        if (this.state.sort.column !== columnName){
            direction = 'ASC';
            let sortIcons = document.getElementsByClassName('sort-direction-toggle');

            // Not the first time to sort
            if (this.state.sort.column !== '' && this.state.sort.direction !== ''){

                // reset all icons then change the clicked column icon
                for (let icon of sortIcons){
                    if(icon.classList.contains(icon_ASC)){
                        icon.classList.remove(icon_ASC);
                    }else if(icon.classList.contains(icon_DESC)){
                        icon.classList.remove(icon_DESC);
                    }
                    icon.classList.add(icon_default);
                }
                // change the clicked column icon
                column.classList.remove(icon_default);
                column.classList.add(icon_ASC);

            }else{
                // this is the first time to sort
                column.classList.remove(icon_default);
                column.classList.add(icon_ASC);
            }

        }
        else if( direction === 'ASC'){
            direction = 'DESC';
            column.classList.remove(icon_ASC);
            column.classList.add(icon_DESC);
        }else{
            direction = 'ASC';
            column.classList.remove(icon_DESC);
            column.classList.add(icon_ASC);
        }

        this.setState({
            sort: {
                column: columnName,
                direction: direction
            }
        });
    }

    handleFilterChange(event){
        let field = event.target;
        let filters = this.state.filters;
        let filterName = field.getAttribute('name');
        if (field.type === 'checkbox'){
            filters[filterName] = field.checked;
        }else{
            filters[filterName] = field.value;
        }
        this.setState({
            filters: filters
        });
    }



    buildGrid(){
        return(
            <table className="table table-bordered table-responsive">
                <thead>
                    <tr>
                        <td>
                            ID <span name="id" className="sort-direction-toggle glyphicon glyphicon-sort" aria-hidden="true" onClick={this.handleSort}></span>
                        </td>
                        <td>
                            Title <span name="title" className="sort-direction-toggle glyphicon glyphicon-sort" aria-hidden="true" onClick={this.handleSort}></span>
                        </td>
                        <td>
                            Count <span name="count" className="sort-direction-toggle glyphicon glyphicon-sort" aria-hidden="true" onClick={this.handleSort}></span>
                        </td>
                        <td>
                            List <span name="list" className="sort-direction-toggle glyphicon glyphicon-sort" aria-hidden="true" onClick={this.handleSort}></span>
                        </td>
                        <td>
                            Toggle <span name="toggle" className="sort-direction-toggle glyphicon glyphicon-sort" aria-hidden="true" onClick={this.handleSort}></span>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input name="title" type="text" placeholder="filter..." onChange={this.handleFilterChange}/></td>
                        <td><input type="number" name="count" onChange={this.handleFilterChange}/></td>
                        <td><select name="list" id="" onChange={this.handleFilterChange}>
                            <option value=''>...</option>
                            <option value='1'>Opt1</option>
                            <option value='2'>Opt2</option>
                            <option value='3'>Opt3</option>
                            <option value='4'>Opt4</option>
                            <option value='5'>Opt5</option>
                            <option value='6'>Opt6</option>
                            <option value='7'>Opt7</option>
                            <option value='8'>Opt8</option>
                            <option value='9'>Opt9</option>
                        </select></td>
                        <td><input type="checkbox" name="toggle" onChange={this.handleFilterChange}/></td>
                    </tr>
                </thead>
            </table>
        );
    }

    render(){
        return(
            this.buildGrid()
        );
    }
}

class App extends Component {
  render() {
    return (
      <Grid />
    );
  }
}

export default App;
