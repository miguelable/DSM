import GpxViewer from "./gpx/gpx_viewer";

function Main() {
  return (
    <main className="flex-grow-1">
      <div className="text-center">
        <h1>Import a GPX</h1>
        <div className="card p-3 mb-3">
          <GpxViewer />
        </div>
      </div>
    </main>
  );
}

export default Main;
