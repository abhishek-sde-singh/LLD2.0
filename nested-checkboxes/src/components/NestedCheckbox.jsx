import React from "react";

const NestedCheckbox = ({ data, onCheckChange }) => {
  const handleChange = (e) => {
    onCheckChange(data.id, e.target.checked);
  };

  // Checkbox ka dash (-) state — kuch bachche checked, kuch nahi
  const getIndeterminateStatus = (item) => {
    // Leaf node (no children) → indeterminate kabhi nahi
    if (!item.children || item?.children?.length === 0) {
      return false;
    }
    const allChecked = item?.children?.every((child) => child.isChecked);
    // child.isChecked = poora branch checked | getIndeterminateStatus(child) = andar kuch-kuch checked
    const someChecked = item?.children?.some(
      (child) => child.isChecked || getIndeterminateStatus(child),
    );
    // Dash tab dikhao jab kuch hai par sab nahi
    return !allChecked && someChecked;
  };

  return (
    <div style={{ paddingLeft: "15px", fontSize: "25px", margin: "6px" }}>
      <input
        style={{ width: "20px", height: "20px", margin: "10px" }}
        type="checkbox"
        // this needs to be passed
        checked={data?.isChecked}
        id={`checkbox-${data?.id}`}
        onChange={handleChange}
        // React indeterminate prop support nahi karta — ref se manually set karo
        ref={(el) => el && (el.indeterminate = getIndeterminateStatus(data))}
      />
      <label htmlFor={`checkbox-${data?.id}`}>{data?.name}</label>

      {data?.children?.map((item) => {
        return (
          <NestedCheckbox
            data={item}
            key={item.id}
            onCheckChange={onCheckChange}
          />
        );
      })}
    </div>
  );
};

export default NestedCheckbox;
