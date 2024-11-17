import React from 'react';

function UserComponent({ role, name, onRemoveSelf }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>Role: {role}</p>
            {role === 'Member' && (
                <button onClick={onRemoveSelf} className="remove-self-button">
                    Leave Group
                </button>
            )}
        </div>
    );
}

export default React.memo(UserComponent);
