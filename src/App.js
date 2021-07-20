import React, { useState } from 'react';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

function App() {

  const Actions = {
    ADD: 'add',
    DELETE: 'delete',
    UPDATE: 'update',
  };

  function random () {
    return Math.ceil(Math.random() * 100000000);
  };

  function reducer(state = [], action) {
    switch(action.type) {
      case Actions.ADD: {
        return state = [...state, action.payload]
      };

      case Actions.DELETE: {
        return state.filter((item) => item.id !== action.payload.id)
      };
    };
    return state;
  };

  const store = createStore(reducer);



  const Item = ({items, onAdd, onDelete, onUpdate}) => {
    const [itemName, setItemName] = useState('');
    const [itemPassword, setItemPassword] = useState('');
    return(
      <>
        <input placeholder='Name' onChange={(e) => setItemName(e.target.value)} value={itemName} type='text' />
        <input placeholder='Password' onChange={(e) => setItemPassword(e.target.value)} value={itemPassword} type='password' />
        <button onClick={() => {
          items.forEach(i => {
            if(i.name === itemName) {
              alert('есть');
              onDelete(i.id);
            }; 
          });
            if(itemPassword !== '') {
              setItemName('');
              setItemPassword('');
              onAdd(itemName, itemPassword);
            };
        }}>Add</button>
        <div>
          {items.map((item) => {
            return (
              <>
                <p key={item.id}>{item.name}</p>
                <button onClick={() => onDelete(item.id)}>Delete</button>
                <button onClick={() => {
                  setItemName(item.name);
                  setItemPassword(item.password);
                  onDelete(item.id);
                }}>Update</button>
              </>
            );
          })}
        </div>
      </>
    );
  };

  const ConnectItems = connect(
    (state) => ({items: state}),
    dispatch => ({
      onAdd: (item, password) => dispatch({type: Actions.ADD, payload: {id: random(), name: item, password: password}}),
      onDelete: (id) => dispatch({type: Actions.DELETE, payload: {id: id}}),
      onUpdate: (password) => dispatch({type: Actions.UPDATE, payload: {password: password}}),
    }),
  )(Item);



  return (
    <Provider store={store}>
      <ConnectItems />
    </Provider>
  );
}

export default App;
