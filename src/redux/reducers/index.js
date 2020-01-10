import {combineReducers} from "redux";
import productoReducer from "./productoReducer";
import validacionReducer from "./validacionReducer"

export default combineReducers({
    productos: productoReducer,
    error: validacionReducer
})