//im not sure if i need this, but if owner creates members then should be a list of members that owner can select

import React, { useState, useEffect } from 'react';
import './MemberSelectionModal.css';

function MemberSelectionModal({ isOpen, onClose, onAddMembers }) {
    const [availableMembers, setAvailableMembers] = useState([]);
    const [selectedMemberIds, setSelectedMemberIds] = useState([]);

    useEffect(() => {
        if (isOpen) {
            // here i need to add api
            // to simplify I use here created list
            const fetchedMembers = [
                { id: 101, name: 'John Smith' },
                { id: 102, name: 'Pavel Novak' },
                { id: 103, name: 'Someone Else' },
            ];
            setAvailableMembers(fetchedMembers);
            setSelectedMemberIds([]);
        }
    }, [isOpen]);

    const handleMemberToggle = (memberId) => {
        setSelectedMemberIds((prevSelected) =>
            prevSelected.includes(memberId)
                ? prevSelected.filter((id) => id !== memberId)
                : [...prevSelected, memberId]
        );
    };

    const handleConfirm = () => {
        const selectedMembers = availableMembers.filter((member) =>
            selectedMemberIds.includes(member.id)
        );
        onAddMembers(selectedMembers);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Choose members to add</h2>
                <ul className="member-selection-list">
                    {availableMembers.map((member) => (
                        <li key={member.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedMemberIds.includes(member.id)}
                                    onChange={() => handleMemberToggle(member.id)}
                                />
                                {member.name}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="modal-buttons">
                    <button onClick={handleConfirm}>AddChosen</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default MemberSelectionModal;
