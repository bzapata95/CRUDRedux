import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

//Redux
import { useDispatch } from 'react-redux';
import { borrarProdcutoAction } from '../actions/productosActions';

export default function Producto({ producto }) {
	const dispatch = useDispatch();

	const confirmarEliminarProducto = (id) => {
        //Confirmación de sweet alert
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText:'Cancelar'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Eliminado!',
                'Los datos se eliminaron correctamente',
                'success'
              )
              dispatch(borrarProdcutoAction(id));
            }
          })
		console.log(id);
		
	};
	return (
		<tr>
			<td>{producto.nombre}</td>
			<td>
				<span className="font-weight-bold">$ </span>
				{producto.precio}
			</td>
			<td className="acciones">
				<Link to={`/productos/editar/${producto.id}`} className="btn btn-primary mr-2">
					Editar
				</Link>

				<button className="btn btn-danger" onClick={() => confirmarEliminarProducto(producto.id)}>
					Eliminar
				</button>
			</td>
		</tr>
	);
}
