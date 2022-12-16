import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('bizon365_timer_app_embedded');
const root = createRoot(container);

root.render(<App tab="home" />);