import Todo from "./components/Todo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="scroll-smooth ">
      <ToastContainer />
      <section>
        <Todo />
      </section>
    </div>
  );
}

export default App;
