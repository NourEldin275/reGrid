import React from 'react';
import ReactDOM from 'react-dom';
import Example from './Example';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Example />, document.getElementById('root'));
registerServiceWorker();
