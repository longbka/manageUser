/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { deleteUser, fetchAllUsers } from "../../services/userService";
import ReactPaginate from "react-paginate";
import "./User.scss";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import { UserContext } from "../context/UserContext";
function User() {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [showDelete, setShowDelete] = useState(false); // is showDelete modal ??
  const [showEdit, setShowEdit] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [dataModalUser, setDataModalUser] = useState({});
  const [actionModalUser, setActionModalUser] = useState("CREATE");
  const handleClose = () => setShowDelete(false);
  const handleShow = () => setShowDelete(true);
  const handleShowEdit = () => {
    setShowEdit(true);
  };
  const handleCloseEdit = () => {
    setShowEdit(false);
    setDataModalUser({});
  };
  const handleCreate = () => {
    setActionModalUser("CREATE");
    setShowEdit(true);
  };
  const handleEdit = (user) => {
    setActionModalUser("EDIT");
    setShowEdit(true);
    setDataModalUser(user);
  };
  const handleRefresh = async () => {
    await fetchAllUsers();
  };
  useEffect(() => {
    renderAllUsers();
  }, [currentPage]);
  const renderAllUsers = async () => {
    let response = await fetchAllUsers(currentPage, limit);
    if (response && response && +response.EC === 0) {
      setTotalPages(response.DT.totalPages);
      setListUsers(response.DT.users);
    }
  };
  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };
  const handleDeleteUser = (user) => {
    setDataModal(user);
    setShowDelete(true);
  };
  const confirmDeleteUser = async () => {
    try {
      let response = await deleteUser(dataModal);
      console.log(response);
      if (response && +response.EC === 0) {
        toast.success(response.EM);
        handleClose();
        await renderAllUsers();
      } else {
        toast.error(response.EM);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="container">
        <div className="manage-users-container">
          <div className="user-header">
            <div>
              <h3>Table users</h3>
            </div>
            <div className="actions">
              <button className="btn btn-success" onClick={handleRefresh}>
                <i className="fa fa-refresh" aria-hidden="true"></i>Refresh
              </button>
              <button className="btn btn-primary" onClick={handleCreate}>
                <i className="fa fa-plus" aria-hidden="true"></i>
                Add new user
              </button>
            </div>
          </div>
          <div className="user-body pt-3">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Group</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ? (
                  <>
                    {listUsers.map((item, index) => (
                      <tr key={`row-${index}`}>
                        <td>{(currentPage - 1) * limit + index + 1}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.Group ? item.Group.name : ""}</td>
                        <td className="d-flex justify-content-start">
                          <button
                            className="btn btn-warning mx-3"
                            onClick={() => {
                              handleEdit(item);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleDeleteUser(item);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td>No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="user-footer">
            {totalPages > 0 && (
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            )}
          </div>
        </div>
      </div>
      <ModalDelete
        animation
        show={showDelete}
        handleClose={handleClose}
        handleShow={handleShow}
        confirmDeleteUser={confirmDeleteUser}
      />
      <ModalUser
        animation
        action={actionModalUser}
        show={showEdit}
        handleClose={handleCloseEdit}
        handleShow={handleShowEdit}
        confirmDeleteUser={confirmDeleteUser}
        renderAllUsers={renderAllUsers}
        dataModalUser={dataModalUser}
      />
    </>
  );
}
export default User;
