import FileExplorer from "./components/FileExplorer";
import { initialData } from "./data";
import { useState } from "react";
function App() {
  const [data, setData] = useState(initialData);

  const handleDelete = (id) => {
    const deleteItem = (items) => {
      return items
        .filter((item) => item.id !== id)
        .map((item) => {
          if (item.children) {
            return { ...item, children: deleteItem(item.children) };
          }
          return item;
        });
    };
    setData(deleteItem(data));
  };

  const handleOnAdd = (id, newName, newType) => {
    const addData = (items) => {
      return items?.map((item) => {
        if (item.id === id) {
          const newItem = {
            id: crypto.randomUUID(),
            name: newName,
            type: newType,
            children: newType === "folder" ? [] : null,
          };
          return { ...item, children: [...item.children, newItem] };
        } else if (item.children) {
          return { ...item, children: addData(item.children) };
        }
        return item;
      });
    };
    setData(addData(data));
  };

  const handleOnRename = (id, newName) => {
    const rename = (items) => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, name: newName };
        } else if (item.children) {
          return { ...item, children: rename(item.children) };
        }
        return item;
      });
    };

    setData(rename(data));
  };

  return (
    <>
      <h1>File Explorer</h1>

      <div>
        {data?.map((item) => {
          return (
            <FileExplorer
              key={item.id}
              fileData={item}
              onAdd={handleOnAdd}
              onDelete={handleDelete}
              onEdit={handleOnRename}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
