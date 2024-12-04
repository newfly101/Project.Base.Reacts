import './css/general.css';

function App() {
  return (
    <div className="App">
      <div className="todo-header">
        <h1>Todos 앱</h1>
        <span className="new-todo">새로운 TODO 추가하기</span>
      </div>
      <div className="add-todos">
        <input type="checkbox"/>
        <input className="todo" type="text"/>
        <img src="/assets/modify.svg" alt="modify"/>
        <img src="/assets/delete.svg" alt="delete"/>
      </div>
    </div>
  );
}

export default App;
