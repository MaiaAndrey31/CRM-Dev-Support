import StatusBadge from '../StatusBadge';
import { TableContainer, Table } from './styles';
import PropTypes from 'prop-types';
import { PencilIcon, EyeIcon } from '@phosphor-icons/react';

export default function OrdersTable({ pedidos, onView, onEdit }) {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Tipo de Troféu</th>
            <th>Status</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length === 0 ? (
            <tr>
              <td colSpan={7} className="loading">Carregando pedidos...</td>
            </tr>
          ) : (
            pedidos.map(pedido => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.nome}</td>
                <td>{pedido.telefone}</td>
                <td>{pedido.tipoTrofeu || 'Não informado'}</td>
                <td><StatusBadge status={pedido.status} /></td>
                <td>{pedido.criado_em}</td>
                <td>
                  <button className="btn btn-icon" title="Visualizar" onClick={() => onView(pedido)}>
                  <EyeIcon size={26} weight="bold"/>
                  </button>
                  <button className="btn btn-icon" title="Editar" onClick={() => onEdit(pedido)}>
                  <PencilIcon size={26} weight="bold" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
}

OrdersTable.propTypes = {
  pedidos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
