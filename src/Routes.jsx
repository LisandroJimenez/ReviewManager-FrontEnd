import { lazy } from 'react';

const LandingPage = lazy(() => import('./pages/LandingPage'));

const routes = [
  
    { path: '', element: <LandingPage /> }
  
];

export default routes;