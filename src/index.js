import React from 'react';
import ReactDOM from 'react-dom';
import Andretify from './Components/Andretify';
import * as serviceWorker from './serviceWorker';


// Calling the Andretify App to the root element in index.html

ReactDOM.render(<Andretify />, document.getElementById('root'));

serviceWorker.unregister();
