import * as types from '../constants/actionTypes'

export const addItem = (text,array) => ({ type: types.ADD_ITEM, text, array});
export const deleteItem = id => ({ type: types.DELETE_ITEM, id });
export const editItem = (id, text, array) => ({ type: types.EDIT_ITEM, id, text, array});
export const showItem = (id) => ({ type: types.SHOW_ITEM, id});
export const setOrder = (bool) => ({ type: types.SET_ORDER, bool});
export const addLeftItem = (obj,checked) => ({ type: types.ADD_LEFT_ITEM, obj, checked});
export const addRightItem = (obj) => ({ type: types.ADD_RIGHT_ITEM, obj});
