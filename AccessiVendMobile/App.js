import React from 'react';
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducers from './src/reducers';
import RootRouter from "./src/components/RootRouter";

export default class App extends React.Component {
  render() {
    return (
        <Provider store={createStore(reducers)}>
            <RootRouter/>
        </Provider>
    );
  }
}


