import { OrderType } from '../../types/Order';
import OrdersBoard from '../OrdersBoard';
import { Container } from './styles';

interface OrderProps {}

const orders: OrderType[] = [
  {
    _id: 'hdfgwqd',
    status: 'WAITING',
    table: '3',
    products: [
      {
        _id: 'fasdfasdgfds',
        quantity: 2,
        product: {
          name: 'Hamburguer de carne',
          imagePath: '1708134857037-burger-molho-especial.png',
          price: 20,
        },
      },
      {
        _id: 'd2fdsgfds',
        quantity: 1,
        product: {
          name: 'Hamburguer de frango',
          imagePath: '1708134857037-burger-molho-especial.png',
          price: 18,
        },
      },
    ],
  },
];

const Order: React.FC<OrderProps> = ({}) => {
  return (
    <Container>
      <OrdersBoard icon="🕒" title="Fila de espera" orders={orders} />
      <OrdersBoard icon="👨‍🍳" title="Em preparação" orders={[]} />
      <OrdersBoard icon="✅" title="Pronto!" orders={[]} />
    </Container>
  );
};

export default Order;
