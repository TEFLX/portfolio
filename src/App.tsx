import "./index.css";
import { useEffect, useState } from "react";
import { Portfolio } from "./components/portfolio";
import { CustomCursor, Loader } from "./components/cursor-loader";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
  }, [loading]);

  return (
    <div className="noise">
      {loading ? (
        <Loader onDone={() => setLoading(false)} />
      ) : (
        <>
          <div className="aurora">
            <div className="aurora-blob b1" />
            <div className="aurora-blob b2" />
            <div className="aurora-blob b3" />
          </div>

          <div className="grid-bg" />

          <CustomCursor />
          <Portfolio />
        </>
      )}
    </div>
  );
}