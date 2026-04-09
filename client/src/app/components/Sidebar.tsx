import { useApp } from "../contexts/AppContext";
import { useNavigate } from "react-router";
import {
  MessageSquarePlus,
  MessageSquare,
  User,
  LogOut,
  Moon,
  Sun,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Chat {
  id: string;
  title: string;
  timestamp: string;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobile: boolean;
  onClose: () => void;
  currentChatId: string | null;
  onChatSelect: (id: string) => void;
}

const mockChats: Chat[] = [
  { id: "1", title: "Getting started with AI", timestamp: "2 hours ago" },
  { id: "2", title: "React best practices", timestamp: "Yesterday" },
  { id: "3", title: "Machine learning basics", timestamp: "2 days ago" },
  { id: "4", title: "Building APIs with Node.js", timestamp: "3 days ago" },
  { id: "5", title: "CSS Grid vs Flexbox", timestamp: "1 week ago" },
];

export const Sidebar = ({
  isOpen,
  onToggle,
  isCollapsed,
  onToggleCollapse,
  isMobile,
  onClose,
  currentChatId,
  onChatSelect,
}: SidebarProps) => {
  const { user, logout, theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNewChat = () => {
    const newChatId = String(mockChats.length + 1);
    onChatSelect(newChatId);
  };

  // Determine sidebar width class
  const widthClass =
    isCollapsed && !isMobile ? "w-16" : "w-72";

  // Determine translate class
  // Mobile: slide in/out; Desktop: always visible
  const translateClass =
    isMobile
      ? isOpen
        ? "translate-x-0"
        : "-translate-x-full"
      : "translate-x-0";

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          ${widthClass}
          ${translateClass}
          fixed inset-y-0 left-0 z-30
          lg:relative lg:z-auto lg:translate-x-0
          flex flex-col h-full
          bg-sidebar border-r border-sidebar-border
          transition-all duration-300 ease-in-out
          overflow-hidden
        `}
        aria-label="Chat sidebar"
      >
        {/* ── COLLAPSED (desktop icon-only) view ── */}
        {isCollapsed && !isMobile ? (
          <div className="flex flex-col items-center h-full py-4 gap-2">
            {/* Expand button */}
            <button
              onClick={onToggleCollapse}
              title="Expand sidebar"
              aria-label="Expand sidebar"
              className="p-2 hover:bg-sidebar-accent rounded-xl transition-all text-sidebar-foreground"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Avatar */}
            {user?.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                title={user.name}
                className="w-8 h-8 rounded-full mt-1"
              />
            )}

            <div className="w-8 h-px bg-sidebar-border my-1" />

            {/* New Chat */}
            <button
              onClick={handleNewChat}
              title="New Chat"
              aria-label="New Chat"
              className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all shadow-md"
            >
              <MessageSquarePlus className="w-5 h-5" />
            </button>

            {/* Chat list (icons only) */}
            <div className="flex-1 flex flex-col gap-1 overflow-y-auto w-full items-center pt-1">
              {mockChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onChatSelect(chat.id)}
                  title={chat.title}
                  aria-label={chat.title}
                  className={`p-2 rounded-xl transition-all hover:bg-sidebar-accent ${
                    currentChatId === chat.id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground"
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
              ))}
            </div>

            {/* Bottom actions (icons only) */}
            <div className="flex flex-col gap-1 items-center">
              <button
                onClick={() => navigate("/profile")}
                title="Profile"
                aria-label="Profile"
                className="p-2 hover:bg-sidebar-accent text-sidebar-foreground rounded-xl transition-all"
              >
                <User className="w-5 h-5" />
              </button>

              <button
                onClick={toggleTheme}
                title={theme === "light" ? "Dark Mode" : "Light Mode"}
                aria-label="Toggle theme"
                className="p-2 hover:bg-sidebar-accent text-sidebar-foreground rounded-xl transition-all"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={handleLogout}
                title="Logout"
                aria-label="Logout"
                className="p-2 hover:bg-destructive/10 text-destructive rounded-xl transition-all"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          /* ── EXPANDED view ── */
          <>
            {/* Header */}
            <div className="p-4 border-b border-sidebar-border">
              <div className="flex items-center gap-3 mb-4">
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full bg-sidebar-accent flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sidebar-foreground truncate">
                    {user?.name}
                  </p>
                  <p className="text-sidebar-foreground/60 truncate text-sm">
                    {user?.email}
                  </p>
                </div>

                {/* Collapse button – desktop only */}
                {!isMobile && (
                  <button
                    onClick={onToggleCollapse}
                    title="Collapse sidebar"
                    aria-label="Collapse sidebar"
                    className="p-1.5 hover:bg-sidebar-accent rounded-lg transition-all text-sidebar-foreground/60 hover:text-sidebar-foreground flex-shrink-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                onClick={handleNewChat}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                aria-label="New Chat"
              >
                <MessageSquarePlus className="w-5 h-5" />
                New Chat
              </button>
            </div>

            {/* Chat list */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sidebar-foreground/60 mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Recent Chats</span>
                </div>
                <div className="space-y-1">
                  {mockChats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => onChatSelect(chat.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all hover:bg-sidebar-accent group ${
                        currentChatId === chat.id
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="truncate">{chat.title}</p>
                          <p className="text-sidebar-foreground/50 text-sm">
                            {chat.timestamp}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="p-4 border-t border-sidebar-border space-y-2">
              <button
                onClick={() => navigate("/profile")}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-sidebar-accent text-sidebar-foreground transition-all"
                aria-label="Profile"
              >
                <User className="w-5 h-5" />
                Profile
              </button>

              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-sidebar-accent text-sidebar-foreground transition-all"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <>
                    <Moon className="w-5 h-5" />
                    Dark Mode
                  </>
                ) : (
                  <>
                    <Sun className="w-5 h-5" />
                    Light Mode
                  </>
                )}
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-destructive/10 text-destructive transition-all"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};