import React from 'react';
import ReactDOM from 'react-dom';
import Cube from './components/cube';


const App = (props) => {
  return (
    <div>
      <Cube />
    </div>
  );
};

const root = document.getElementById('root');

ReactDOM.render(
  <App />,
  root
);
