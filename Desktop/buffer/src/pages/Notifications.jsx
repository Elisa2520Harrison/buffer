// Notifications.jsx
import { useState } from "react";
import { 
    CalendarDays, LayoutDashboard, FileText, Bell, 
    LogOut, Settings, User, Calendar, Menu, X
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Notifications() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: "Leave Request Approved", message: "Your Annual Leave request for Aug 15–20 has been approved by Sarah H.", time: "2 hours ago", read: false },
        { id: 2, title: "Leave Request Rejected", message: "Your Personal Leave request for Jul 10–12 was rejected. Reason: Blackout period.", time: "5 hours ago", read: false },
        { id: 3, title: "Upcoming Leave Reminder", message: "Your approved leave starts in 3 days. Don't forget to handover your tasks.", time: "8 hours ago", read: false },
        { id: 4, title: "Leave Request Submitted", message: "Your Sick Leave request for Sep 2 has been submitted and is pending review.", time: "Yesterday, 4:32 PM", read: true },
        { id: 5, title: "Leave Policy Updated", message: "The 2025 Employee Leave Policy has been updated. Review the new terms before submitting requests.", time: "Aug 25, 2025", read: true },
        { id: 6, title: "Leave Request Approved", message: "Your Annual Leave request for Mar 20–22 was approved by Sarah H.", time: "Mar 12, 2025", read: true },
        { id: 7, title: "Welcome to LeaveApp!", message: "Your account has been set up. You can now submit and track leave requests.", time: "Jan 1, 2025", read: true },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
        ));
    };

    return (
        <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-[#f9f9ff]">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 bg-[#005597] p-2 rounded-lg text-white shadow-lg"
            >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <div className={`fixed md:relative z-40 w-64 bg-[#4d5e82] text-white transition-transform h-full flex flex-col
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                
                <div className="flex items-center gap-2 p-5 border-b border-white/10">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <CalendarDays className="w-4 h-4 text-[#005597]" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold">LeaveApp</h1>
                        <p className="text-[10px] opacity-70">HR Portal</p>
                    </div>
                </div>

                <nav className="flex-1 py-6">
                    {[
                        { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
                        { icon: FileText, label: "Request Leave", path: "/request-leave" },
                        { icon: Calendar, label: "My Leaves", path: "/my-leaves" },
                        { icon: Bell, label: "Notifications", path: "/notifications", active: true, badge: unreadCount },
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path}
                            className={`flex items-center gap-3 px-5 py-2.5 text-sm mx-2 rounded-lg ${
                                item.active ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10"
                            }`}
                        >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                            {item.badge > 0 && (
                                <span className="ml-auto bg-[#ba1a1a] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="border-t border-white/10 p-5">
                   
                    <Link to="/settings" className="flex items-center gap-3 text-white/70 hover:text-white text-sm mb-2">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                    </Link>
                    <Link to="/login" className="flex items-center gap-3 text-white/70 hover:text-white text-sm">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </Link>
                     <div className="bg-white/10 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-[#005597]" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">Alex Thompson</p>
                                <p className="text-xs text-white/70">Senior Designer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Top Bar */}
                <div className="bg-[#f9f9ff] border-b border-[#c1c7d2] sticky top-0 z-20 px-4 sm:px-6 py-3 pt-16 sm:pt-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold text-[#1a1c20]">Notifications</h2>
                            {unreadCount > 0 && (
                                <span className="bg-[#005597] text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button 
                                onClick={markAllAsRead}
                                className="text-sm text-[#005597] hover:text-[#296eb4]"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>
                </div>

                {/* Notifications List */}
                <div className="p-6 max-w-3xl mx-auto">
                    <div className="space-y-4">
                        {notifications.map((notification, idx) => (
                            <div 
                                key={notification.id} 
                                className="cursor-pointer"
                                onClick={() => !notification.read && markAsRead(notification.id)}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? 'bg-[#005597]' : 'bg-[#c1c7d2]'}`}></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between flex-wrap gap-2">
                                            <h3 className={`text-sm ${!notification.read ? 'font-semibold text-[#1a1c20]' : 'font-medium text-[#414751]'}`}>
                                                {notification.title}
                                            </h3>
                                            <span className="text-xs text-[#414751]">{notification.time}</span>
                                        </div>
                                        <p className={`text-sm mt-0.5 ${!notification.read ? 'text-[#1a1c20]' : 'text-[#414751]'}`}>
                                            {notification.message}
                                        </p>
                                    </div>
                                </div>
                                {idx < notifications.length - 1 && (
                                    <div className="border-l-2 border-[#c1c7d2] ml-1 h-4 mt-1"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {notifications.length === 0 && (
                        <div className="text-center py-12 text-[#414751]">
                            <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>No notifications</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}