import React, { useState } from 'react';
import './ShoppingItemComponent.css';
import EditButton from './img/edit.png';
import ResolvedButton from './img/ok.png';
import DeleteButton from './img/delete.png';
//import DeleteButton from '../../public/logo512.png';
function ShoppingItemComponent({ itemId, itemName, resolved, onToggleComplete, onDelete, onEdit, role }) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentName, setCurrentName] = useState(itemName);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (onEdit) {
            onEdit(itemId, currentName);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <div className={`shopping-item ${resolved ? 'resolved' : ''}`}>
            {isEditing ? (
                <div className="item-editing-content">
                    <input
                        type="text"
                        value={currentName}
                        onChange={(e) => setCurrentName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="item-input"
                    />
                    <button onClick={handleSave} className="save-button">Save</button>
                </div>
            ) : (
                <div className="item-content">
                    <span className="item-name">{currentName}</span>
                    {role === 'Owner' && (
                        <div className="item-buttons">
                            {onEdit && (
                                <button onClick={handleEditClick}>
                                    <img src={EditButton} alt="Edit item" className="icon" />
                                </button>
                            )}
                            {onToggleComplete && (
                                <button onClick={() => onToggleComplete(itemId)}>
                                    <img src={ResolvedButton} alt="Resolved item" className="icon" />
                                </button>
                            )}
                            {onDelete && (
                                <button onClick={() => onDelete(itemId)}>
                                    <img src={DeleteButton} alt="Delete item" className="icon" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default React.memo(ShoppingItemComponent);







/*
<button onClick={handleEditClick}>
                                <img src={EditButton} alt="Edit item" className="edit-item-icon"/>
                            </button>
                            <button onClick={() => onToggleComplete(itemId)}>
                                <img src={ResolvedButton} alt="Resolved item" className="resolved-item-icon"/>
                            </button>
                            <button onClick={() => onDelete(itemId)}>
                                <img src={DeleteButton} alt="Delete item" className="icon"/>
                            </button>
 */


