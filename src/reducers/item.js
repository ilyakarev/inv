import { ADD_ITEM, DELETE_ITEM, SHOW_ITEM, SET_ORDER, ADD_LEFT_ITEM} from '../constants/actionTypes';
import _ from 'lodash';
const initialStateLeft = [
    {
        name: 'Use Redux',
        flags: ['sun','flower'],
        id: 0
    },
    {
        name: 'Alas',
        flags: ['flower','heart'],
        id: 1
    },
    {
        name: 'Down',
        flags: ['flash','heart'],
        id: 2
    },
    {
        name: 'Cucumber',
        flags: ['sun','flower'],
        id: 3
    },
    {
        name: 'Rich',
        flags: ['sun','heart'],
        id: 4
    }
];
const arr = ['sun','heart','flower','flash'];
const addRanomFlags = ()=>{
    let rnd = Math.floor(Math.random() * (4));
    return arr[rnd];
};

while(initialStateLeft.length < 101){
    let length = initialStateLeft.length;
    let tmp = {
        name: 'item '+length,
        flags: [],
        id: length,
    };
    while(tmp.flags.length < 2){
        let rnd = addRanomFlags();
        if(tmp.flags.indexOf(rnd)===-1){
            tmp.flags.push(rnd);
        }
    }

    initialStateLeft.push(tmp);
}
const sortedInitialState = _.sortBy(initialStateLeft, [function(o) { return o.name; }]);

export default function items(state = sortedInitialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            return [
                {
                    id: state.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1,
                    text: action.text,
                    array: action.array,
                },
                ...state
            ];

        case ADD_LEFT_ITEM:
            let newState = [
                action.obj,
                ...state
            ];
            newState = _.sortBy(newState, [function(o) { return o.name; }]);
            if(!action.checked){
                let result = [], ii = newState.length;
                for (let i = ii-1; i > -1; i--){
                    result.push(newState[i]);
                }
                newState = result;
            }
            return newState;

        case DELETE_ITEM:
            return state.filter(item =>
                item.id !== action.id
            );

        case SHOW_ITEM:
            return state.map(item =>
                item.id === action.id ?
                    { ...item, current: true } :
                    { ...item, current: false }
            );

        case SET_ORDER:
            //console.log(state);
            let result = [], ii = state.length;
            for (let i = ii-1; i > -1; i--){
                result.push(state[i]);
            }
            return result;

        default:
            return state
    }
}
