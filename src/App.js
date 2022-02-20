import Header from "./Components/Header";
import Content from "./Components/Content";
import Footer from "./Components/Footer";
import { useState, useEffect } from "react";
import AddItem from "./Components/AddItem";
import SearchItem from "./Components/SearchItem";
import RequestsApi from "./Components/RequestsApi";

//INSTALLATION GUILD
// Only use npm to install a package when you want that package to be added to your dependencies(npm install package)
// use npx when u want to use it for just development (npx install package)
//   //Accepting args, the best way to accept agrs in html elemets in react is through arrow functions lik this, () => function(args)

//   // this is react main features, ability to render a state without reloading the entire app

function App() {
  const MAIN_API_URL = "http://localhost:3500/items";
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppinglist")) || []
  );
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  //useEffect is called each time the app render and is also called asycn
  //to prevent it from been called each time an app render to only when a state change we pass in the [] at the bottom of an anonymous function inside of useeffect, useEffect will only be called with the state of that [](item) changes

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(MAIN_API_URL);
        if (!response.ok) throw Error("Did not Receive expected Data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally{
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      fetchItems();
    }, 2000)
   
  }, []);

  async function addItem(item) {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    //constructing transaction data
    const ReqBody = {
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(myNewItem)
    }

    //sending actual request
    const reqResult = await RequestsApi(MAIN_API_URL, ReqBody);
    if (reqResult) setFetchError(reqResult)

  }

  async function handleCheck(id) {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    //handle check item, this will update the state in the db
    const checkItem = listItems.filter((items) => items.id === id);
    
    const patchBody = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: checkItem[0].checked }),
    };
    const PatchURL = `${MAIN_API_URL}/${id}`;
    const patchResponse = await RequestsApi(PatchURL, patchBody);
    if (patchResponse) setFetchError(patchResponse)

  }

  async function handleDelete(id) {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteBody ={
      method:"DELETE"
    };
    const deleteURL = `${MAIN_API_URL}/${id}`;
    const deleteRequest = await RequestsApi(deleteURL, deleteBody);
    if (deleteRequest) setFetchError(deleteRequest)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  }

  return (
    <div className="App">
      <Header title="Grocery List" />

      <AddItem
        newItem={newItem}
        setItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p> Loading items ....</p>}
        {fetchError && (
          <p style={{ color: "red" }}> {`Error: ${fetchError}`}</p>
        )}
        {!fetchError && !isLoading &&
        <Content
          items={items.filter((item) =>
            item.item.toLowerCase().includes(search.toLowerCase())
          )}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
          }
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
