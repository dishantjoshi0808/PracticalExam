import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const MovieDetails = () => {
  const [dt, setDt] = useState([]);
  const [uid, setUid] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [reserdata, setReserData] = useState({
    name: "",
    rno: "",
    cource: "",
    age: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserData({ ...reserdata, [name]: value });
  };
  const fetchitem = async () => {
    try {
      await fetch("http://localhost:3000/movie/")
        .then((res) => res.json())
        .then((res) => setDt(res));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchitem();
  }, []);

  const handleSubmit = (e) => {
    fetch("http://localhost:3000/movie/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reserdata),
    }).then((res) => res.json());
    fetchitem();
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const editData = (id) => {
    setUid(id);
    fetch("http://localhost:3000/movie/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => setReserData(json));
  };
  const deleteData = (id) => {
    setDt(dt.filter((item) => item.id !== id));

    fetch("http://localhost:3000/movie/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reserdata),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <>
      <center>
        <h2>Movie-Detais</h2>
      </center>
      <div className="frm">
        <form onSubmit={handleSubmit} method="post">
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              marginLeft: "75px",
              marginTop: "30px",
            }}
          >
            <br />
            <br />

            <TextField
              fullWidth
              label="movie name"
              name="name"
              value={reserdata.name}
              onChange={handleChange}
              id="fullWidth"
            />
            <br />
            <br />

            <TextField
              fullWidth
              label="price"
              name="price"
              value={reserdata.price}
              onChange={handleChange}
              id="fullWidth"
            />
            <br />
            <br />

            <TextField
              fullWidth
              label="cinema "
              name="cinema"
              value={reserdata.cinema}
              onChange={handleChange}
              id="fullWidth"
            />
            <br />
            <br />
            <Button type="submit" variant="contained" color="success">
              Search
            </Button>
          </Box>
        </form>
      </div>

      <table className="table table-striped w-50">
        <thead>
          <tr className="fw-bold">
            {/* <td>Id</td> */}
            <td>Name</td>
            <td>price</td>
            <td>cinema</td>
          </tr>
        </thead>
        <tbody>
          {dt.map((i) => {
            return (
              <tr>
                {/* <td>{i.rno}</td> */}
                <td>{i.name}</td>
                <td>{i.price}</td>
                <td>{i.cinema}</td>
                <td>
                  <button
                    className="btn btn-outline-info"
                    onClick={() => editData(i.id)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteData(i.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default MovieDetails;
