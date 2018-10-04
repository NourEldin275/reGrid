# React GridZilla:  A React Data Grid Library

A React library utilizing Bootstrap tables and other Bootstrap CSS
components such as Glyphicons to build a robust grid. The grid 
receives the data and fires events for editing an sorting executing
the passed handler. This allows you to do whatever you'd like
when for example a user types a filter or clicks a column to sort.

### Community React Components Used:-
- [**react-dates**](https://github.com/airbnb/react-dates)
- [**react-day-picker**](https://github.com/gpbl/react-day-picker)
- [**react-paginate**](https://github.com/AdeleD/react-paginate)

### Note: 
Some props and configuration are just exposed props of the used components. Especially the `react-paginate` component.

### How To Use: 

- Run `npm install re-grid`
- Add import `import ReGrid from './re-grid';`

To render the grid you need to pass it some props:-
- `columns` -- `array`: Configuration of columns and their filters
- `rows` -- `array`: The actual data
- `remoteFilterHandlerfilters` -- `callback`: Callback that gets the filters as an object. Here you can execute you're server-side/client-side filtering
- `remoteExportHandlerfilters` -- `callback`: Same as filter callback but only fired when click the export button
- `isExportButtonEnabled` -- `bool`: Enable/disable export button
- `remoteSortHandlersort` -- `callback`: Callback that gets `sort` object having the `column` and `direction`.
- `pageCount` -- `integer`: Number of pages to display
- `handlePageClick(data)` -- `callback`: Fired whenver `next` or `previous` buttons are clicked. This is where you issue a request to you're data source to get next or previous set.
- `forcePage` -- `integer`: Page number to force. Usually set to current page.
- `activeClassName` -- `string`: Class name of active buttons
- `nextClassName` -- `string`: Class name of `next` button.
- `previousClassName` -- `string`: Class name of `previous` button.
- `pageClassName` -- `string`: Class name to assign to the page.
- `disabledClassName` -- `string`: Class name to use for disabled buttons
- `editSaveHandler(data)` -- `callback`: Call back fired when submitting row edits.

#### Column structure:-
@TODO: Segregate different column structure explanation.

```javascript
columns = [
            {
                label: 'ID',
                id: 'p_id',
                filter: {
                    enabled: false
                }
            },
            {
                label: 'Product Name',
                id: 'p_product_name',
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
                label: 'Item Price',
                id: 'p_item_price',
                filter: {
                    enabled: true,
                    type: 'number',
                    min: 0,
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
                label: 'Category',
                id: 'category_name',
                filter: {
                    enabled: true,
                    type: 'select',
                    options: [
                        {
                            label: '...',
                            value: ''
                        },
                        {
                            label: 'Books',
                            value: 'Books'
                        },
                        {
                            label: 'Shoes',
                            value: 'Shoes'
                        }
                    ]
                },
                editing: {
                    enabled: true,
                    type: 'select',
                    options: {
                        options: [
                            {
                                label: '...',
                                value: ''
                            },
                            {
                                label: 'Books',
                                value: 'Books'
                            },
                            {
                                label: 'Shoes',
                                value: 'Shoes'
                            }
                        ]
                    }
                }
            },
            {
                label: 'Date Range',
                id: 'product_date',
                filter:{
                    enabled: true,
                    type: 'date_range',
                    options: {
                        format: "YYYY/MM/DD", // Optional,
                        startDatePlaceholder: 'Start Date', // Optional,
                        endDatePlaceholder: 'End Date', // Optional,
                    }
                }
            },
            {
                label: 'Date',
                id: 'category_date',
                filter:{
                    enabled: true,
                    type: 'date',
                    options: { // Optional
                        format: "YYYY/MM/DD", // Optional
                        fromMonth: new Date(new Date(30,0).getFullYear(), 0), // Optional
                        toMonth: new Date(new Date().getFullYear() + 2, 11) // Optional
                    }
                }
            }
        ];
```
#### Grid Component with the props:-
```javascript
<ReGrid
          columns={columns}
          rows={this.state.rows}
          remoteFilterHandler={this.remoteFilterHandler}
          remoteExportHandler={this.remoteExportHandler}
          isExportButtonEnabled={this.state.isExportButtonEnabled}
          remoteSortHandler={this.remoteSortHandler}
          pageCount={this.state.pageCount}
          handlePageClick={this.handlePageClick}
          editSaveHandler={this.saveProducts}
      />
``` 

For now you can check `App.js` in the `src` folder for an example
from the git repo.

### Features:
* Filtering
    - Date range
    - Date
    - Text
    - Number
    - Select Menu
* Sorting
* Editing
* Pagination
* Available Field Types:
    - Text
    - Checkbox
    - Select
    - Number
    - Date Picker (To Be included)
    
### Note:-
This library is still in development phase.