import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Canvas } from '@react-three/fiber';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: false }}
      camera={{ position: [0, 0, 10], fov: 45 }}
    >
      <App />
    </Canvas>
  </React.StrictMode>
);
