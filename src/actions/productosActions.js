import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_SUCCESS,
	AGREGAR_PRODUCTO_ERROR,
	COMENZAR_DESCARGA_PRODUCTOS,
	DESCARGA_PRODUCTOS_EXITOSA,
	DESCARGA_PRODUCTOS_ERROR,
	OBTENER_PRODUCTO_ELIMINAR,
	PRODUCTO_ELIMINADO_EXITO,
	PRODUCTO_ELIMINADO_ERROR,
	OBTENER_PRODUCTO_EDITAR,
	PRODUCTO_EDITAR_EXITO,
	PRODUCTO_EDITAR_ERROR,
	COMENZAR_EDICION_PRODUCTO,
	PRODUCTO_EDITADO_EXITO,
	PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';

// Crear un nuevo producto - Función principal
export function crearNuevoProductoAction(producto) {
	return (dispatch, getState) => {
		dispatch(nuevoProducto());

		//Insertar en la API
		clienteAxios
			.post('/libros', producto)
			.then((res) => {
				console.log(res);

				dispatch(agregarProductoExito(producto));
			})
			.catch((err) => {
				console.log(err);
				dispatch(agregarProductoError());
			});
	};
}

export const nuevoProducto = () => ({
	type: AGREGAR_PRODUCTO
});

export const agregarProductoExito = (producto) => ({
	type: AGREGAR_PRODUCTO_SUCCESS,
	payload: producto
});

export const agregarProductoError = (error) => ({
	type: AGREGAR_PRODUCTO_ERROR
});

// Obtener listado de productos (Consultar API)
export function obtenerProductosAction() {
	return (dispatch, getState) => {
		dispatch(obtenerProductosComienzo());

		//Consultar la api
		clienteAxios
			.get('/libros')
			.then((res) => {
				dispatch(descargaProductosExitosa(res.data));
			})
			.catch((err) => {
				dispatch(descargaProductosError());
			});
	};
}

export const obtenerProductosComienzo = () => ({
	type: COMENZAR_DESCARGA_PRODUCTOS
});

export const descargaProductosExitosa = (productos) => ({
	type: DESCARGA_PRODUCTOS_EXITOSA,
	payload: productos
});

export const descargaProductosError = () => ({
	type: DESCARGA_PRODUCTOS_ERROR
});

// Funcion que elimina un producto en específico
export function borrarProdcutoAction(id) {
	return (dispatch, getState) => {
        dispatch(obtenerProductoEliminar());
        
        // Eliminar en la API
        clienteAxios.delete(`/libros/${id}`)
        .then( res => {
            dispatch(eliminarProductoExito(id))
        })
        .catch(erro => {
            dispatch(eliminarProductoError())
        })
	};
}

export const obtenerProductoEliminar = () => ({
	type: OBTENER_PRODUCTO_ELIMINAR
});

export const eliminarProductoExito = id => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: id
})

export const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR
})

//Obtener el producto a editar
export function obtenerProductoEditarAction(id) {
	return (dispatch, getState) => {
		dispatch(obtenerProductoAction());

		//obtener producto de la api
		clienteAxios.get(`/libros/${id}`)
		.then(res => {
			dispatch(obtenerProductoEditarExito(res.data))
		})
		.catch(err => {
			dispatch(obtenerProductoEditarError())
		})
	}
}

export const obtenerProductoAction = () => ({
	type:OBTENER_PRODUCTO_EDITAR
})

export const obtenerProductoEditarExito = producto => ({
	type: PRODUCTO_EDITAR_EXITO,
	payload: producto
})

export const obtenerProductoEditarError = () => ({
	type: PRODUCTO_EDITAR_ERROR
})

// Modifica un producto en la API y state
export function editarProductoAction(producto) {
	return dispatch => {
		dispatch(comenzarEdicionProducto())

		//Consultar api
		clienteAxios.put(`/libros/${producto.id}`, producto)
		.then(res => {
			// console.log(res)
			dispatch(editarProductoExito(res.data))
		})
		.catch(err => {
			dispatch(editarProductoError())
		})
	}
}

export const comenzarEdicionProducto = () => ({
	type: COMENZAR_EDICION_PRODUCTO
})

export const editarProductoExito = producto => ({
	type: PRODUCTO_EDITADO_EXITO,
	payload: producto
})

export const editarProductoError = () => ({
	type:PRODUCTO_EDITADO_ERROR
})