import logo from '../../assets/images/logo.png';
import { Container, Content } from './styles';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <Container>
      <Content>
        <div className="page-details">
          <h1>Pedidos</h1>
          <h2>Acompanhe os pedidos dos clientes</h2>
        </div>

        <img src={logo} alt="Logo" />
      </Content>
    </Container>
  );
};

export default Header;
