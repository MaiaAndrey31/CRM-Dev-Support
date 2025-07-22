import styled from 'styled-components';

export const statusColors = {
  'novo pedido': '#007bff',
  'em processamento': '#ffc107',
  'enviado': '#17a2b8',
  'entregue': '#28a745',
  'cancelado': '#dc3545',
};

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background: ${({ color }) => color || '#6c757d'};
  color: #fff;
  @media (max-width: 500px) {
    font-size: 0.67rem;
    padding: 0.3rem 0.6rem;
  }
`;