import AddTextBox from "./components/AddTextBox";

const App = () => {
  return (
    <div className="h-screen bg-gray-200 flex overflow-y-auto">
      <div className="flex flex-grow w-1/2 justify-center items-center">
        <div className="flex h-3/4 w-11/12 bg-white rounded-lg">
          <img></img>
        </div>
      </div>
      <div className="flex flex-grow w-1/2 bg-white">
        <AddTextBox />
      </div>
    </div>
  );
};

export default App;
