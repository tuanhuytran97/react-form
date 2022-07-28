import './App.css';
import { Fragment, useEffect, useReducer, useRef, useState } from 'react';
import { decrement, increment } from './actions/counter';
import { useDispatch, useSelector } from 'react-redux';
import { del, edit, save } from './actions/register';
import { ReadOnly } from './components/ReadOnly';
import { EditTable } from './components/EditTable';
export const initialState = {
  id: null,
  fullname: '',
  username: '',
  password: '',
  phone: null,
  email: '',
  type: ''
}
const App = () => {
  const count = useSelector((state) => state.counter);
  const data = useSelector((state) => state.register)
  const [inputs, setInputs] = useState(initialState);
  const [editFormData, setEditFormData] = useState({});
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [searchArray, setSearchArray] = useState(null);

  useEffect(() => {
    setInputs(values => ({ ...values, ['id']: count }))
  }, [count])

  useEffect(() => {
    const tmp = data.filter(value => value.fullname.toLowerCase().includes(searchValue.toLowerCase()));
    console.log(searchValue);
    searchValue ? setSearchArray(tmp) : setSearchArray(null);
  }, [searchValue])

  console.log({searchArray});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(save(inputs));
    dispatch(increment());
    alert("Register successfull!");
  }
  const handleEditSubmit = () => {
    console.log({ editFormData });
    const tmp = data;

    tmp[editFormData.id] = editFormData;
    dispatch(edit(tmp));
    setEditId(null);
  }
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditId(contact.id);

    const formValues = {
      id: contact.id,
      fullname: contact.fullname,
      username: contact.username,
      password: contact.password,
      phone: contact.phone,
      email: contact.email,
      type: contact.type
    };

    setEditFormData(formValues);
  }
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[name] = value;
    setEditFormData(newFormData);
  }
  const handleReset = (event) => {
    document.getElementById("register").reset();
    setInputs(initialState);
  }
  const handleDelete = (id) => {
    dispatch(del(id));
  }
  return (
    <div className="App">
      <div className="w-75 mx-auto mt-5">
        <div className="card p-0">
          <div className="card-header bg-warning text-white font-weight-bold">
            REGISTER FORM
          </div>
          <div className="card-body">
            <form id="register" onSubmit={handleSubmit} onReset={handleReset}>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label>Username</label>
                    <input type="text" required="required" name='username' className="form-control" onChange={handleChange} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" required="required" name='fullname' className="form-control" onChange={handleChange} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" required="required" name='password' className="form-control" onChange={handleChange} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="number" required="required" name='phone' className="form-control" onChange={handleChange} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" required="required" name='email' className="form-control" onChange={handleChange} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Type</label>
                    <select className="form-control" required="required" name='type' onChange={handleChange}>
                      <option value=''></option>
                      <option value='Client'>Client</option>
                      <option value='Admin'>Admin</option>
                    </select>
                  </div>
                </div>
              </div>
              <button type="submit">Submit</button>
              <button type="reset">Reset</button>
            </form>
          </div>
        </div>
        <div className="card p-0 mt-3">
          <div className="card-header font-weight-bold">USER MANAGEMENT</div>
          <div className="row mt-4 px-3 ">
            <div className="col-4">
              <div className="form-group mb-0">
                <input
                  type="text"
                  placeholder="Search by full name..."
                  className="form-control"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
            <div className="col-3 ml-auto">
              <div className="form-group mb-0">
                <select className="form-control">
                  <option>All</option>
                  <option>Client</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
          </div>
          <div className="card-body">
            <table className="table" border={"1px solid black"}>
              <thead>
                <tr>
                  <th style={{ width: 100, background: "#FDDF95" }}>ID</th>
                  <th style={{ width: 100, background: "#FDDF95" }}>Fullname</th>
                  <th style={{ width: 100, background: "#FDDF95" }}>Username</th>
                  <th style={{ width: 100, background: "#FDDF95" }}>Phone Number</th>
                  <th style={{ width: 100, background: "#FDDF95" }}>Email</th>
                  <th style={{ width: 100, background: "#FDDF95" }}>Type</th>
                  <th style={{ width: 100, background: "#FDDF95" }}></th>
                </tr>
              </thead>
              <tbody>
                {
                  searchArray !== null && searchArray.length !== 0 ?
                    searchArray.map(contact =>
                      <Fragment key={contact.id}>
                        {
                          editId === contact.id ?
                            <EditTable editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleEditSubmit={handleEditSubmit}></EditTable> :
                            <ReadOnly contact={contact} handleEditClick={handleEditClick} handleDelete={handleDelete}></ReadOnly>
                        }
                      </Fragment>
                    ) :
                    data && data.map(contact =>
                      <Fragment key={contact.id}>
                        {
                          editId === contact.id ?
                            <EditTable editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleEditSubmit={handleEditSubmit}></EditTable> :
                            <ReadOnly contact={contact} handleEditClick={handleEditClick} handleDelete={handleDelete}></ReadOnly>
                        }
                      </Fragment>
                    )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
