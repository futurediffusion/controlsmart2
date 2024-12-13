'use client';

import React, { Suspense, useState, useEffect } from 'react';
import PageLoader from './components/PageLoader';
import './globals.css';

// Importaciones lazy de componentes
const Header = React.lazy(() => import('./components/Header'));
const Slider = React.lazy(() => import('./components/Slider'));
const Bestseller = React.lazy(() => import('./components/Bestseller'));
const Footer = React.lazy(() => import('./components/Footer'));
const InfiniteProductCarousel = React.lazy(() => import('./components/InfiniteProductCarousel'));
const OfertasDinamicas = React.lazy(() => import('./components/OfertasDinamicas'));

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulamos una carga de recursos
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <PageLoader />;
  }

  return (
    <main>
      <Suspense fallback={<PageLoader />}>
        <Header />
        <Slider />
        <Bestseller />
        <OfertasDinamicas />
        <InfiniteProductCarousel />
        <Footer />
      </Suspense>
    </main>
  );
}