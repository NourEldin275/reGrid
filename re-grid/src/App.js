import React, { Component } from 'react';
import './App.css';
import HeaderRow from './header/columns-row';
import HeaderFiltersRow from './header/filters-row';
import TableBody from './body/table-body';


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
        this.onFilterChangeHandler = this.onFilterChangeHandler.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.onFilterEnterHandler = this.onFilterEnterHandler.bind(this);
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
        }, this.props.remoteSortHandler(this.state.sort));
    }

    onFilterChangeHandler(event){
        let field = event.target;
        let filters = this.state.filters;
        let filterName = field.getAttribute('name');

        if (!field.validity.valid){
            if(field.type === 'number'){
                delete filters[filterName];
            }else{
                return;
            }
        }else if (field.type === 'checkbox'){
            filters[filterName] = field.checked;
        }else{
            filters[filterName] = field.value;
        }
        if(event.target.type === 'checkbox' || event.target.type === 'select-one'){
            // fire remote filter for fields that need no Enter key stroke.
            this.setState({
                filters: filters
            }, this.props.remoteFilterHandler(this.state.filters));
        }else{
            this.setState({
                filters: filters
            });
        }

    }

    /**
     * This method will call the passed remote filter handler only when "Enter" key is pressed.
     * @param event
     */
    onFilterEnterHandler(event){
        if(this.state.filters && event.keyCode === 13){
            this.props.remoteFilterHandler(this.state.filters);
        }
    }

    render(){
        const columns = this.props.columns;
        const rows = this.props.rows;
        return(
            <table className="table table-bordered table-responsive">
                <thead>
                <HeaderRow columns={columns} onSort={this.handleSort} />
                <HeaderFiltersRow
                    columns={columns}
                    onFilterChangeHandler={this.onFilterChangeHandler}
                    onFilterEnterHandler={this.onFilterEnterHandler}
                />
                </thead>
                <TableBody rows={rows} />
            </table>
        );
    }
}

class App extends Component {

    constructor(props){
        super(props);
        this.columns = [
            {
                label: 'ID',
                id: 'id',
                filter: {
                    enabled: false
                }
            },
            {
                label: 'Title',
                id: 'title',
                filter: {
                    enabled: true,
                    type: 'text',
                    placeHolder: 'Filter ...'
                },
                editing: {
                    enabled: true,
                    type: 'text',
                }


            },
            {
                label: 'Count',
                id: 'count',
                filter: {
                    enabled: true,
                    type: 'number',
                    min: -5,
                    max: 100
                },
                editing: {
                    enabled: true,
                    type: 'number',
                    options: {
                        min: 0,
                        max: 1000
                    }
                }
            },
            {
                label: 'List',
                id: 'list',
                filter: {
                    enabled: true,
                    type: 'select',
                    options: [
                        {
                            label: '...',
                            value: ''
                        },
                        {
                            label: 'Opt 1',
                            value: '1'
                        },
                        {
                            label: 'Opt 2',
                            value: '2'
                        },
                        {
                            label: 'Opt 3',
                            value: '3'
                        }
                    ]
                },
                editing: {
                    enabled: true,
                    type: 'select',
                    options: {
                        options: [
                            {
                                label: 'Opt 1',
                                value: '1'
                            },
                            {
                                label: 'Opt 2',
                                value: '2'
                            }
                        ]
                    }
                }
            },
            {
                label: 'Toggle',
                id: 'toggle',
                filter: {
                    enabled: true,
                    type: 'checkbox',
                },
                editing: {
                    enabled: true,
                    type: 'checkbox'
                }
            }
        ];

        this.rows = [];
        this.remoteFilterHandler = this.remoteFilterHandler.bind(this);
        this.remoteSortHandler = this.remoteSortHandler.bind(this);
        this.createRows = this.createRows.bind(this);
        this.state = {
            rows: this.rows
        }
    }

    remoteFilterHandler(filters){
        // This is where Ajax requests are sent and then the rows in the state of this component should be updated to update the grid
        this.createRows(10);
    }

    remoteSortHandler(sortBy){
        // This is where Ajax requests are sent to sort. Sorting and filtering need to be combined, this component state need to store
        // both the sorting and filtering objects
        this.createRows(20);
    }

    componentWillMount(){
        this.createRows(5);
    }

    createRows(rowCount){
        this.rows = [];
        for (let i=0; i<rowCount; i++){
            this.rows.push([
                {
                    id: 'id',
                    value: Math.random() * 100
                },
                {
                    id: 'title',
                    value: 'Row #'+i,
                    editing: {
                        enabled: true,
                        type: 'text',
                    }
                },
                {
                    id: 'count',
                    value: 60.48,
                    editing: {
                        enabled: true,
                        type: 'number',
                        options: {
                            min: 0,
                            max: 1000
                        }
                    }
                },
                {
                    id: 'list',
                    value: 'Opt 1',
                    editing: {
                        enabled: true,
                        type: 'select',
                        options: {
                            options: [
                                {
                                    label: 'Opt 1',
                                    value: '1'
                                },
                                {
                                    label: 'Opt 2',
                                    value: '2'
                                }
                            ]
                        }
                    }
                },
                {
                    id: 'toggle',
                    value: (!!(i%2)),
                    editing: {
                        enabled: true,
                        type: 'checkbox'
                    }
                }
            ]);
        }
        this.setState({rows: this.rows});
    }

  render() {
    return (
      <Grid
          columns={this.columns}
          rows={this.state.rows}
          remoteFilterHandler={this.remoteFilterHandler}
          remoteSortHandler={this.remoteSortHandler}
      />
    );
  }
}

export default App;
