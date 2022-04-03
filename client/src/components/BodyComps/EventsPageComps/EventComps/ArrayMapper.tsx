import React from "react";

type LocalProps = {
  array: Array<String>;
};

const ArrayMapper = (props: LocalProps) => {
  const array = props.array;
  const listItems = array.map((item) => (
    <div className="bg-gray-400 mr-4 mb-2 rounded">
      <p className="mx-4 md:my-1">{item}</p>
    </div>
  ));
  return <>{listItems}</>;
};

export default ArrayMapper;
