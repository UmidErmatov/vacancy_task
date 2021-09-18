import React, { useState, useEffect, useMemo } from 'react'
import Search from './Search';
import { Modal } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { signOut } from '../store/actions';
import '../Login/logout.css'
import exit_photo from "../images/exit.png";
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

function Products() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const columns = [
    { dataField: 'id', text: "ID", sort: true, align: 'center', headerAlign: 'center' },
    { dataField: 'name', text: "Name", sort: true, align: 'center', headerAlign: 'center' },
    { dataField: 'username', text: "Username", sort: true, align: 'center', headerAlign: 'center' },
    { dataField: 'email', text: "Email", sort: true, align: 'center', headerAlign: 'center' },
  ]

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: "<<",
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true
  })

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(result => setData(result))
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const sortData = useMemo(() => {
    if (search) {
      return data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.username.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase()))
    } else {
      return data
    }
  }, [data, search])

  return (
    <div className="container-fluid" >
      <div className='row'>
        <div className='col-2'>
          <button type="button" className="btn btn-outline-danger my-3" onClick={handleOpen} >Log out</button>
        </div>
        <div className='col-7'></div>
        <div className='col'>
          <Search onSearch={(value) => {
            setSearch(value);
          }} />
        </div>
      </div>
      <div className="row">
        <div className='col'>
          <BootstrapTable
            pagination={pagination}
            bootstrap4
            keyField='id'
            columns={columns}
            data={sortData}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <p>PS: 'https://face.ox-sys.com/variations' ushbu manzildan data ololmadim. </p>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="head">
          <div className="father_div">
            <div className="exit_img">
              <img src={exit_photo} alt="exit.png" />
            </div>
            <div className="bottom_text">
              <p>
                Are you sure, you want to leave ?{" "}
              </p>

              <button onClick={handleClose} className="no_exit">
                No !
              </button>
              <button className="no_exit2" onClick={handleLogout}>Yes, Log Me Out</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Products
