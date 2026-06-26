import { useState } from "react";
import { initalData } from "./data";
import NestedCheckbox from "./components/NestedCheckbox";

function App() {
  const [data, setData] = useState(initalData);

  // Checkbox click pe call hota hai — poora tree update karo
  const onCheckChange = (id, isChecked) => {
    // Parent click → neeche SAARE bachche same state pe set karo (top → bottom)
    const updateCheckChildren = (items, isChecked) => {
      return items.map((item) => {
        return {
          ...item,
          isChecked: isChecked,
          children: item.children
            ? updateCheckChildren(item.children, isChecked)
            : [],
        };
      });
    };

    // Tree mein dhundho clicked item + upar parents ka status fix karo (bottom → top)
    const updateCheck = (items) => {
      return items.map((item) => {
        // Case 1: Yahi woh item hai jisko click kiya
        if (item.id === id) {
          return {
            ...item,
            isChecked: isChecked,
            children: item.children
              ? updateCheckChildren(item.children, isChecked)
              : [],
          };
        } else if (item?.children?.length > 0) {
          // Case 2: Clicked item iske andar hai — pehle children mein dhundho
          const updateChildren = updateCheck(item.children);
          // Saare bachche checked? → parent bhi checked, warna unchecked
          const allChildrenChecked = updateChildren.every(
            (child) => child.isChecked,
          );
          return {
            ...item,
            isChecked: allChildrenChecked,
            children: updateChildren,
          };
        }
        // Case 3: Is branch se koi lena dena nahi — waise hi chhod do
        return item;
      });
    };

    setData(updateCheck(data));
  };

  return (
    <>
      <h1>Nested Checkboxes</h1>

      <div>
        {data.map((item) => {
          return (
            <NestedCheckbox
              data={item}
              key={item?.id}
              onCheckChange={onCheckChange}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
