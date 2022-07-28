import React, { useState } from 'react'

export const EditTable = ({ editFormData, handleEditFormChange,handleEditSubmit }) => {
    
    return (
        <tr>
            <td>{editFormData.id}</td>
            <td><input type={"text"} value={editFormData.fullname} onChange={handleEditFormChange} required="required" name='fullname' placeholder='Enter Username'></input></td>
            <td><input type={"text"} value={editFormData.username} onChange={handleEditFormChange} required="required" name='username' placeholder='Enter Full name'></input></td>
            <td><input type={"number"} value={editFormData.phone} onChange={handleEditFormChange} required="required" name='phone' placeholder='Enter Phone Number'></input></td>
            <td><input type={"email"} value={editFormData.email} onChange={handleEditFormChange} required="required" name='email' placeholder='Enter Email'></input></td>
            <select className="form-control" value={editFormData.type} onChange={handleEditFormChange} required="required" name='type'>
                <option value=''></option>
                <option value='Client'>Client</option>
                <option value='Admin'>Admin</option>
            </select>
            <td>
                <button type="submit" onClick={handleEditSubmit}>Save</button>
            </td>
        </tr>
    )
}
