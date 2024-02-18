import { useEffect, useState } from 'react';
import { OrderType } from '../../types/Order';
import OrdersBoard from '../OrdersBoard';
import { Container } from './styles';
import { api } from '../../utils/api';
import socketIo from 'socket.io-client';

interface OrderProps {}

const Order: React.FC<OrderProps> = ({}) => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const socket = socketIo(import.meta.env.VITE_PUBLIC_API_URL, {
      transports: ['websocket'],
    });

    socket.on('orders-new', newOrder =>
      setOrders(prev => prev.concat(newOrder)),
    );
  }, []);

  useEffect(() => {
    api.get('/orders').then(({ data }) => setOrders(data));
  }, []);

  const waiting = orders.filter(order => order.status === 'WAITING');
  const production = orders.filter(order => order.status === 'IN_PRODUCTION');
  const done = orders.filter(order => order.status === 'DONE');

  const handleCancelOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order._id !== orderId));
  };

  const handleChangeOrderStatus = (
    orderId: string,
    status: OrderType['status'],
  ) => {
    setOrders(prev =>
      prev.map(order => (order._id === orderId ? { ...order, status } : order)),
    );
  };

  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <OrdersBoard
        icon="👨‍🍳"
        title="Em preparação"
        orders={production}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
    </Container>
  );
};

export default Order;
