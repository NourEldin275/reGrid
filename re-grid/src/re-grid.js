/**
 * Created by nour on 9/2/17.
 */
import React, { Component } from 'react';
import HeaderRow from './header/columns-row';
import HeaderFiltersRow from './header/filters-row';
import TableBody from './body/table-body';
import ReactPaginate from 'react-paginate';
import './gridzilla.css';


class ReGrid extends Component{

    constructor(props){
        super(props);
        this.state = {
            filters: {},
            sort: {
                column: '',
                direction: ''
            },
            disableClearButton: true,
            clearFilters: false
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
        this.shouldClearButtonToggle = this.shouldClearButtonToggle.bind(this);
        this.onClearButtonClick = this.onClearButtonClick.bind(this);
        this.onFilterDatePickerChangeHandler = this.onFilterDatePickerChangeHandler.bind(this);
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
        }, ()=> {
            this.props.remoteSortHandler(this.state.sort);
            this.shouldClearButtonToggle();
        });
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

        this.setState({filters}, ()=>{
            if(field.type === 'checkbox' || field.type === 'select-one'){ // Fields that require no Enter key press
                this.props.remoteFilterHandler(this.state.filters);
            }
            this.shouldClearButtonToggle(); // If there are filters enable the clear button
        });

    }

    /**
     * Receives the filter name and the value to fire the filter handlers.
     * @param filterName
     * @param value
     */
    onFilterDatePickerChangeHandler(filterName, value){
        let filters = this.state.filters;
        filters[filterName] = value;

        this.setState({filters}, ()=>{
            this.props.remoteFilterHandler(this.state.filters);
            this.shouldClearButtonToggle();
        });
    }

    /**
     * This method will call the passed remote filter handler only when "Enter" key is pressed.
     * @param event
     */
    onFilterEnterHandler(event){
        if(this.state.filters && event.keyCode === 13 && event.target.validity.valid){
            this.props.remoteFilterHandler(this.state.filters);
        }
    }

    /**
     * Decides whether the clear button is enabled or disabled.
     */
    shouldClearButtonToggle(){

        let isClearButtonDisabled = !(Object.values(this.state.filters).length > 0 );
        let buttonAndFilterClearState = {disableClearButton: isClearButtonDisabled};
        if(!isClearButtonDisabled){
            buttonAndFilterClearState.clearFilters = false;
        }

        this.setState(buttonAndFilterClearState);
    }


    /**
     * Handler invoked when the clear filter button is clicked
     */
    onClearButtonClick(){
        this.setState({
            filters: {},
            disableClearButton: true,
            clearFilters: true
        }, ()=>{
            this.props.remoteFilterHandler(this.state.filters);
        });
    }

    componentDidUpdate(prevProps, prevState){
        // To toggle clearing filters just as soon as they are cleared
        // to allow filter component to be changed
        // without this, you have to enter the value in the filter twice
        if(prevState.clearFilters){
            this.setState({
                clearFilters: false
            });
        }
    }

    render(){
        const columns = this.props.columns;
        const rows = this.props.rows;
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="gridzilla-control-buttons col-md-12">
                        <button disabled={this.state.disableClearButton} onClick={this.onClearButtonClick}>
                            <span className="glyphicon glyphicon-repeat" aria-hidden="true"></span>
                            Clear Filters
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="gridzilla col-md-12">
                        <table className="table table-bordered table-responsive">
                            <thead>
                            <HeaderRow columns={columns} onSort={this.handleSort} />
                            <HeaderFiltersRow
                                columns={columns}
                                onFilterChangeHandler={this.onFilterChangeHandler}
                                onFilterEnterHandler={this.onFilterEnterHandler}
                                onFilterDatePickerChangeHandler={this.onFilterDatePickerChangeHandler}
                                clearFilters={this.state.clearFilters && this.state.disableClearButton}
                            />
                            </thead>
                            <TableBody rows={rows} editSaveHandler={this.props.editSaveHandler}/>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="gridzilla-pagination col-md-12">
                        <ReactPaginate previousLabel={"previous"}
                                       nextLabel={"next"}
                                       breakLabel={<a href="">...</a>}
                                       breakClassName={"break-me"}
                                       pageCount={this.props.pageCount}
                                       marginPagesDisplayed={2}
                                       pageRangeDisplayed={5}
                                       onPageChange={this.props.handlePageClick}
                                       containerClassName={"pagination"}
                                       subContainerClassName={"pages pagination"}
                                       activeClassName={this.props.activeClassName}
                                       nextClassName={this.props.nextClassName}
                                       previousClassName={this.props.previousClassName}
                                       pageClassName={this.props.pageClassName}
                                       disabledClassName={this.props.disabledClassName}
                                       forcePage={this.props.forcePage}

                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ReGrid;