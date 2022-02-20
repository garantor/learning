import ItemsList from "./ItemList";

function Content({items, handleCheck, handleDelete}) {


  return (
    <>
      {items.length ? (
      <ItemsList 
                items={items}
                handleCheck={handleCheck} 
                handleDelete={handleDelete} 
      />

      ) : (
        <p style={{ marginTop: "2rem" }}>
          Your List is Empty.
          {/*  */}
        </p>
      )}
    </>
  );
}

export default Content;
