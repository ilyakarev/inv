import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LeftSection from '../components/LeftSection'
import CenterSection from '../components/CenterSection'
import RightSection from '../components/RightSection'
import * as ItemsActions from '../actions'

const App = ({items, allItems, rItems, actions}) => (
    <div>
        <LeftSection items={items} actions={actions} />
        <CenterSection items={allItems}/>
        <RightSection items={rItems} actions={actions} />
    </div>
);

App.propTypes = {
    items: PropTypes.array.isRequired,
    rItems: PropTypes.array.isRequired,
    allItems: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    items: state.items,
    allItems: state.items.concat(state.ritems),
    rItems: state.ritems
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ItemsActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
