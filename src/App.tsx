import React, { useEffect, useState } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import Pagination from "./components/Pagination";
import UsersList from "./components/UsersList";

import { AxiosIntance } from "./shared";

const App = () => {
  const [users, setUsers] = useState([]);
  // const [newField, setNewField] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  // const [adduserId, setAddUserId] = useState();
  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    AxiosIntance.get("/users").then((data) => {
      setUsers(data.data);
    });
  }, [isloading]);

  //pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  //post request (add user )

  const handleNewClick = () => {
    setLoading(true);
    AxiosIntance.post("/users")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => alert(err.data.data));
  };

  // const handleChange = (e: any) => {
  //   setAddUser({ ...adduser, [e.target.name]: e.target.value });
  // };

  return (
    <Container>
      <div className="spiner">
        {isloading && <Spinner animation="border" />}
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>@Email</th>
            <th>Postion</th>
          </tr>
        </thead>
        {currentItems.map((item: any, index) => {
          return <UsersList {...item} setLoading={setLoading} key={item.id} />;
        })}
      </Table>
      {/* {newField && (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>
                <input
                  type="text"
                  style={{ width: "100%" }}
                  name="name"
                  onChange={handleChange}
                />
              </th>
              <th>
                <input
                  type="text"
                  style={{ width: "100%" }}
                  name="email"
                  onChange={handleChange}
                />
              </th>
              <th>
                <input
                  type="text"
                  style={{ width: "100%" }}
                  name="position"
                  onChange={handleChange}
                />
                <i className="fas fa-angle-right" />
              </th>
            </tr>
          </thead>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </Table>
      )} */}
      <Button onClick={() => handleNewClick()}>New</Button>
      <div className="pagination">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalUsers={users.length}
          paginate={paginate}
        />
      </div>

      <div>
        <p> Note:- If You want to Delete Any Item please Click on it </p>
      </div>
    </Container>
  );
};

export default App;
