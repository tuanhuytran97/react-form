import React from 'react'

export const ReadOnly = ({contact, handleEditClick, handleDelete}) => {
    return (
        <tr key={contact.id}>
            <td>{contact.id}</td>
            <td>{contact.fullname}</td>
            <td>{contact.username}</td>
            <td>{contact.phone}</td>
            <td>{contact.email}</td>
            <td>{contact.type}</td>
            <td>
                <button type='button' onClick={(event)=> handleEditClick(event,contact)}>Edit</button>
                <button type='button' onClick={() => handleDelete(contact.id)}>Delete</button>
            </td>
        </tr>
    )
}
