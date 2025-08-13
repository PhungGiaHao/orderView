import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isDrawerOpen: boolean;
  activeScreen: string;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  setActiveScreen: (screen: string) => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeScreen, setActiveScreen] = useState<string>('orders');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <UIContext.Provider
      value={{
        isDrawerOpen,
        activeScreen,
        isModalOpen,
        modalContent,
        toggleDrawer,
        closeDrawer,
        setActiveScreen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
