import PropTypes from 'prop-types';


function Main({ count, setCount }) {
    return (
      <main className="container mt-5">
        <div className="text-center">
          <h1>Vite + React</h1>
          <div className="card p-3 mb-3">
            <button className="btn btn-primary" onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p className="mt-3">
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </main>
    );
  }
  
  Main.propTypes = {
    count: PropTypes.number.isRequired,
    setCount: PropTypes.func.isRequired,
  };
  
  export default Main;