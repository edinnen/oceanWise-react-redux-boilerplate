import styled from 'styled-components';

import buttonStyles from './buttonStyles';

const A = styled.a`
  ${buttonStyles}
  ${(props) => props.invert && `
    border-color: white;
    color: white;
    &:hover {
      background-color: white;
      color: #005EB8;
    }
    &:disabled {
      background-color: rgba(178, 190, 196, 0.5);
      color: rgba(77, 77, 77, 0.5);
    }
  `}
  ${(props) => props.disabled && `
    background-color: rgba(178, 190, 196, 0.5);
    color: rgba(141, 141, 141, 0.8);
    border: 1px rgba(141, 141, 141, 0.5);
    &:hover {
      background-color: white;
      color: #005EB8;
    }
    &:disabled {
      background-color: rgba(178, 190, 196, 0.5);
      color: rgba(77, 77, 77, 0.5);
    }
  `}
  ${(props) => props.large && 'padding: 20px 50px;'}
  `;

export default A;
