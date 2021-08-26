import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalState from './contexts/GlobalState';
import CurrentPlaying from './contexts/CurrentPlaying';
import GlobalCartItems from './contexts/CartContext';
import  GlobalSearchContext  from './contexts/SearchContext';

const INDEX = () => (
<CurrentPlaying>
<GlobalCartItems>
<GlobalState>
<GlobalSearchContext>
<App />
</GlobalSearchContext>
</GlobalState>
</GlobalCartItems>
</CurrentPlaying> );

ReactDOM.render(
  
   <INDEX/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
