import { useState } from "react";
import { CalendarDays, LayoutDashboard, FileText, Bell, LogOut, Settings, User, Calendar, Search, ChevronDown, Menu, X, Eye, Edit, XCircle, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyLeaves() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const leaves = [
        { id: 1, type: "Annual Leave", status: "APPROVED", statusColor: "text-green-600", statusBg: "bg-green-100", startDate: "Aug 15, 2026", endDate: "Aug 20, 2026", duration: "5 days", reason: "Summer vacation trip", submitted: "Jun 12, 2026", approvedBy: "Sarah H." },
        { id: 2, type: "Sick Leave", status: "PENDING", statusColor: "text-yellow-600", statusBg: "bg-yellow-100", startDate: "Sep 2, 2026", endDate: "Sep 2, 2026", duration: "1 day", reason: "Medical appointment", submitted: "Aug 28, 2026", approvedBy: null },
        { id: 3, type: "Personal Leave", status: "REJECTED", statusColor: "text-red-600", statusBg: "bg-red-100", startDate: "Jul 10, 2026", endDate: "Jul 12, 2026", duration: "3 days", reason: "Family event", submitted: "Jul 1, 2026", approvedBy: "Sarah H.", rejectReason: "Blackout period" },
        { id: 4, type: "Annual Leave", status: "APPROVED", statusColor: "text-green-600", statusBg: "bg-green-100", startDate: "Mar 20, 2026", endDate: "Mar 22, 2026", duration: "3 days", reason: "Public holiday extension", submitted: "Mar 10, 2026", approvedBy: "Sarah H." },
        { id: 5, type: "Maternity Leave", status: "PENDING", statusColor: "text-yellow-600", statusBg: "bg-yellow-100", startDate: "Oct 1, 2026", endDate: "Dec 31, 2026", duration: "65 days", reason: "Maternity leave", submitted: "Sep 1, 2026", approvedBy: null, hasDoc: true },
    ];

    const filteredLeaves = leaves.filter(leave => {
        if (activeTab !== "all" && leave.status.toLowerCase() !== activeTab) return false;
        if (searchTerm && !leave.type.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    const getStatusIcon = (status) => {
        if (status === "APPROVED") return <CheckCircle className="w-3 h-3" />;
        if (status === "PENDING") return <Clock className="w-3 h-3" />;
        return <AlertCircle className="w-3 h-3" />;
    };

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
        { icon: FileText, label: "Request Leave", path: "/request-leave" },
        { icon: Calendar, label: "My Leaves", path: "/my-leaves", active: true },
        { icon: Bell, label: "Notifications", path: "/notifications" },
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

            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <div className={`fixed md:relative z-40 w-64 bg-[#4d5e82] text-white transition-transform duration-300 ease-in-out h-full flex flex-col
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
                    {menuItems.map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path}
                            className={`flex items-center gap-3 px-5 py-2.5 text-sm transition mx-2 rounded-lg ${
                                item.active ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

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
                                <User className="w-5 h-5 text-[#005597]" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">Alex Thompson</p>
                                <p className="text-xs text-white/70">Web Designer</p>
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
                        <h2 className="text-lg font-semibold text-[#1a1c20] hidden md:block">My Leaves</h2>

                        <div className="flex items-center gap-4 ml-auto">
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
                                        <div className="px-4 py-3 text-sm text-[#414751]">No new notifications</div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#005597] rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-medium text-[#1a1c20]">Alex Thompson</p>
                                    <p className="text-xs text-[#414751]">Web Designer</p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-[#414751]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#1a1c20]">My Leaves</h1>
                        <p className="text-[#414751] text-sm mt-1">Track all your leave submissions and their status</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6 border-b border-[#c1c7d2]">
                        {["all", "pending", "approved", "rejected"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-medium capitalize transition ${
                                    activeTab === tab 
                                        ? "text-[#005597] border-b-2 border-[#005597]" 
                                        : "text-[#414751] hover:text-[#1a1c20]"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414751]" />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-[#c1c7d2] rounded-lg text-sm focus:outline-none focus:border-[#005597] bg-white"
                        />
                    </div>

                    {/* Leave Cards - Same style as UserDashboard */}
                    <div className="space-y-4">
                        {filteredLeaves.map((leave) => (
                            <div key={leave.id} className="bg-white rounded-xl shadow-sm border border-[#c1c7d2] p-5 hover:shadow-md transition">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-semibold text-[#1a1c20]">{leave.type}</h3>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${leave.statusBg} ${leave.statusColor} flex items-center gap-1`}>
                                            {getStatusIcon(leave.status)}
                                            {leave.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {leave.status === "PENDING" && (
                                            <>
                                                <button className="text-[#005597] hover:text-[#296eb4] text-sm font-medium flex items-center gap-1">
                                                    <Edit className="w-3.5 h-3.5" /> Edit
                                                </button>
                                                <button className="text-[#ba1a1a] hover:text-red-700 text-sm font-medium flex items-center gap-1">
                                                    <XCircle className="w-3.5 h-3.5" /> Cancel
                                                </button>
                                            </>
                                        )}
                                        <button className="text-[#005597] hover:text-[#296eb4] text-sm font-medium flex items-center gap-1">
                                            <Eye className="w-3.5 h-3.5" /> View Details
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="text-sm text-[#414751] mb-2">
                                    {leave.startDate} {leave.startDate !== leave.endDate ? `– ${leave.endDate}` : ""} · {leave.duration}
                                </div>
                                
                                <p className="text-sm text-[#1a1c20] mb-2">Reason: {leave.reason}</p>
                                
                                {leave.hasDoc && (
                                    <p className="text-xs text-[#005597] mb-2">📎 Supporting documents uploaded</p>
                                )}
                                
                                <div className="text-xs text-[#414751] mt-3 pt-3 border-t border-[#c1c7d2]">
                                    Submitted {leave.submitted}
                                    {leave.approvedBy && ` · Approved by: ${leave.approvedBy}`}
                                    {leave.rejectReason && ` · Rejected: ${leave.rejectReason}`}
                                    {leave.status === "PENDING" && " · Awaiting review"}
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredLeaves.length === 0 && (
                        <div className="text-center py-12 text-[#414751]">
                            No leave requests found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}