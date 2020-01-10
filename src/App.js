import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"

import store from "./redux/store";
import {Provider} from "react-redux";

import Header from "./componentes/Header";
import NuevoProducto from "./componentes/NuevoProducto";
import Productos from "./componentes/Productos";
import EditarProducto from "./componentes/EditarProducto";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header  />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Productos}/>
            <Route exact path="/productos/nuevo" component={NuevoProducto}/>
            <Route exact path="/productos/editar/:id" component={EditarProducto}/>
          </Switch>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
