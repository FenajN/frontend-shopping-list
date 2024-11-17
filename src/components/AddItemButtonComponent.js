import React from 'react';

function AddItemButtonComponent({ onClick }) {
    return (
        <button onClick={onClick} className="add-item-button">
            Add new item
        </button>
    );
}

export default React.memo(AddItemButtonComponent);
