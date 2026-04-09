import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { ChatArea } from "../components/ChatArea";
import { useSidebar } from "../hooks/useSidebar";

export const ChatPage = () => {
  const {
    isSidebarOpen,
    isCollapsed,
    isMobile,
    toggleSidebar,
    toggleCollapsed,
    closeSidebar,
  } = useSidebar();

  const [currentChatId, setCurrentChatId] = useState<string | null>("1");

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapsed}
        isMobile={isMobile}
        onClose={closeSidebar}
        currentChatId={currentChatId}
        onChatSelect={(id) => {
          setCurrentChatId(id);
          // Auto-close sidebar on mobile after selecting a chat
          if (isMobile) closeSidebar();
        }}
      />
      <ChatArea
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
      />
    </div>
  );
};
