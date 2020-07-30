import React from "react";

const ListGroup = (props) => {
  const {
    items,
    textproperty,
    valueproperty,
    onItemSelect,
    selectedItem,
  } = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueproperty]}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textproperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textproperty: "name",
  valueproperty: "_id",
};
export default ListGroup;
