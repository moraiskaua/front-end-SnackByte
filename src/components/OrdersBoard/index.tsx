import { useState } from 'react';
import { OrderType } from '../../types/Order';
import { Board, OrdersContainer } from './styles';
import OrderModal from '../OrderModal';
import { api } from '../../utils/api';
import toast from 'react-hot-toast';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: OrderType[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: OrderType['status']) => void;
}

const OrdersBoard: React.FC<OrdersBoardProps> = ({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeOrderStatus,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = (order: OrderType) => {
    setIsModalVisible(true);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setIsModalVisible(true);
    setSelectedOrder(null);
  };

  const handleChangeOrderStatus = () => {
    setIsLoading(true);
    const status =
      selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';
    api.patch(`/orders/${selectedOrder?._id}`, { status });
    onChangeOrderStatus(selectedOrder!._id, status);
    toast.success(
      `O pedido da mesa ${selectedOrder?.table} teve o status alterado!`,
    );
    setIsLoading(false);
    setIsModalVisible(false);
  };

  const handleCancelOrder = async () => {
    setIsLoading(true);
    await api.delete(`/orders/${selectedOrder?._id}`);
    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`);
    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  };

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        isLoading={isLoading}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
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
