import { useRef } from "react";
import { FaPlus } from "react-icons/fa";

function AddItem({ newItem, setItem, handleSubmit }) {
  const inputref = useRef();

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input
        autoFocus
        ref={inputref}
        id="addItem"
        type="text"
        placeholder="Add Item"
        required
        value={newItem}
        onChange={(e) => setItem(e.target.value)}
      />
      <button
        type="submit"
        aria-label="add Item"
        onClick={() => inputref.current.focus()}
      >
        <FaPlus />
      </button>
    </form>
  );
}

export default AddItem;
