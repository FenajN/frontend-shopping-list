import React, { useState } from 'react';
import './App.css';
import EditButton from './components/img/edit.png';
import UserComponent from './components/UserComponent';
import HomeButtonComponent from './components/HomeButtonComponent';
import ShoppingListComponent from './components/ShoppingListComponent';
import MembersListComponent from './components/MembersListComponent';

function App() {
    const [role] = useState('Owner'); // Set 'Member' to check member interface
    const [isMemberActive, setIsMemberActive] = useState(true);
    const [listName, setListName] = useState('Shopping List');
    const [isEditingListName, setIsEditingListName] = useState(false);

    const toggleEditListName = () => setIsEditingListName(prev => !prev);

    const handleListNameSave = () => {
        setIsEditingListName(false);
    };

    const handleListNameKeyDown = (event) => {
        if (event.key === 'Enter') handleListNameSave();
    };

    const removeSelf = () => {
        setIsMemberActive(false);
    };

    const listNameHeader = (
        <h2 className="list-name-header">
            {isEditingListName && role === 'Owner' ? (
                <>
                    <input
                        type="text"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                        onKeyDown={handleListNameKeyDown}
                        autoFocus
                    />
                    <button onClick={handleListNameSave}>Save</button>
                </>
            ) : (
                <>
                    {listName}
                    {role === 'Owner' && (
                        <button onClick={toggleEditListName}>
                            <img src={EditButton} alt="Edit item" className="icon"/>
                        </button>
                    )}
                </>
            )}
        </h2>
    );

    return (
        <div className="App">
            <div className="header">
                <HomeButtonComponent onClick={() => alert('Going home')} className="home-button" />
                {isMemberActive ? (
                    <UserComponent role={role} name="Amanda" onRemoveSelf={removeSelf} />
                ) : (
                    <p>Access Denied. You are no longer on this list.</p>
                )}
            </div>

            {isMemberActive && (
                <div className="main-content">
                    <div className="shopping-list-container">
                        {listNameHeader}
                        <ShoppingListComponent role={role} />
                    </div>
                    <MembersListComponent role={role} />
                </div>
            )}
        </div>
    );
}

export default App;

