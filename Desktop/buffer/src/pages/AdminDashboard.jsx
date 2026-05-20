import { useState } from "react";
import { CalendarDays, LayoutDashboard, FileText, Bell, LogOut, Settings, User, Calendar, Users, CheckCircle, XCircle, Clock, TrendingUp, Menu, X, ChevronRight, BarChart3, Tag,Eye, PlusCircle, Filter, Search, MoreVertical
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    const stats = [
        { label: "PENDING REVIEW", value: "7", change: "Requires action", color: "#005597", icon: Clock, bgColor: "bg-[#005597]" },
        { label: "APPROVED THIS MONTH", value: "24", change: "↑ 12% vs last month", color: "#4d5e82", icon: CheckCircle, bgColor: "bg-[#4d5e82]", trend: "up" },
        { label: "REJECTED THIS MONTH", value: "3", change: "Policy violations", color: "#3d5576", icon: XCircle, bgColor: "bg-[#3d5576]" },
        { label: "ON LEAVE TODAY", value: "5", change: "of 48 employees", color: "#566d90", icon: Users, bgColor: "bg-[#566d90]" },
    ];

    const pendingRequests = [
        { id: 1, name: "Kofi Asante", type: "Annual Leave", dates: "Sep 10–15", duration: "4 days", time: "2 hrs ago", avatar: "KA" },
        { id: 2, name: "Ama Boateng", type: "Sick Leave", dates: "Sep 8", duration: "1 day", time: "4 hrs ago", avatar: "AB" },
        { id: 3, name: "Emmanuel Darko", type: "Personal Leave", dates: "Sep 12–13", duration: "2 days", time: "Yesterday", avatar: "ED" },
    ];

    const onLeaveToday = [
        { initials: "JO", name: "James Osei", type: "Annual Leave", back: "Back Sep 6" },
        { initials: "PM", name: "Priscilla Mensah", type: "Sick Leave", back: "Back Sep 5" },
        { initials: "BK", name: "Ben Kusi", type: "Annual Leave", back: "Back Sep 10" },
        { initials: "AA", name: "Abena Agyei", type: "Personal Leave", back: "Back Sep 6" },
        { initials: "DT", name: "David Tetteh", type: "Annual Leave", back: "Back Sep 9" },
    ];

    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", path: "/admin", active: true },
        { icon: FileText, label: "Leave Management", path: "/admin/leave-management" },
        { icon: Bell, label: "Notifications", path: "/admin/notifications" },
        { icon: Users, label: "Employees", path: "/admin/employees" },
        { icon: BarChart3, label: "Reports", path: "/admin/reports" },
        { icon: Tag, label: "Leave Types", path: "/admin/leave-types" },
    ];

    return (
        <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-[#f9f9ff]">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 bg-[#005597] backdrop-blur-sm p-2 rounded-lg text-white shadow-lg"
            >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* Sidebar - Admin Dark Navy */}
            <div className={`fixed md:relative z-40 w-64 bg-[#2e3036] text-white transition-transform duration-300 ease-in-out h-full flex flex-col
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>

                {/* Logo */}
                <div className="flex items-center gap-2 p-5 border-b border-white/10">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <CalendarDays className="w-4 h-4 text-[#005597]" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold">LeaveApp</h1>
                        <p className="text-[10px] opacity-70">Admin Portal</p>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 py-6">
                    {menuItems.map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path}
                            className={`flex items-center gap-3 px-5 py-2.5 text-sm transition mx-2 rounded-lg ${item.active
                                ? "bg-white/20 text-white"
                                : "text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Bottom Menu */}
                <div className="border-t border-white/10 p-5 space-y-2">
                    <Link to="/settings" className="flex items-center gap-3 text-white/70 hover:text-white text-sm">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                    </Link>
                    <Link to="/login" className="flex items-center gap-3 text-white/70 hover:text-white text-sm">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </Link>
                    <div className="bg-white/10 rounded-lg p-3 mt-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-[#2e3036]">SH</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">Sarah Henderson</p>
                                <p className="text-xs text-white/70">HR Administrator</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-[#f9f9ff]">
                {/* Top Bar */}
                <div className="bg-[#f9f9ff] border-b border-[#c1c7d2] sticky top-0 z-20">
                    <div className="flex items-center justify-between px-6 py-3">
                        <h2 className="text-lg font-semibold text-[#1a1c20] hidden md:block">Admin Overview</h2>

                        <div className="flex items-center gap-4 ml-auto">

                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                                    className="relative p-1.5 hover:bg-[#ededf4] rounded-lg transition"
                                >
                                    <Bell className="w-5 h-5 text-[#414751]" />
                                    <span className="absolute top-0 right-0 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
                                </button>

                                {notificationsOpen && (
                                    <div className="absolute right-0 mt-2 w-72 bg-[#f9f9ff] rounded-lg shadow-lg border border-[#c1c7d2] py-2 z-30">
                                        <div className="px-4 py-2 border-b border-[#c1c7d2]">
                                            <p className="text-sm font-semibold text-[#1a1c20]">Notifications</p>
                                        </div>
                                        <div className="px-4 py-3 text-sm text-[#414751]">
                                            No new notifications
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* User Profile */}
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#005597] rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">SH</span>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-medium text-[#1a1c20]">Sarah Henderson</p>
                                    <p className="text-xs text-[#414751]">HR Administrator</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6">
                    {/* Welcome Section */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#1a1c20]">
                            Good morning, Sarah
                        </h1>
                        <p className="text-[#414751] text-sm mt-1">
                            You have <span className="font-semibold text-[#005597]">7 pending requests</span> waiting for your review.
                        </p>
                    </div>

                    {/* Stats Cards - Same style as User Dashboard */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className={`${stat.bgColor} rounded-xl p-4 text-white`}>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs opacity-80 uppercase">{stat.label}</p>
                                    <stat.icon className="w-4 h-4 opacity-80" />
                                </div>
                                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                <p className="text-xs opacity-80 mt-2">{stat.change}</p>
                            </div>
                        ))}
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Pending Requests - Takes 2 columns */}
                        <div className="lg:col-span-2 bg-[#f9f9ff] rounded-xl shadow-sm border border-[#c1c7d2]">
                            <div className="p-5 border-b border-[#c1c7d2] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-[#1a1c20]">Pending Requests</h3>
                                    <span className="bg-[#ba1a1a] text-white text-xs px-2 py-0.5 rounded-full">7 new</span>
                                </div>
                                <Link to="/admin/leave-management" className="text-sm text-[#005597] hover:text-[#296eb4] flex items-center gap-1">
                                    Manage All <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="divide-y divide-[#c1c7d2]">
                                {pendingRequests.map((request) => (
                                    <div key={request.id} className="p-4 hover:bg-[#ededf4] transition">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#d3e4ff] rounded-full flex items-center justify-center">
                                                    <span className="text-sm font-medium text-[#005597]">{request.avatar}</span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#1a1c20]">{request.name}</p>
                                                    <p className="text-sm text-[#414751]">{request.type} - {request.dates} - {request.duration}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-[#414751] bg-[#ededf4] px-2 py-1 rounded-full">
                                                PENDING: {request.time}
                                            </span>
                                        </div>
                                        <div className="flex gap-4 mt-3 ml-13">
                                            <button className="text-sm text-[#005597] cursor-pointer hover:text-[#296eb4] font-medium flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" /> Approve
                                            </button>
                                            <button className="text-sm text-[#ba1a1a] hover:text-red-700 font-medium flex items-center cursor-pointer gap-1">
                                                <XCircle className="w-3 h-3" /> Reject
                                            </button>
                                            <button className="text-sm text-[#414751] hover:text-[#1a1c20] font-medium cursor-pointer flex items-center gap-1">
                                                <Eye className="w-3 h-3" /> Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-[#c1c7d2] bg-[#f9f9ff]">
                                <Link to="/admin/leave-management" className="text-sm text-[#005597] hover:text-[#296eb4] flex items-center justify-center gap-1">
                                    View all 7 pending requests →
                                </Link>
                            </div>
                        </div>

                        {/* On Leave Today */}
                        <div className="bg-[#f9f9ff] rounded-xl shadow-sm border border-[#c1c7d2]">
                            <div className="p-5 border-b border-[#c1c7d2] flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[#005597]" />
                                <h3 className="font-semibold text-[#1a1c20]">On Leave Today</h3>
                            </div>
                            <div className="divide-y divide-[#c1c7d2]">
                                {onLeaveToday.map((employee) => (
                                    <div key={employee.initials} className="p-4 flex items-center gap-3 hover:bg-[#ededf4] transition">
                                        <div className="w-8 h-8 bg-[#d3e4ff] rounded-full flex items-center justify-center shrink-0">
                                            <span className="text-xs font-medium text-[#005597]">{employee.initials}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-[#1a1c20] text-sm">{employee.name}</p>
                                            <p className="text-xs text-[#414751]">{employee.type} - {employee.back}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}