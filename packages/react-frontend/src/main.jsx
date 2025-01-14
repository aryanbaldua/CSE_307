import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./Myapp";
import "./main.css";

const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render:
root.render(<MyApp />);


