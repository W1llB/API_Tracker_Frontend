import "./ListOfApis.css";
import ListElement from "../ListElement/ListElement";

/* ListOfApis takes props.apiArray and calls ListElement on each (object) entry to build the list
 */
function ListOfApis(props) {
  return (
    <div className="list-container">
      {props.apiArray.map((element) => {
        return (
          <ListElement
            id={element.api_id}
            key={element.api_id}
            apiName={element.api_name}
            apiUrl={element.api_url}
            docsUrl={element.docs_url}
            responseCode={element.response_code}
            status={element.status}
            lastDowntime={element.last_downtime}
            tags={element.tags}
            handleDelete={props.handleDelete}
          />
        );
      })}
    </div>
  );
}

export default ListOfApis;
