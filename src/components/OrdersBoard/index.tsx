import { useState } from 'react';
import { OrderType } from '../../types/Order';
import { Board, OrdersContainer } from './styles';
import OrderModal from '../OrderModal';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: OrderType[];
}

const OrdersBoard: React.FC<OrdersBoardProps> = ({ icon, title, orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = (order: OrderType) => {
    setIsModalVisible(true);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setIsModalVisible(true);
    setSelectedOrder(null);
  };

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map(order => (
            <button
              key={order._id}
              type="button"
              onClick={() => handleOpenModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
};

export default OrdersBoard;
