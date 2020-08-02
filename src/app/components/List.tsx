import React from 'react';
import { ListProps } from '../../react-app-env';
import './List.css';

const UnOrderdList: React.SFC<ListProps> = ({items}: ListProps) => 
  <ul data-testid="unordered-list">
    {items.map((item,i) => 
      <li key={i}>{item}</li>
    )}
  </ul>

export default UnOrderdList;
