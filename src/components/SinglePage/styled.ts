import styled from 'styled-components';

export const StyledContainer = styled.main`
  max-width: 960px;
  width: 100%;
  margin: auto;
  margin-top: 60px;
  background-color: #fff;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  border-radius: 4px;
`;

export const Header = styled.header`
  background-color: #2196f3;
  padding: 14px 28px;
`;

export const Logo = styled.div`
  color: #fff;
  font-weight: 700;
`;

export const Title = styled.h1`
  margin: 21px 28px;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-gap: 21px;
  padding: 28px;
  padding-top: 0;
  min-height: 693px;
`;

export const WordInfo = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 10px;
`;

export const StyledButton = styled.button`
  padding: 14px;
  margin-top: 14px;
  background-color: #00bcd4;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const ButtonLoad = styled(StyledButton)`
  margin-top: 0;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
`;

export const CheckboxContainer = styled.div`
  display: grid;
  grid-gap: 7px;
`;
