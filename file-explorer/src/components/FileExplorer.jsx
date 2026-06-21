import { useState } from "react";

const FileExplorer = ({ fileData, onAdd, onDelete, onEdit }) => {
  const [showChildren, setShowChildren] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState("file");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(fileData.name);

  const handleShow = () => {
    setShowChildren((prev) => !prev);
  };

  const handleSave = () => {
    if (newItemName.trim()) {
      onAdd(fileData.id, newItemName, newItemType);
      setIsAdding(false);
      setNewItemName("");
    }
  };

  return (
    <div style={{ paddingLeft: "20px", margin: "6px" }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
          <button
            style={{ marginLeft: "4px" }}
            onClick={() => {
              onEdit(fileData.id, name);
              setIsEditing(false);
            }}
          >
            Save Edit
          </button>
        </>
      ) : (
        <>
          <span type="button" onClick={handleShow}>
            {fileData.type === "folder" ? "📂" : "🗂️"} {fileData.name}
          </span>
          {fileData.type === "folder" && (
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => setIsAdding(!isAdding)}
            >
              Add
            </button>
          )}
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => setIsEditing(!isEditing)}
          >
            Edit
          </button>
          <button
            style={{ marginLeft: "6px" }}
            onClick={() => onDelete(fileData.id)}
          >
            ❌
          </button>
        </>
      )}

      <div>
        {isAdding && (
          <>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <select
              value={newItemType}
              onChange={(e) => setNewItemType(e.target.value)}
            >
              <option value="file">File</option>
              <option value="folder">Folder</option>
            </select>
            <button onClick={handleSave} style={{ marginLeft: "10px" }}>
              Save
            </button>
          </>
        )}
      </div>

      {showChildren &&
        fileData.children?.map((item) => (
          <FileExplorer
            key={item.id}
            fileData={item}
            onAdd={onAdd}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
    </div>
  );
};

export default FileExplorer;
