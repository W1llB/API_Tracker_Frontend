import React from "react";
import "./ListElementTEST.css";

/* ListElement is a component displaying an individual API
 * including its collapse/uncollapse button (within the Collapse Component below), the api docs URL,
 * the sample json data, the delete button and GET/RESPONSE codes
 */
function ListElement(props) {
  /* Collapse is a component availably within ListElement only
   */
  const Collapse = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(true);

    return (
      <>
        <button
          className="collapse-button"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "Show" : "Hide"} {props.apiName}
        </button>
        <div
          className={`collapse-content ${
            isCollapsed ? "collapsed" : "expanded"
          }`}
          aria-expanded={isCollapsed}
        >
          {children}
        </div>
      </>
    );
  };

  return (
    <div className="list-element-container" id={props.id}>
      <div className="left-container">
        <Collapse>
          <a href={props.apiUrl} target="_blank" rel="noreferrer">
            <p>{props.apiUrl}</p>
          </a>
          {/* <div>{JSON.stringify(JSON.parse(props.jsonExample))}</div> */}
          <a href={props.docsUrl} target="_blank" rel="noreferrer">
            <button className="docslink">Link to documentation</button>
          </a>
        </Collapse>
      </div>

      <div className="icons-container">
        <div className={props.status ? "getSuccess" : "getFail"}></div>
        <p>{props.status ? "" : props.responseCode}</p>
      </div>
      <button
        id={props.id}
        className="delete"
        onClick={() => {
          props.handleDelete(props.id);
        }}
      >
        ❌
      </button>
    </div>
  );
}

export default ListElement;
