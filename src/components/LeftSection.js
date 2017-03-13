import React, { Component, PropTypes } from 'react'
import Item from './item'
import {TEXT_FILTER,SHOW_ALL} from '../constants/filterTypes'

export default class LeftSection extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

    state = ({filter: SHOW_ALL, checked: true, textFilter: ''});

    setOrder(){
        this.props.actions.setOrder(!this.state.checked);
        this.setState({filter:this.state.filter, checked: !this.state.checked});
    }

    handleTextFilter(){
        if(this.refs.filterText.value.length > 0){
            this.setState({filter: TEXT_FILTER, checked: this.state.checked, textFilter: this.refs.filterText.value });
        }
        else{
            this.setState({filter: SHOW_ALL, checked: this.state.checked, textFilter: '' });
        }
    }

    onDragEnter(e){
        e.preventDefault();
    }
    onDragLeave(e){
        e.preventDefault();
    }
    onDrop(e){
        e.preventDefault();
        let tmp = window.draggedItem;
        this.props.actions.deleteItem(tmp.id);
        this.props.actions.addLeftItem(tmp,this.state.checked);
    }

    render() {
        const { items, actions  } = this.props;
        const { filter, checked, textFilter } = this.state;
        let filteredItems = items;
        if(filter !== SHOW_ALL){
            filteredItems = items.filter((item) => {
                let tolower = item.name.toLowerCase();
                return tolower.indexOf(textFilter.toLowerCase()) > -1;
            });
        }

        return (
            <div className="leftSide">
                <div className="header">
                    <div className="sort">
                        Sort:
                        <input type="checkbox"
                               id="sort"
                               defaultChecked={checked}
                               onChange={this.setOrder.bind(this)}
                        />
                        <label htmlFor="sort"></label>
                    </div>
                    <div className="filterText">
                        <input type="text" ref="filterText" onChange={this.handleTextFilter.bind(this)}/>
                    </div>
                </div>
                <div className="side-list"
                     onDragEnter={(e)=>this.onDragEnter(e)}
                     onDragOver={(e)=>this.onDragEnter(e)}
                     onDragLeave={(e)=>this.onDragLeave(e)}
                     onDrop={(e)=>this.onDrop(e)}>
                    {filteredItems.map(item =>
                        <Item key={item.id} item={item} {...actions}/>
                    )}
                </div>
            </div>
        )
    }
}
