import React from "react";
import Header from "../Header/Header";
import ListOfApis from "../ListOfApis/ListOfApis";
import { useEffect, useState } from "react";
import "./App.css";
import AddApi from "../AddApi/AddApi";
import AddButton from "../Button/Button";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [apiArray, setApiArray] = useState([]);
  const [newApi, setNewApi] = useState({});
  const [url, setUrl] = useState("");
  const [apiName, setApiName] = useState("");
  const [docsLink, setDocsLink] = useState("");
  const [tags, setTags] = useState("");
  const [del, setDel] = useState("");

  if (!localStorage["user_id"]) {
    localStorage.setItem("user_id", uuidv4());
  }
  const evtSource = new EventSource(
    "http://localhost:3002/" /*, {
    withCredentials: true,
  }*/
  );

  evtSource.onmessage = (event) => {
    console.log(event.data);
  };

  evtSource.onerror = (err) => {
    console.log("Event source failed: " + err);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (JSON.stringify(newApi) !== "{}") {
      postData();
      getData();
    }
  }, [newApi]);

  useEffect(() => {
    deleteApi();
    getData();
  }, [del]);

  async function getData() {
    const response = await fetch("http://localhost:3001/api/");
    const data = await response.json();
    setApiArray(data.payload);
    console.log("GET");
    console.log(data.payload);
  }

  async function postData() {
    const body = JSON.stringify(newApi);
    await fetch("http://localhost:3001/api/", {
      method: "POST",
      body: body,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function deleteApi() {
    await fetch(`http://localhost:3001/api/${del}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function handleDelete(id) {
    setDel(id);
    console.log("deleted");
  }

  function handleChangeUrl(e) {
    setUrl(e.target.value);
  }

  function handleChangeName(e) {
    setApiName(e.target.value);
  }

  function handleChangeDocs(e) {
    setDocsLink(e.target.value);
  }

  function handleChangeTags(e) {
    setTags(e.target.value);
  }

  function handleClick() {
    setNewApi({
      user_id: localStorage.getItem("user_id"),
      api_url: url,
      api_name: apiName,
      docs_url: docsLink,
      tags: tags,
    });
  }

  return (
    <div className="app-container">
      <Header />
      <div className="add-and-list-container">
        <div className="add-container">
          <div className="inputs-container">
            <AddApi
              APIname="API name"
              InputName="API"
              Placeholder="Enter your API name here"
              handleChange={handleChangeName}
            />
            <AddApi
              InputName="URL"
              Placeholder="Enter your URL link here"
              handleChange={handleChangeUrl}
            />
            <AddApi
              APIname="Link to the docs"
              InputName="DOC"
              Placeholder="Enter the link to the Docs here"
              handleChange={handleChangeDocs}
            />
            <AddApi
              InputName="TAG"
              Placeholder="Enter the tags here"
              handleChange={handleChangeTags}
            />
          </div>

          <div className="add-button-container">
            <AddButton className="button" handleClick={handleClick} />
          </div>
        </div>

        <ListOfApis
          apiArray={apiArray}
          handleDelete={handleDelete}
        ></ListOfApis>
      </div>
    </div>
  );
}

export default App;
