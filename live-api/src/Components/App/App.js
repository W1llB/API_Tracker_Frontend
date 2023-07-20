import React from "react";
import Header from "../Header/Header";
import ListOfApis from "../ListOfApis/ListOfApis";
import { useEffect, useState } from "react";
import useInterval from "use-interval";
import "./App.css";
import AddApi from "../AddApi/AddApi";
import AddButton from "../Button/Button";

function App() {
  /* The array of api objects */
  const [apiArray, setApiArray] = useState([]);
  /* A new api object for propagating before we push it into apiArray */
  const [newApi, setNewApi] = useState({});
  /* These next three are state variables which are updated whenever their respective input field is changed.
   * "Tags" is missing because it hasn't been implemented yet
   */
  const [url, setUrl] = useState("");
  const [apiName, setApiName] = useState("");
  const [docsLink, setDocsLink] = useState("");
  /* A variable to trigger the removal of an API entry.  Del would be set to the id of the entry in question */
  const [del, setDel] = useState("");

  const evtSource = new EventSource(
    "http://localhost:3001/sse" /*, {
    withCredentials: true,
  }*/
  );

  evtSource.onmessage = (event) => {
    // console.log(JSON.parse(event.data));
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
    console.log(data.payload);
  }

  async function postData() {
    const newApiJson = JSON.stringify(newApi);
    /* we post to the API with the data in the fields */
    const response = await fetch("http://localhost:3001/api/", {
      method: "POST",
      body: newApiJson,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function deleteApi() {
    console.log("here");
    const response = await fetch(`http://localhost:3001/api/${del}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  }

  function handleDelete(id) {
    setDel(id);
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

  function handleClick() {
    setNewApi({ api_url: url, api_name: apiName, doclink: docsLink });
  }

  return (
    <div className="app-container">
      <Header />
      <div className="add-and-list-container">
        <div className="add-container">
          <div className="inputs-container">
            <AddApi
              InputName="URL"
              Placeholder="Enter your URL link here"
              handleChange={handleChangeUrl}
            />
            <AddApi
              APIname="API name"
              InputName="API"
              Placeholder="Enter your API name here"
              handleChange={handleChangeName}
            />
            <AddApi
              APIname="Link to the docs"
              InputName="DOC"
              Placeholder="Enter the link to the Docs here"
              handleChange={handleChangeDocs}
            />
            <AddApi InputName="TAG" Placeholder="Enter the tags here" />
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
