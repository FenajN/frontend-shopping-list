import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShoppingListsPage.css";

function ShoppingListsPage() {
  const [shoppingLists, setShoppingLists] = useState([
    {
      id: 1,
      name: "Shopping List 1",
      archived: false,
      participants: ["Amanda", "Member"],
      items: ["Item1", "Item2"],
    },
    {
      id: 2,
      name: "Shopping List 2",
      archived: true,
      participants: ["Charlie"],
      items: ["Eggs"],
    },
  ]);

  const user = {
    name: "Amanda",
    role: "Owner",
  };


  const [filter, setFilter] = useState("active"); // active | archived
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListParticipants, setNewListParticipants] = useState([]);
  const [newListItems, setNewListItems] = useState([]);

  const handleAddList = () => {
    setShowModal(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const newList = {
      id: Date.now(),
      name: newListName,
      archived: false,
      participants: newListParticipants.filter((p) => p.trim() !== ""),
      items: newListItems.filter((i) => i.trim() !== ""),
    };
    setShoppingLists([...shoppingLists, newList]);
    setNewListName("");
    setNewListParticipants([]);
    setNewListItems([]);
    setShowModal(false);
  };

  const handleParticipantChange = (index, value) => {
    const participants = [...newListParticipants];
    participants[index] = value;
    setNewListParticipants(participants);
  };

  const addParticipant = () => {
    setNewListParticipants([...newListParticipants, ""]);
  };

  const removeParticipant = (index) => {
    const participants = [...newListParticipants];
    participants.splice(index, 1);
    setNewListParticipants(participants);
  };

  const handleItemChange = (index, value) => {
    const items = [...newListItems];
    items[index] = value;
    setNewListItems(items);
  };

  const addItem = () => {
    setNewListItems([...newListItems, ""]);
  };

  const removeItem = (index) => {
    const items = [...newListItems];
    items.splice(index, 1);
    setNewListItems(items);
  };

  const handleArchiveList = (id) => {
    setShoppingLists(
      shoppingLists.map((list) =>
        list.id === id ? { ...list, archived: !list.archived } : list
      )
    );
  };

  const handleDeleteList = (id) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      setShoppingLists(shoppingLists.filter((list) => list.id !== id));
    }
  };

  const filteredLists = shoppingLists.filter((list) =>
    filter === "active" ? !list.archived : list.archived
  );

  return (
    <div>
      <div className="header">
        <h1>Shopping Lists</h1>
        <div className="user-info">
          <h1>{user.name}</h1>
          <p><h3>Role: {user.role}</h3></p>
        </div>
      </div>
      <div className="filter-buttons">
        <button onClick={() => setFilter("active")}>Show Active</button>
        <button onClick={() => setFilter("archived")}>Show Archived</button>
      </div>
      <div className="shopping-lists-container">
        {filteredLists.map((list) => (
          <div key={list.id} className="shopping-list-tile">
            <h3 onClick={() => navigate(`/list/${list.id}`)}>{list.name}</h3>
            <div>
              <strong>Members:</strong> {list.participants.join(", ")}
            </div>
            <div>
              <strong>Items:</strong> {list.items.join(", ")}
            </div>
            <button onClick={() => handleArchiveList(list.id)}>
              {list.archived ? "Restore" : "Archive"}
            </button>
            <button className="delete-button" onClick={() => handleDeleteList(list.id)}>Delete</button>
          </div>
        ))}
        <button className="add-list-button" onClick={handleAddList} aria-label="Create new list">
          +
        </button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" type="button" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h2>Create New List</h2>
            <form onSubmit={handleModalSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Participants:</label>
                {newListParticipants.map((participant, index) => (
                  <div key={index} className="input-group">
                    <input
                      type="text"
                      value={participant}
                      onChange={(e) =>
                        handleParticipantChange(index, e.target.value)
                      }
                    />
                    <button type="button" onClick={() => removeParticipant(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addParticipant}>
                  Add Participant
                </button>
              </div>
              <div>
                <label>Items:</label>
                {newListItems.map((item, index) => (
                  <div key={index} className="input-group">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleItemChange(index, e.target.value)}
                    />
                    <button type="button" onClick={() => removeItem(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addItem}>
                  Add Item
                </button>
              </div>
              <button type="submit">Create List</button>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingListsPage;







