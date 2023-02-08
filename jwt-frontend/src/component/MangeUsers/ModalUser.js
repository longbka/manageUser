/* eslint-disable react-hooks/exhaustive-deps */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import {
  createUser,
  fetchGroups,
  updateCurrentUser,
} from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";
function ModalUser(props) {
  const [userGroups, setUserGroups] = useState();
  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  };
  const validInputDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  const [validInput, setValidInput] = useState(validInputDefault);
  const [userData, setUserData] = useState(defaultUserData);
  useEffect(() => {
    getGroups();
  }, []);
  useEffect(() => {
    if (props.action === "EDIT") {
      setUserData({
        ...props.dataModalUser,
        group: props.dataModalUser.Group ? props.dataModalUser.Group.id : "",
      });
    }
  }, [props.dataModalUser]);
  const handleOnchangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };
  const getGroups = async () => {
    try {
      let group = await fetchGroups();
      if (group && +group.EC === 0) {
        setUserGroups(group.DT);
        if (group.DT && group.DT.length > 0) {
          setUserData({ ...userData, group: group.DT[0] });
        }
      } else {
        toast.error(group.EM);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkValidInput = () => {
    setValidInput(validInputDefault);
    let arr = ["email", "phone", "password", "group", "address"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (userData[arr[i]] === "") {
        toast.error(`Do not empty ${arr[i]}`);
        let _validInput = _.cloneDeep(validInputDefault);
        _validInput[arr[i]] = false;
        setValidInput(_validInput);
        check = false;
        break;
      }
    }
    return check;
  };
  const handleConfirmInput = async () => {
    try {
      let check = checkValidInput();
      if (check) {
        let res =
          props.action === "CREATE"
            ? await createUser({ ...userData, groupId: userData["group"] })
            : await updateCurrentUser({
                ...userData,
                groupId: userData["group"],
              });
        if (res && +res.EC === 0) {
          console.log(res.EC)
          props.handleClose();
          setUserData({ ...defaultUserData, group: userGroups[0].id });
          props.action === "CREATE"
            ? toast.success("Create successfully")
            : toast.success("Update successfully");
          await props.renderAllUsers();
        }
        if (res.data && +res.EC !== 0) {
          toast.error(res.EM);
          let _validInput = _.cloneDeep(validInputDefault);
          _validInput[res.DT] = false;
          setValidInput(_validInput);
        }
      } else {
        toast.error("No response");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            {props.action === "CREATE" ? "Create a new user" : "Edit user"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="email">
                Email Address (<span className="text-danger">*</span>)
              </label>
              <input
                disabled={props.action === "EDIT" ? true : false}
                type="text"
                className={
                  validInput["email"]
                    ? "form-control"
                    : "form-control is-invalid"
                }
                id="email"
                value={userData.email}
                onChange={(e) => handleOnchangeInput(e.target.value, "email")}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="phone">
                Phone number (<span className="text-danger">*</span>)
              </label>
              <input
                disabled={props.action === "EDIT" ? true : false}
                type="text"
                className={
                  validInput["phone"]
                    ? "form-control"
                    : "form-control is-invalid"
                }
                id="phone"
                value={userData.phone}
                onChange={(e) => handleOnchangeInput(e.target.value, "phone")}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={userData.username}
                onChange={(e) =>
                  handleOnchangeInput(e.target.value, "username")
                }
              />
            </div>
            {props.action === "CREATE" && (
              <div className="col-12 col-sm-6 form-group">
                <label htmlFor="password">
                  Password (<span className="text-danger">*</span>)
                </label>
                <input
                  type="password"
                  className={
                    validInput["password"]
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  id="password"
                  onChange={(e) =>
                    handleOnchangeInput(e.target.value, "password")
                  }
                />
              </div>
            )}
            <div className="col-12 form-group">
              <label htmlFor="address">
                Address (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput["address"]
                    ? "form-control"
                    : "form-control is-invalid"
                }
                id="address"
                value={userData.address || ""}
                onChange={(e) => handleOnchangeInput(e.target.value, "address")}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="gender">
                Gender (<span className="text-danger">*</span>)
              </label>
              <select
                type="text"
                className="form-select"
                id="gender"
                onChange={(e) => handleOnchangeInput(e.target.value, "sex")}
              >
                <option defaultValue="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Another">Another</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="group">
                Group (<span className="text-danger">*</span>)
              </label>
              <select
                type="text"
                className="form-select"
                id="group"
                value={userData.group}
                onChange={(e) => handleOnchangeInput(e.target.value, "group")}
              >
                {userGroups &&
                  userGroups.length > 0 &&
                  userGroups.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleConfirmInput();
            }}
          >
            {props.action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUser;
