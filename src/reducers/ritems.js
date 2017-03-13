import { ADD_ITEM, DELETE_ITEM, ADD_RIGHT_ITEM, SHOW_ITEM} from '../constants/actionTypes';
const initialState = [
    {
        name: 'Use Redux',
        flags: ['heart','flower','sun'],
        id: 104,
        current: true
    },
    {
        name: 'A',
        flags: ['flower','heart'],
        id: 101
    },
    {
        name: 'D',
        flags: ['flash','heart'],
        id: 102
    },
    {
        name: 'C',
        flags: ['sun','heart'],
        id: 103
    },
    {
        name: 'R',
        flags: ['flower','heart'],
        id: 105
    }
];
const arr = ['sun','heart','flower','flash'];
const addRanomFlags = ()=>{
    let rnd = Math.floor(Math.random() * (4));
    return arr[rnd];
};

while(initialState.length < 100){
    let length = initialState.length;
    let tmp = {
        name: 'item right '+length,
        flags: [],
        id: length+101,
    };
    while(tmp.flags.length < 2){
        let rnd = addRanomFlags();
        if(tmp.flags.indexOf(rnd)===-1){
            tmp.flags.push(rnd);
        }
    }

    initialState.push(tmp);
}
export default function ritems(state = initialState, action) {
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

        case DELETE_ITEM:
            return state.filter(item =>
                item.id !== action.id
            );

        case ADD_RIGHT_ITEM:
            return[
                action.obj,
                ...state
            ];

        case SHOW_ITEM:
            return state.map(item =>
                item.id === action.id ?
                    { ...item, current: true } :
                    { ...item, current: false }
            );

        default:
            return state
    }
}
