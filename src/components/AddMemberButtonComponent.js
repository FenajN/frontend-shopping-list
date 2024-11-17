import React from 'react';

function AddMemberButtonComponent({ onClick }) {
    return (
        <button onClick={onClick} className="add-member-button">
            Add member
        </button>
    );
}

export default React.memo(AddMemberButtonComponent);

