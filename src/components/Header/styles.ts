import styled from 'styled-components';

export const Container = styled.header`
  background-color: #d73035;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 198px;
`;

export const Content = styled.div`
  justify-content: space-between;
  align-items: center;
  max-width: 1216px;
  display: flex;
  width: 100%;

  .page-details {
    h1 {
      color: #fff;
      font-size: 32px;
    }

    h2 {
      color: #fff;
      font-weight: 400;
      font-size: 16px;
      margin-top: 6px;
    }
  }

  img {
    height: 160px;
  }
`;
