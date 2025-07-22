
import PropTypes from 'prop-types';
import { CloseButton, ModalContent, ModalHeader, ModalOverlay, ModalTitle } from './styles';

export default function OrderModal({ show, pedido, onClose, onNotify, onStatusChange, onRastreioChange, onStatusUpdate }) {
  if (!pedido) return null;
  return (
    <ModalOverlay show={show}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Detalhes do Pedido #{pedido.id}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <div>
          <h3>Informações do Cliente</h3>
          <p><strong>Nome:</strong> {pedido.nome}</p>
          <p><strong>Email:</strong> {pedido.email}</p>
          <p><strong>Telefone:</strong> {pedido.telefone}</p>
          <p><strong>CPF:</strong> {pedido.cpf}</p>
          <h3>Endereço de Entrega</h3>
          <p>{pedido.enderecoCompleto}</p>
          <p><strong>CEP:</strong> {pedido.cep}</p>
          <h3>Status do Pedido</h3>
          <select value={pedido.status} onChange={e => onStatusChange(e.target.value)}>
            <option value="Novo pedido">Novo pedido</option>
            <option value="Em processamento">Em processamento</option>
            <option value="Enviado">Enviado</option>
            <option value="Entregue">Entregue</option>
            <option value="Cancelado">Cancelado</option>
          </select>
          <button className="btn" onClick={onStatusUpdate} style={{marginLeft: '1rem'}}>Atualizar</button>
          <div style={{marginTop: '1rem'}}>
            <label>Código de Rastreio:</label>
            <input type="text" value={pedido.codigoRastreio || ''} onChange={e => onRastreioChange(e.target.value)} />
          </div>
          <h3>Bônus Escolhido</h3>
          <p>{pedido.bonusEscolhido}</p>
          <h3>Histórico de Atualizações</h3>
          <ul>
            {(pedido.historicoAtualizacoes || []).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
        <div style={{marginTop: '2rem', display: 'flex', gap: '1rem'}}>
          <button className="btn btn-secondary" onClick={onClose}>Fechar</button>
          <button className="btn btn-primary" onClick={onNotify}>Enviar Notificação</button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}

OrderModal.propTypes = {
  show: PropTypes.bool.isRequired,
  pedido: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nome: PropTypes.string,
    email: PropTypes.string,
    telefone: PropTypes.string,
    cpf: PropTypes.string,
    enderecoCompleto: PropTypes.string,
    cep: PropTypes.string,
    status: PropTypes.string,
    codigoRastreio: PropTypes.string,
    bonusEscolhido: PropTypes.string,
    historicoAtualizacoes: PropTypes.arrayOf(PropTypes.string),
  }),
  onClose: PropTypes.func.isRequired,
  onNotify: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onRastreioChange: PropTypes.func.isRequired,
  onStatusUpdate: PropTypes.func.isRequired,
};
