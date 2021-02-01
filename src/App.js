import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Grid from './components/Grid/Grid';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import Title from './components/UI/Title/Title';
import {useDispatch} from 'react-redux';

import * as gridActions from './store/actions/grid';
import LoadingSpinner, {} from './components/UI/LoadingSpinner/LoadingSpinner';





function App(props) {
  const [isLoading, setIsLoading] = useState(false);
  const params = new URLSearchParams(document.location.search);


  const dispatch = useDispatch();



  const loadItems = useCallback(async (bannerId) => {
    setIsLoading(true);
    try {
      await dispatch(gridActions.initBannerItems(bannerId));
      setIsLoading(false);
    } catch (err){
      console.log(err.message)
    }
  });

  useEffect(() => {
    // check if we are on edit or create page
    if (window.location.pathname.split('/').slice(-2)[0].toLowerCase() === "edit"){
      console.log(window.location.pathname.split('/').slice(-2)[1]);
      loadItems(window.location.pathname.split('/').slice(-2)[1]);
    }
  }, []);



  let mainContent = (
    <React.Fragment>
      <Grid/>
    </React.Fragment>
  )

  if (isLoading){
    mainContent = <LoadingSpinner/>
  }

  return (
    <div  className="App">
      {mainContent}
    </div>
  );
}

export default App;
