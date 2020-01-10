import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosAction } from '../actions/productosActions';

import Producto from './Producto';

export default function Productos() {
	//Mandar a llamar la acción
	const dispatch = useDispatch();

	useEffect(() => {
		const cargarProductos = () => dispatch(obtenerProductosAction());
		cargarProductos();
	}, []);

	// Acceder al state
	const loading = useSelector((state) => state.productos.loading);
	const error = useSelector((state) => state.productos.error);
	const productos = useSelector((state) => state.productos.productos);

	return (
		<React.Fragment>
			{error && <div className="font-weight-bold alert alert-danger text-center">Hubo un error</div>}
			
				
            <h2 className="text-center my-5">Listado de Productos</h2>

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>{productos.map((producto) => <Producto key={producto.id} producto={producto} />)}</tbody>
            </table>
            {loading && 'CARGANDO...'}
				
			
		</React.Fragment>
	);
}
