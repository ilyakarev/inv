import { combineReducers } from 'redux'
import items from './item'
import ritems from './ritems'

const rootReducer = combineReducers({
    items,
    ritems
});

export default rootReducer
