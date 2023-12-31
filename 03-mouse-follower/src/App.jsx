import "./App.css";
import { useState, useEffect } from "react";

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  //le damos de la dependencia de enabled, osea que se genera cada vez que cambia enabled
  useEffect(() => {
    console.log("Efecto", { enabled });
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      console.log("handleMove", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };
    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    } else {
      window.removeEventListener("pointermove", handleMove);
    }

    //si no limpiamos el efecto no se ejecturara cuando se desmonte el componente por mas que desactivemos con el boton el mouse follower
    //=>cuando el componente se desmonta__=>cuando cambian las dependiencias antes de ejecturar el efecto de nuevo
    return () => {
      console.log("cleanup");
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#09f",
          border: "3px solid #eb0707",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <h2>PROYECTO 3</h2>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar " : "Activar "}seguir puntero
      </button>
    </>
  );
};
function App() {
  return (
    <>
      <FollowMouse />
    </>
  );
}

export default App;
