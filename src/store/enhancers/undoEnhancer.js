import Item from '../../models/item';
import {haveItemsChanged} from '../../utils/undoStackHandler';
import * as actions from '../actions/grid';

const freeItemKeys = [];

const initFreeItemKeys = () => {
  for (let i = 0; i < 10000; i++){
    freeItemKeys[i] = i + 2;
  }
}

initFreeItemKeys();

const getFreeItemKey = () => {
  return freeItemKeys.pop();
}


const undoEnhancer = createStore => (
    reducer,
    initialState,
    enhancer
  ) => {
    // setting initial state for each screen size
    initialState = {
      screenData: {
        XL: {
          addConst: 25,
          past: [],
          present: reducer(undefined, {}).grid.items.map(item => ({...item, i: getFreeItemKey()})),
          future: []
        },
        LG: {
          addConst: 22,
          past: [],
          present: [new Item(getFreeItemKey(),0,0,2,2)],
          future: []
        },
        SM: {
          addConst: 20,
          past: [],
          present: [new Item(getFreeItemKey(),0,0,2,2)],
          future: []
        },
        MD: {
          addConst: 218,
          past: [],
          present: [new Item(getFreeItemKey(),0,0,2,2)],
          future: []
        },
        XS: {
          addConst: 500,
          past: [],
          present: [new Item(getFreeItemKey(),0,0,2,2)],
          future: []
        },
      },
      currentScreenSize: "XL",
      addConst: 25,
      past: [],
      present: reducer(undefined, {}).grid.items.map(item => ({...item, i: getFreeItemKey()})),
      future: []
    }
    const undoRedoReducer = (state, action) => {
      let newItems, newPast, newFuture;
      switch (action.type){
        case "UNDO":
          if (state.past.length === 0)
            break;
          newItems = state.past.slice(-1)[0].map(item => ({...item, i: getFreeItemKey()}))
          newPast = state.past.slice(0,-1)
          newFuture = state.future;
          newFuture.push([...state.present]);
          let newAddConst = state.addConst + 20;
          return {
            ...state,
            addConst: newAddConst,
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
          newItems = state.future.slice(-1)[0].map(item => ({...item, i: getFreeItemKey()}))
          newPast = state.past;
          newPast.push([...state.present]);
          newFuture = state.future.slice(0,-1);
          let newAddConst1 = state.addConst + 20;
          return {
            ...state,
            addConst: newAddConst1,
            past: newPast,
            present: newItems,
            future: newFuture,
            grid: {
              ...state.grid,
              items: newItems
            }
          }

        case "SCREEN_CHANGE":
          console.log(`screen changed to ${action.screenSize}`)
          return {
            ...state,
            screenData: {
              ...state.screenData,
              [state.currentScreenSize]: {
                ...[state.currentScreenSize],
                past: state.past,
                present: state.grid.items,
                future: state.future,
                addConst: state.addConst
              }
            },
            currentScreenSize: action.screenSize,
            addConst: state.screenData[action.screenSize].addConst,
            past: state.screenData[action.screenSize].past,
            present: state.screenData[action.screenSize].present,
            future: state.screenData[action.screenSize].future,
            grid: {
              ...state.grid,
              items: state.screenData[action.screenSize].present
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
  
    return createStore(undoRedoReducer, initialState, enhancer)
  }

  export default undoEnhancer;