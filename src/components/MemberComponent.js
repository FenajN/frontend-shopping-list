import React from 'react';
import UserRemoveIcon from './img/remove-user.png';
function MemberComponent({ memberId, memberName, onDelete }) {
    return (
        <div className="member-item">
            <span className="member-name">{memberName}</span>
            {onDelete && (
                <button onClick={() => onDelete(memberId)}>
                    <img src={UserRemoveIcon} alt="Remove member" className="member-remove-icon" />
                </button>
            )}
        </div>
    );
}

export default React.memo(MemberComponent);

