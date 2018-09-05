import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import booker from './reducers';

const store = createStore(booker)
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
    <App 
        value={store.getState()}
        onNext={() => store.dispatch({type: 'NEXT'})}
        onPrevious={() => store.dispatch({type: 'PREVIOUS'})}
    />, 
    rootEl
);

render();
registerServiceWorker();
store.subscribe(render)