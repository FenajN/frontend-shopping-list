import React, { useState, useCallback, useMemo } from 'react';
import ShoppingItemComponent from './ShoppingItemComponent';
import AddItemButtonComponent from './AddItemButtonComponent';
import MembersListComponent from './MembersListComponent';

function ShoppingListComponent({ role }) {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', resolved: false },
    { id: 2, name: 'Item 2', resolved: false },
  ]);
  const [filter, setFilter] = useState('all');
  const [nextItemNumber, setNextItemNumber] = useState(3);

  const updateItemName = useCallback((id, newName) => {
    setItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, name: newName } : item))
    );
  }, []);

  const toggleItemComplete = useCallback(id => {
    setItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, resolved: !item.resolved } : item))
    );
  }, []);

  const deleteItem = useCallback(id => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const handleAddItem = useCallback(() => {
    setItems(prevItems => {
      const newItem = { id: Date.now(), name: `Item ${nextItemNumber}`, resolved: false };
      return [...prevItems, newItem];
    });
    setNextItemNumber(prevNumber => prevNumber + 1);
  }, [nextItemNumber]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (filter === 'all') return true;
      if (filter === 'unresolved') return !item.resolved;
      if (filter === 'resolved') return item.resolved;
      return true;
    });
  }, [items, filter]);

  return (
    <div className="main-content">
      <div className="shopping-list-container">
        <h2 className="shopping-list-title">Shopping List</h2>

        <div className="filter-buttons">
          <button onClick={() => setFilter('all')}>Show All</button>
          <button onClick={() => setFilter('unresolved')}>Show Unresolved</button>
          <button onClick={() => setFilter('resolved')}>Show Resolved</button>
        </div>

        <div className="shopping-items">
          {filteredItems.map(item => (
            <ShoppingItemComponent
              key={item.id}
              itemId={item.id}
              itemName={item.name}
              resolved={item.resolved}
              onToggleComplete={role === 'Owner' ? toggleItemComplete : null}
              onDelete={role === 'Owner' ? deleteItem : null}
              onEdit={role === 'Owner' ? updateItemName : null}
              role={role}
            />
          ))}
        </div>

        {role === 'Owner' && <AddItemButtonComponent onClick={handleAddItem} />}
      </div>

      <div className="members-container">
        <MembersListComponent role={role} />
      </div>
    </div>
  );
}

export default ShoppingListComponent;



