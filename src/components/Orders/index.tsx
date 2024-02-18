import { useEffect, useState } from 'react';
import { OrderType } from '../../types/Order';
import OrdersBoard from '../OrdersBoard';
import { Container } from './styles';
import { api } from '../../utils/api';

interface OrderProps {}

const Order: React.FC<OrderProps> = ({}) => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    api.get('/orders').then(({ data }) => setOrders(data));
  }, []);

  const waiting = orders.filter(order => order.status === 'WAITING');
  const production = orders.filter(order => order.status === 'IN_PRODUCTION');
  const done = orders.filter(order => order.status === 'DONE');

  const handleCancelOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order._id !== orderId));
  };

  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
      />
      <OrdersBoard
        icon="👨‍🍳"
        title="Em preparação"
        orders={production}
        onCancelOrder={handleCancelOrder}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
      />
    </Container>
  );
};

export default Order;
