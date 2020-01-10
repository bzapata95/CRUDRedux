import React, { useEffect, useRef } from 'react'
import Swal from "sweetalert2";

import { useDispatch, useSelector} from 'react-redux';
import { obtenerProductoEditarAction, editarProductoAction } from "../actions/productosActions"
import {validarFormularioAction, validacionExito, validacionError} from "../actions/validacionActions"

export default function EditarProducto({match, history}) {

    // Crear los refs
    const nombreRef = useRef('')
    const precioRef = useRef('')

    const dispatch = useDispatch();

    const editarProducto = producto => dispatch(editarProductoAction(producto));

    const validarFormulario = () => dispatch(validarFormularioAction())
    const exitoValidacion = () => dispatch(validacionExito());
    const errorValidacion = () => dispatch(validacionError());
    
    const {id} = match.params;

    useEffect(() => {
        dispatch(obtenerProductoEditarAction(id))
    }, [dispatch, id])

    //Acceder al state
    const producto = useSelector(state => state.productos.producto)
    const error = useSelector(state => state.productos.error)

    //Cuando carga la api
    if(!producto) return "Cargando..."

    const submitEditarPorducto = e => {
        e.preventDefault();

        // Validar el formulario
        validarFormulario();

        if(!nombreRef.current.value || !precioRef.current.value){
            errorValidacion();
            return
        }
        
        // no hay error
        exitoValidacion();

        // Guardar los cambios
        editarProducto({
            id,
            nombre: nombreRef.current.value,
            precio: precioRef.current.value
        })

        Swal.fire("Exito", "Producto editado correctamente", "success")

        // Redireccionar
        history.push("/");
        
    }

    return (
        <div className="row justify-content-center mt-5">
        <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center">Editar Producto</h2>
                    <form onSubmit={submitEditarPorducto}>
                        <div className="form-group">
                            <label>Titulo</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Titulo"
                                defaultValue={producto.nombre}
                                ref={nombreRef}
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio del Producto</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Precio" 
                                defaultValue={producto.precio}
                                ref={precioRef}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar Cambios</button>
                    </form>
                    { error && <div className="alert alert-danger text-center mt-4">Hubo un error intente de nuevo</div>}
                </div>
            </div>
        </div>
    </div>
    )
}
