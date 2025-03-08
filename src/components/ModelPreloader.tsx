// ModelPreloader.jsx
import React, { useEffect, useContext, createContext, useState } from "react";
import { ContactModel } from "./3dModels";

const ModelPreloadContext = createContext({
  modelLoaded: false,
  contactModelRef: null,
});

export const useModelPreload = () => useContext(ModelPreloadContext);

export const ModelPreloadProvider = ({ children }) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [contactModelRef, setContactModelRef] = useState(null);
  
  return (
    <ModelPreloadContext.Provider value={{ modelLoaded, setModelLoaded, contactModelRef, setContactModelRef }}>
      <ModelPreloader />
      {children}
    </ModelPreloadContext.Provider>
  );
};

const ModelPreloader = () => {
  const { setModelLoaded, setContactModelRef } = useModelPreload();
  
  useEffect(() => {
    // Create an invisible instance of the ContactModel to preload
    const preloadedModel = <ContactModel preload={true} onLoad={() => setModelLoaded(true)} />;
    setContactModelRef(preloadedModel);
  }, [setModelLoaded, setContactModelRef]);

  // Return null - this component doesn't render anything visible
  return null;
};