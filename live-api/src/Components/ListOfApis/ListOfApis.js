import React from "react";

function ListOfApis(props) {
  return (
    <div className="list-container">
      <props.children />
    </div>
  );
}

export default ListOfApis();
