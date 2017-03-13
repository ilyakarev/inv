import React, { Component, PropTypes } from 'react'
export default class Item extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        editItem: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        addItem: PropTypes.func.isRequired,
        showItem: PropTypes.func.isRequired,
    };

    onDragStart(e) {
        let target = e.target;
        target.style.opacity = '0.4';
        window.draggedItem = this.props.item;
    };
    onDragEnd(e) {
        let target = e.target;
        target.style.opacity = '1';
        window.draggedItem = null;

    };
    render() {
        const {item, showItem} = this.props;

        return (
            <div className={!!item.current ?'side--item active' :'side--item'}
                 onClick={() => showItem(item.id)}
                 draggable="true"
                 onDragStart={(e)=>this.onDragStart(e,this)}
                 onDragEnd={(e)=>this.onDragEnd(e,this)}
            >
                {item.name}
                <div className="labels">
                {item.flags.map(prop=>{
                    return(
                        <div key={'item_'+prop} className={'icon '+prop}></div>
                    )
                })}
                </div>
            </div>
        )
    }
}
