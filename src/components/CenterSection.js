import React, { Component, PropTypes } from 'react'
import _ from 'lodash';

export default class CenterSection extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
    };


    render() {
        const { items } = this.props;
        let curItem = items.filter(item => item.current);
        curItem = curItem[0];

        return (
            <div className="center">
                <div className="title">
                    INFO
                </div>
                <dl>
                    <dt>
                        Name:
                    </dt>
                    <dd>{curItem.name}</dd>
                </dl>
                <dl>
                    <dt>
                        Flags:
                    </dt>
                    <dd>
                        {curItem.flags.map(prop=>{
                            return(
                                <div key={'center_'+prop} className={'icon '+prop}></div>
                            )
                        })}
                    </dd>
                </dl>
            </div>
        )
    }
}
