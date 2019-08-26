'use strict';

const world = <Figure lines={input1} clickable={true} />;

const domContainer = document.querySelector('#container');
ReactDOM.render(world, domContainer);
