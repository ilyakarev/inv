import React, { Component, PropTypes } from 'react'
import Item from './item'
import {SORT_PROP_FILTER,SHOW_ALL} from '../constants/filterTypes'

const contains = (where, what) => {
    for(let i=0; i<what.length; i++){
        //console.log(where.indexOf(what[i]));
        if(where.indexOf(what[i]) === -1) return false;
    }
    return true;
};
export default class RightSection extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

    state = ({filter: SHOW_ALL, checked: []});

    setOrder(){
        this.props.actions.setOrder(!this.state.checked);
        this.setState({filter:this.state.filter, checked: !this.state.checked});
    }

    handleCheck(text){
        let checked = this.state.checked;
        if(checked.indexOf(text)>-1){
            checked = checked.filter((elem)=>{
                return elem !== text
            });
        }else{
            checked.push(text);
        }
        if(checked.length >0){
            this.setState({filter: SORT_PROP_FILTER, checked: checked});
        }else{
            this.setState({filter: SHOW_ALL, checked: checked});
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
        this.props.actions.addRightItem(tmp,this.state.checked);
    }

    render() {
        const { items, actions  } = this.props;
        const { filter, checked } = this.state;
        let filteredItems = items;
        if(filter === SORT_PROP_FILTER){
            filteredItems = filteredItems.filter(item => contains(item.flags,checked));
        }

        return (
            <div className="rightSide">
                <div className="header">
                    Filters:
                    <input type="checkbox" className="labeled" onChange={()=> this.handleCheck('flower')} id="flower"/>
                    <label className="icon" htmlFor="flower"/>

                        <input type="checkbox" className="labeled" onChange={()=> this.handleCheck('heart')} id="heart"/>
                        <label className="icon" htmlFor="heart"/>

                            <input type="checkbox" className="labeled" onChange={()=> this.handleCheck('sun')} id="sun"/>
                            <label className="icon" htmlFor="sun"/>

                                <input type="checkbox" className="labeled" onChange={()=> this.handleCheck('flash')} id="flash"/>
                                <label className="icon" htmlFor="flash"/>

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
