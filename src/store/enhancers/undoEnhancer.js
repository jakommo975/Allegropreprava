import {haveItemsChanged} from '../../utils/undoStackHandler';
import * as actions from '../actions/grid';

const undoEnhancer = createStore => (
    reducer,
    initialState,
    enhancer
  ) => {
    initialState = {
      addConst: 25,
      past: [],
      present: reducer(undefined, {}).grid.items,
      future: []
    }
    const monitoredReducer = (state, action) => {
      let newItems, newPast, newFuture;
      switch (action.type){
        case "UNDO":
          if (state.past.length === 0)
            break;
          newItems = state.past.slice(-1)[0].map(item => ({...item, i: item.i+state.addConst}))
          newPast = state.past.slice(0,-1)
          newFuture = state.future;
          newFuture.push([...state.present]);
          return {
            ...state,
            addConst: state.addConst + 20
            ,
            past: newPast,
            present: newItems,
            future: newFuture,
            grid: {
              ...state.grid,
              items: newItems
            }
          }  
        case "REDO":
          if (state.future.length === 0)
            break;
          newItems = state.future.slice(-1)[0].map(item => ({...item, i: item.i+state.addConst}))
          newPast = state.past;
          newPast.push([...state.present]);
          newFuture = state.future.slice(0,-1)
          return {
            ...state,
            addConst: state.addConst + 20
            ,
            past: newPast,
            present: newItems,
            future: newFuture,
            grid: {
              ...state.grid,
              items: newItems
            }
          }  
      }
  
      const newState = reducer(state, action)
      
      
      if (action.type === actions.INIT_ITEMS){
        return {
          ...state,
          ...newState,
          past: [],
          future: [],
          present: [...newState.grid.items]
        }
      }
      
  
      if (haveItemsChanged(newState.grid.items, state.present)){
        let newPast = state.past;
        newPast.push(state.present);
        return {
          ...state,
          past: newPast,
          present: [
            ...newState.grid.items
          ],
          future: [],
          ...newState,
        }
      }
      return {
        ...state,
        ...newState
      }
    }
  
    return createStore(monitoredReducer, initialState, enhancer)
  }

  export default undoEnhancer;