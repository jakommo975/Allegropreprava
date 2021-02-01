
export const haveItemsChanged = (oldItems, newItems) => {
    if (oldItems.length !== newItems.length)
        return true;

    let value = false;
    oldItems.forEach(oldItem => {
        let newItem = newItems.find(el => el.id === oldItem.id);
        if (newItem.x !== oldItem.x)
        {
            value = true;
        }
        if (newItem.y !== oldItem.y)
        {
            value = true;
        }
        if (newItem.w !== oldItem.w)
        {
            value = true;
        }
        if (newItem.h !== oldItem.h)
        {
            value = true;
        }
        if (newItem.imgUrl !== oldItem.imgUrl)
        {
            console.log("img")
            value = true;
        }
        if (newItem.products.length !== oldItem.products.length){
            value = true;
        } else {
            for (let i = 0; i < newItem.products.length; i++){
                if (newItem.products[i] !== oldItem.products[i]){
                    value = true;
                }
            }
        }
    })
    if (value){
        return true;
    }
    return false;
}

export const undoSaver = store => {
    return next => {
      return action => {
        console.log("[Middleware] current state", store.getState());
        console.log('[Middleware] Dispatching', action);
        const result = next(action);
        console.log("[Middleware] next state", store.getState());
        return result;
      }
    }
}