import { OrderType } from '../../types/Order';
import OrdersBoard from '../OrdersBoard';
import { Container } from './styles';

interface OrderProps {}

const orders: OrderType[] = [
  {
    _id: '123',
    status: 'IN_PRODUCTION',
    table: '4',
    products: [
      {
        _id: 'string',
        quantity: 2,
        product: {
          name: 'um',
          imagePath: 'fasd.png',
          price: 20,
        },
      },
    ],
  },
  {
    _id: '412',
    status: 'DONE',
    table: '2',
    products: [
      {
        _id: 'string',
        quantity: 2,
        product: {
          name: 'um',
          imagePath: 'fasd.png',
          price: 20,
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
