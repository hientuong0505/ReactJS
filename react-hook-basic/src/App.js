import "./App.css";
import React, { useEffect, useState } from "react";
//import ColorBox from './components/ColorBox';
import TodoList from "./components/ToDoList";
import TodoForm from "./components/TodoForm";
import { v4 as uuidv4 } from "uuid";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import queryString from "query-string";
import PostFilterForm from "./components/PostFilterForm";
import Clock from "./components/Clock";
import BetterClock from "./components/BetterClock";
import MagicBox from "./components/MagicBox";

function App() {
  const [todoList, setTodoList] = useState([
    { id: uuidv4(), title: "Tuong dep trai" },
    { id: uuidv4(), title: "Tuong dep trai qua" },
    { id: uuidv4(), title: "Tuong dep trai hihi" },
  ]);

  const [postList, setPostList] = useState();

  //Phan trang
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });

  //Lay du lieu dung 1 lan dau tien
  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const reponse = await fetch(requestUrl);
        const reponseJson = await reponse.json();
        console.log({ reponseJson });

        const { data, pagination } = reponseJson;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Fail: ", error.message);
      }
    }
    fetchPostList();
  }, [filters]); //Neu Filters thay doi no se~ Updated lai PostList

  function handlePageChange(newPage) {
    console.log("New Page: ", newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleTodoClick(todo) {
    console.log(todo);

    //Tim kiem gia tri trong mang
    const index = todoList.findIndex((x) => x.id == todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1); //Bo di phan tu duoc Click
    setTodoList(newTodoList); //Cap nhap lai mang moi thong qua newTodoList
  }

  function handleTodoSubmitForm(formValues) {
    console.log(formValues);
    //Them todo moi hien tai vao todo List
    const newTodo = {
      id: uuidv4(),
      ...formValues,
    };
    console.log(newTodo);
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList); //Cap nhap lai mang moi thong qua newTodoList
  }

  function handleFilterChange(newFilter) {
    console.log(newFilter);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilter.searchTerm,
    });
  }

  const [showClock, setShowClock] = useState(true);
 
  return (
    <div className="App">
      <h1>React Hook ToDoList</h1>

      <MagicBox />

      {/* {showClock && <Clock />}
      <BetterClock />
      <button onClick={()=> setShowClock(!showClock)}>Hide Clock</button> */}

      {/* <TodoForm onSubmit={handleTodoSubmitForm} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}

      {/* Bo loc */}
      {/* <PostFilterForm onSubmit={handleFilterChange}></PostFilterForm> */}

      {/* Cac bai post */}
      {/* <PostList posts={postList}></PostList> */}

      {/* Phan trang */}
      {/* <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      ></Pagination> */}
    </div>
  );
}

export default App;
