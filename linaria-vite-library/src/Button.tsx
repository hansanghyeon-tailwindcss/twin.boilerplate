import { styled } from '@linaria/react';

const Title = styled.div`
  font-size: 24px;
`

export const Button = styled.button<{ color: string }>`
  background: ${({ color }) => color};
  padding: 16px 24px;
  transition: 200ms;
  color: white;
  border-radius: 999px;
  display: inline-flex;
  flex-direction: column;

  & > ${Title} {
    font-weight: bold;
  }

  &:hover {
    color: ${({ color }) => color};
    background-color: white;
  }
`

export default Button