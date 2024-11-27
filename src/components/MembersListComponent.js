import React, { useState, useCallback } from 'react';
import MemberComponent from './MemberComponent';
import AddMemberButtonComponent from './AddMemberButtonComponent';

function MembersListComponent({ role }) {
    const [members, setMembers] = useState([
        { id: 1, name: 'Amanda', role: 'Owner' },
        { id: 2, name: 'Member2', role: 'Member' },
    ]);

    const addMember = useCallback(() => {
        setMembers(prevMembers => {
            const newMember = { id: Date.now(), name: `Member${prevMembers.length + 1}`, role: 'Member' };
            return [...prevMembers, newMember];
        });
    }, []);

    const deleteMember = useCallback((id) => {
        setMembers(prevMembers => prevMembers.filter(member => member.id !== id));
    }, []);

    return (
        <div className="members-container">
            <h2>Members</h2>
            {members.map(member => (
                <MemberComponent
                    key={member.id}
                    memberId={member.id}
                    memberName={member.name}
                    onDelete={role === 'Owner' ? deleteMember : null}
                />
            ))}
            {role === 'Owner' && <AddMemberButtonComponent onClick={addMember} />}

        </div>
    );
}

export default MembersListComponent;




/* //code if i will use the modal window
import React, { useState, useCallback } from 'react';
import MemberComponent from './MemberComponent';
import AddMemberButtonComponent from './AddMemberButtonComponent';
import MemberSelectionModal from './MemberSelectionModal';

function MembersListComponent({ role }) {
    const [members, setMembers] = useState([
        { id: 1, name: 'John Smith' },
        { id: 2, name: 'Pavel Novak' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAddMembers = (selectedMembers) => {
        setMembers((prevMembers) => {
            const newMembers = selectedMembers.filter(
                (member) => !prevMembers.some((m) => m.id === member.id)
            );
            return [...prevMembers, ...newMembers];
        });
    };

    const deleteMember = useCallback((id) => {
        setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
    }, []);

    return (
        <div className="members-container">
            <h2>Members</h2>
            {members.map((member) => (
                <MemberComponent
                    key={member.id}
                    memberId={member.id}
                    memberName={member.name}
                    onDelete={role === 'Owner' ? deleteMember : null}
                />
            ))}
            {role === 'Owner' && (
                <>
                    <AddMemberButtonComponent onClick={openModal} />
                    <MemberSelectionModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        onAddMembers={handleAddMembers}
                    />
                </>
            )}
        </div>
    );
}

export default MembersListComponent;
 */