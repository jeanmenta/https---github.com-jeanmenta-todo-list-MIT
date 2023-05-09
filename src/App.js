import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [newItem, setNewItem] = useState("");
  const [list, setList] = useState(() => {
    // Retrieve the list from local storage when the component is mounted
    const savedList = localStorage.getItem('list');
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    // Save the list to local storage whenever it changes
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const updateInput = (value) => {
    setNewItem(value);
  };

  const addItem = () => {
    const item = {
      id: 1 + Math.random(),
      value: newItem.slice()
    };

    setList([...list, item]);
    setNewItem("");
  };

  const deleteItem = (id) => {
    setList(list.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Type item here..."
          value={newItem}
          onChange={e => updateInput(e.target.value)}
        />
        <button onClick={addItem}>
          Add
        </button>
        <br />
        <ul>
          {list.map(item => (
            <li key={item.id}>
              {item.value}
              <button onClick={() => deleteItem(item.id)}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
