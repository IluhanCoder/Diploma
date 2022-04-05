import React from "react";

type LocalProps = {
  itemClassName: string;
  array: Array<String>;
};

const ArrayMapper = (props: LocalProps) => {
  const { array, itemClassName: className } = props;
  const listItems = array.map((item) => (
    <div key={item.toString()} className={className}>
      <p>{item}</p>
    </div>
  ));
  return <>{listItems}</>;
};

export default ArrayMapper;
