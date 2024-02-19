import { useEffect, useState } from 'react';
import { OrderType } from '../../types/Order';
import OrdersBoard from '../OrdersBoard';
import { Container } from './styles';
import { api } from '../../utils/api';
import Pusher from 'pusher-js';

interface OrderProps {}

const Order: React.FC<OrderProps> = ({}) => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const pusher = new Pusher(
      import.meta.env.VITE_PUBLIC_PUSHER_KEY as string,
      {
        cluster: import.meta.env.VITE_PUBLIC_CLUSTER as string,
      },
    );
    const channel = pusher.subscribe('snackbyte@websocket');

    channel.bind('orders-new', (newOrder: OrderType) =>
      setOrders(prev => prev.concat(newOrder)),
    );

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
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
