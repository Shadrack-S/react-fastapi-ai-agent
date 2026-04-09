import { useState } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../contexts/AppContext";
import {
  ArrowLeft,
  User,
  Mail,
  Camera,
  Moon,
  Sun,
  LogOut,
  Shield,
  Bell,
  Globe,
} from "lucide-react";

export const ProfilePage = () => {
  const { user, logout, theme, toggleTheme } = useApp();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Chat
        </button>

        <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600" />

          <div className="px-6 md:px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
              <div className="flex items-end gap-4 mb-4 md:mb-0">
                <div className="relative">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-32 h-32 rounded-2xl border-4 border-card bg-card shadow-xl"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-2xl border-4 border-card bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  )}
                  <button className="absolute bottom-2 right-2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <div className="pb-2">
                  <h1 className="text-foreground">{user?.name}</h1>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-foreground mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-muted-foreground mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 bg-input-background dark:bg-input rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-foreground disabled:opacity-60 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-muted-foreground mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 bg-input-background dark:bg-input rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-foreground disabled:opacity-60 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-foreground mb-4">Preferences</h3>
                <div className="space-y-3">
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary rounded-xl transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      {theme === "light" ? (
                        <Moon className="w-5 h-5 text-foreground" />
                      ) : (
                        <Sun className="w-5 h-5 text-foreground" />
                      )}
                      <div className="text-left">
                        <p className="text-foreground">Theme</p>
                        <p className="text-muted-foreground">
                          {theme === "light" ? "Light Mode" : "Dark Mode"}
                        </p>
                      </div>
                    </div>
                    <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                      Switch
                    </div>
                  </button>

                  <div className="w-full flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-foreground" />
                      <div className="text-left">
                        <p className="text-foreground">Notifications</p>
                        <p className="text-muted-foreground">
                          Manage notification settings
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 rounded"
                    />
                  </div>

                  <div className="w-full flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-foreground" />
                      <div className="text-left">
                        <p className="text-foreground">Language</p>
                        <p className="text-muted-foreground">English (US)</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-foreground" />
                      <div className="text-left">
                        <p className="text-foreground">Privacy</p>
                        <p className="text-muted-foreground">
                          Manage privacy settings
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-xl transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
