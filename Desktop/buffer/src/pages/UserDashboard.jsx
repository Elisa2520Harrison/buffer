import { useState } from "react";
import {
    CalendarDays, LayoutDashboard, FileText, Bell, LogOut, Settings, User, ChevronRight, PlusCircle, Eye, Calendar, ChevronDown, Menu, X
} from "lucide-react";
import { Link } from "react-router-dom";

export default function UserDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const stats = [
        { label: "Annual Leave", used: 5, remaining: 15, total: 20, color: "#005597" },
        { label: "Sick Leave", used: 2, remaining: 8, total: 10, color: "#4d5e82" },
        { label: "Pending", used: 2, remaining: 0, total: 2, color: "#3d5576" },
    ];

    const balanceStats = [
        { label: "Annual Leave", used: 5, remaining: 15, total: 20 },
        { label: "Sick Leave", used: 2, remaining: 8, total: 10 },
        { label: "Personal Leave", used: 0, remaining: 5, total: 5 },
    ];

    const recentRequests = [
        { type: "Annual Leave", dates: "Aug 15 – Aug 20, 2026", duration: "5 days", reason: "Summer vacation", status: "APPROVED", statusColor: "text-green-600" },
        { type: "Sick Leave", dates: "Sep 2, 2026", duration: "1 day", reason: "Medical appointment", status: "PENDING", statusColor: "text-yellow-600" },
        { type: "Personal Leave", dates: "Jul 10 – Jul 12, 2026", duration: "3 days", reason: "Family event", status: "REJECTED", statusColor: "text-red-600" },
    ];

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", active: true },
        { icon: FileText, label: "Request Leave" },
        { icon: Calendar, label: "My Leaves" },
        { icon: Bell, label: "Notifications" },
    ];

    return (
        <div className="h-screen flex flex-col md:flex-row overflow-hidden">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 bg-[#005597] backdrop-blur-sm p-2 rounded-lg text-white shadow-lg"
            >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed md:relative z-40 w-64 bg-[#4d5e82] text-white transition-transform duration-300 ease-in-out h-full flex flex-col
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>

                {/* Logo */}
                <div className="flex items-center gap-2 p-5 border-b border-white/10">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <CalendarDays className="w-4 h-4 text-[#005597]" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold">LeaveApp</h1>
                        <p className="text-[10px] opacity-70">HR Portal</p>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 py-6">
                    {menuItems.map((item, idx) => (
                        <Link
                            key={idx}
                            to="#"
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
                    <Link to="#" className="flex items-center gap-3 text-white/70 hover:text-white text-sm">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                    </Link>
                    <Link to="/login" className="flex items-center gap-3 text-white/70 hover:text-white text-sm">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-[#f9f9ff]">
                {/* Top Bar */}
                <div className="bg-[#f9f9ff] border-b border-[#c1c7d2] sticky top-0 z-20">
                    <div className="flex items-center justify-between px-6 py-3">
                        <h2 className="text-lg font-semibold text-[#1a1c20] hidden md:block">Dashboard</h2>

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

                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#005597] rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-medium text-[#1a1c20]">Alex Mensah</p>
                                    <p className="text-xs text-[#414751]">Software Engineer</p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-[#414751]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#1a1c20]">
                            Good morning, Alex
                        </h1>
                        <p className="text-[#414751] text-sm mt-1">
                            You have 23 days of leave remaining this cycle.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-[#005597] rounded-xl p-4 text-white">
                            <p className="text-xs opacity-80">ANNUAL LEAVE</p>
                            <p className="text-2xl font-bold mt-1">15 <span className="text-sm font-normal">of 20 days</span></p>
                            <p className="text-xs opacity-80 mt-2">remaining</p>
                        </div>

                        <div className="bg-[#4d5e82] rounded-xl p-4 text-white">
                            <p className="text-xs opacity-80">SICK LEAVE</p>
                            <p className="text-2xl font-bold mt-1">8 <span className="text-sm font-normal">of 10 days</span></p>
                            <p className="text-xs opacity-80 mt-2">remaining</p>
                        </div>

                        <div className="bg-[#3d5576] rounded-xl p-4 text-white">
                            <p className="text-xs opacity-80">PENDING</p>
                            <p className="text-2xl font-bold mt-1">2 <span className="text-sm font-normal">requests</span></p>
                            <p className="text-xs opacity-80 mt-2">awaiting approval</p>
                        </div>

                        <div className="bg-[#566d90] rounded-xl p-4 text-white">
                            <p className="text-xs opacity-80">APPROVED</p>
                            <p className="text-2xl font-bold mt-1">5 <span className="text-sm font-normal">this year</span></p>
                            <p className="text-xs opacity-80 mt-2">total approved</p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Leave Balance Overview */}
                        <div className="lg:col-span-2 bg-[#f9f9ff] rounded-xl shadow-sm border border-[#c1c7d2]">
                            <div className="p-5 border-b border-[#c1c7d2]">
                                <h3 className="font-semibold text-[#1a1c20]">Leave Balance Overview</h3>
                                <p className="text-xs text-[#414751]">FY 2026</p>
                            </div>
                            <div className="p-5 space-y-4">
                                {balanceStats.map((stat, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-[#1a1c20]">{stat.label}</span>
                                            <span className="text-[#414751]">{stat.used} / {stat.total} days used</span>
                                        </div>
                                        <div className="w-full bg-[#e8e7ef] rounded-full h-2">
                                            <div
                                                className="bg-[#005597] h-2 rounded-full"
                                                style={{ width: `${(stat.used / stat.total) * 100}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-[#414751] mt-1">
                                            <span>Used: {stat.used}</span>
                                            <span>Remaining: {stat.remaining}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions Card */}
                        <div className="bg-[#f9f9ff] rounded-xl shadow-sm border border-[#c1c7d2]">
                            <div className="p-5 border-b border-[#c1c7d2]">
                                <h3 className="font-semibold text-[#1a1c20]">Quick Actions</h3>
                            </div>
                            <div className="p-5 space-y-3">
                                <button className="w-full flex items-center justify-between p-3 bg-[#d3e4ff] hover:bg-[#a2c9ff] rounded-lg transition">
                                    <div className="flex items-center gap-3">
                                        <PlusCircle className="w-4 h-4 text-[#005597]" />
                                        <span className="text-sm font-medium text-[#005597]">New Leave Request</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-[#005597]" />
                                </button>

                                <button className="w-full flex items-center justify-between p-3 bg-[#ededf4] hover:bg-[#e8e7ef] rounded-lg transition">
                                    <div className="flex items-center gap-3">
                                        <Eye className="w-4 h-4 text-[#414751]" />
                                        <span className="text-sm font-medium text-[#1a1c20]">View All Requests</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-[#414751]" />
                                </button>

                                <button className="w-full flex items-center justify-between p-3 bg-[#ededf4] hover:bg-[#e8e7ef] rounded-lg transition">
                                    <div className="flex items-center gap-3">
                                        <Bell className="w-4 h-4 text-[#414751]" />
                                        <span className="text-sm font-medium text-[#1a1c20]">Notifications</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-[#414751]" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Leave */}
                    <div className="bg-[#f9f9ff] rounded-xl shadow-sm border border-[#c1c7d2] mb-8">
                        <div className="p-5 border-b border-[#c1c7d2]">
                            <h3 className="font-semibold text-[#1a1c20]">Upcoming Leave</h3>
                        </div>
                        <div className="p-5">
                            <div className="flex items-center justify-between p-4 bg-[#d3e4ff] rounded-lg">
                                <div>
                                    <p className="font-semibold text-[#1a1c20]">Summer Vacation</p>
                                    <p className="text-sm text-[#414751]">Aug 15 – Aug 20 · 5 days</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                    APPROVED
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Leave Requests Table */}
                    <div className="bg-[#f9f9ff] rounded-xl shadow-sm border border-[#c1c7d2]">
                        <div className="p-5 border-b border-[#c1c7d2]">
                            <h3 className="font-semibold text-[#1a1c20]">Recent Leave Requests</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#ededf4] border-b border-[#c1c7d2]">
                                    <tr>
                                        <th className="text-left p-4 text-xs font-semibold text-[#414751]">LEAVE TYPE</th>
                                        <th className="text-left p-4 text-xs font-semibold text-[#414751]">DATES</th>
                                        <th className="text-left p-4 text-xs font-semibold text-[#414751]">DURATION</th>
                                        <th className="text-left p-4 text-xs font-semibold text-[#414751]">REASON</th>
                                        <th className="text-left p-4 text-xs font-semibold text-[#414751]">STATUS</th>
                                        <th className="text-left p-4 text-xs font-semibold text-[#414751]">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentRequests.map((request, idx) => (
                                        <tr key={idx} className="border-b border-[#c1c7d2] hover:bg-[#ededf4]">
                                            <td className="p-4 text-sm text-[#1a1c20]">{request.type}</td>
                                            <td className="p-4 text-sm text-[#414751]">{request.dates}</td>
                                            <td className="p-4 text-sm text-[#414751]">{request.duration}</td>
                                            <td className="p-4 text-sm text-[#414751]">{request.reason}</td>
                                            <td className="p-4">
                                                <span className={`text-xs font-semibold ${request.statusColor}`}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <button className="text-[#005597] hover:text-[#296eb4] text-sm font-medium">
                                                    {request.status === "PENDING" ? "Edit" : "Details"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}