import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';

/** Identic: ReactElement using Jsx tag or React.createElement */
// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
    React.createElement(App), 
    document.getElementById('root')
);

/** HMR support */
if (module.hot) {
    module.hot.accept();
}

registerServiceWorker();
