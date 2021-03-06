import React, { Component } from 'react';
import './Example.css';
import ReGrid from 're-grid';
import jQuery from 'jquery';

class Example extends Component {

    constructor(props){
        super(props);
        this.columns = [
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
                label: 'Items In stock',
                id: 'p_items_in_stock',
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
                        },
                        {
                            label: 'T-Shirts',
                            value: 'T-Shirts'
                        },
                        {
                            label: 'Swim Wear',
                            value: 'Swim Wear'
                        },
                        {
                            label: 'Accessories',
                            value: 'Accessories'
                        },
                        {
                            label: 'Electronics',
                            value: 'Electronics'
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
                            },
                            {
                                label: 'T-Shirts',
                                value: 'T-Shirts'
                            },
                            {
                                label: 'Swim Wear',
                                value: 'Swim Wear'
                            },
                            {
                                label: 'Accessories',
                                value: 'Accessories'
                            },
                            {
                                label: 'Electronics',
                                value: 'Electronics'
                            }
                        ]
                    }
                }
            }
        ];

        this.rows = [];
        this.remoteFilterHandler = this.remoteFilterHandler.bind(this);
        this.remoteSortHandler = this.remoteSortHandler.bind(this);
        this.loadProducts = this.loadProducts.bind(this);
        this.saveProducts = this.saveProducts.bind(this);
        this.state = {
            rows: this.rows,
            offset: 0,
            perPage: 4
        }
    }

    remoteFilterHandler(filters){
        // This is where Ajax requests are sent and then the rows in the state of this component should be updated to update the grid
        console.log(filters);
        this.setState({filters}, ()=>{
            this.loadProducts();
        });
    }

    remoteSortHandler(sort){
        // This is where Ajax requests are sent to sort. Sorting and filtering need to be combined, this component state need to store
        // both the sorting and filtering objects
        console.log(sort);
        this.setState({sort}, ()=> {
            this.loadProducts();
        })
    }

    componentWillMount(){
        this.loadProducts();
    }

    loadProducts(){

        const offset = this.state.offset;
        const perPage = this.state.perPage;
        let url = 'http://localhost/simple-cart/web/app_dev.php/api/products?offset='+offset+'&limit='+perPage;
        if(this.state.sort){
            url += '&sortBy='+this.state.sort.column+'&sortDir='+this.state.sort.direction;
        }

        jQuery.ajax({
            url: url,
            crossDomain: true,
            success: (response) =>{
                console.log(response);
                this.createRows(response);
            }
        });
    }

    createRows(data){
        this.rows = [];

        for (let product of data.products){
            this.rows.push([
                {
                    id: 'p_id',
                    value: product.p_id
                },
                {
                    id: 'p_product_name',
                    value: product.p_product_name,
                    editing: {
                        enabled: true,
                        type: 'text'
                    }
                },
                {
                    id: 'p_item_price',
                    value: product.p_item_price,
                    editing: {
                        enabled: true,
                        type: 'number',
                        options: {
                            min: 0,
                            max: 50000
                        }
                    }
                },
                {
                    id: 'p_items_in_stock',
                    value: product.p_items_in_stock,
                    editing: {
                        enabled: true,
                        type: 'number',
                        options: {
                            min: 0,
                            max: 10000
                        }
                    }
                },
                {
                    id: 'category_name',
                    value: product.category_name,
                    editing: {
                        enabled: true,
                        type: 'select',
                        options: {
                            options:[
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
                                },
                                {
                                    label: 'T-Shirts',
                                    value: 'T-Shirts'
                                },
                                {
                                    label: 'Swim Wear',
                                    value: 'Swim Wear'
                                },
                                {
                                    label: 'Accessories',
                                    value: 'Accessories'
                                },
                                {
                                    label: 'Electronics',
                                    value: 'Electronics'
                                }
                            ]
                        }
                    }
                }
            ]);
        }
        this.setState({
            rows: this.rows,
            pageCount: Math.ceil(data.meta.totalCount / data.meta.limit)
        });
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.perPage);

        this.setState({offset: offset}, () => {
            this.loadProducts();
        });
    };

    saveProducts(rowData){
        console.log(rowData);
    }

  render() {
    return (
      <ReGrid
          columns={this.columns}
          rows={this.state.rows}
          remoteFilterHandler={this.remoteFilterHandler}
          remoteSortHandler={this.remoteSortHandler}
          pageCount={this.state.pageCount}
          handlePageClick={this.handlePageClick}
          editSaveHandler={this.saveProducts}
      />
    );
  }
}

export default Example;
