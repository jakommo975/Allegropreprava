import React, {useState, useCallback, useEffect} from 'react'
import './ContextMenu.css'


  const ContextMenu = (props) => {
    /*
    const menuBgStyle = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      backgorundColor: 'transparent',
      width: window.innerWidth - 10,
      height: window.innerHeight,
      zIndex: '1'
  };
    return (
      <div onContextMenu={handleBgContextMenu} onClick={() => {setShowMenu(false)}} style={props.showMenu ? menuBgStyle : {}}></div>
      <div style={style.current}>
      {showMenu &&
          <div className="ContextMenu" >
              <div className="ContextMenuItem" onClick={() => {setModalIsOpen(true); setShowMenu(false);}}>Edit Item</div>
              <div className="ContextMenuItem" onClick={divideHorizontally.bind(this, contextMenuItemId.current)}>Divide Horizontally</div>
              <div className="ContextMenuItem" onClick={divideVertically.bind(this, contextMenuItemId.current)}>Divide Vertically</div>
              <div className="ContextMenuItem" onClick={deleteItem.bind(this, contextMenuItemId.current)}>Delete Item</div>
          </div>
      }
      </div>
    );*/
  };

export default ContextMenu;