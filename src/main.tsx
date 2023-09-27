import React from 'react';
import ReactDOM from 'react-dom/client';

import {KageEditor} from '../lib/index';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <KageEditor host="test" />
);
