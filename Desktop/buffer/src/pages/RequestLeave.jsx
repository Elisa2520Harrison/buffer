import { useState } from "react";
import { CalendarDays, LayoutDashboard, FileText, Bell, LogOut, Settings, User, ChevronRight, Calendar, File, Upload, Clock, AlertCircle, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import MyLeaves from "./MyLeaves";
import { Navigate } from "react-router-dom";

export default function RequestLeave() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        leaveType: "annual",
        startDate: "",
        endDate: "",
        isHalfDay: false,
        reason: "",
        file: null
    });

    const leaveTypes = [
        { id: "annual", label: "Annual Leave", remaining: 15, color: "#005597" },
        { id: "sick", label: "Sick Leave", remaining: 8, color: "#4d5e82" },
        { id: "personal", label: "Personal Leave", remaining: 5, color: "#3d5576" },
    ];

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/" },
        { icon: FileText, label: "Request Leave", path: "/request-leave" },
        { icon: Calendar, label: "My Leaves", path: "/my-leaves" },
        { icon: Bell, label: "Notifications", path: "/notifications" },
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, file: e.target.files[0] }));
    };

    const selectedLeave = leaveTypes.find(t => t.id === formData.leaveType);

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
                        { icon: FileText, label: "Request Leave", path: "/request-leave", active: true },  
                        { icon: Calendar, label: "My Leaves", path:  "/my-leaves" },                
                        { icon: Bell, label: "Notifications" },
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path}
                            className={`flex items-center gap-3 px-5 py-2.5 text-sm mx-2 rounded-lg ${item.active ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10"
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="border-t border-white/10 p-5 space-y-2">
                    <Link to="#" className="flex items-center gap-3 text-white/70 hover:text-white text-sm">
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
                                <p className="text-xs text-white/70">Web Designer</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Top Bar */}
                <div className="bg-[#f9f9ff] border-b border-[#c1c7d2] sticky top-0 z-20 px-6 py-3  pt-16 sm:pt-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-[#1a1c20]">Request Leave</h2>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#005597] rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm text-[#1a1c20] hidden sm:inline">Alex Thompson</span>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-6 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Leave Type Selection */}
                            <div className="bg-white rounded-xl border border-[#c1c7d2] p-5">
                                <h3 className="font-semibold text-[#1a1c20] mb-4">Select Leave Type</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {leaveTypes.map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => setFormData(prev => ({ ...prev, leaveType: type.id }))}
                                            className={`p-3 rounded-lg border-2 text-left transition ${formData.leaveType === type.id
                                                ? "border-[#005597] bg-[#d3e4ff]"
                                                : "border-[#c1c7d2] hover:border-[#005597]"
                                                }`}
                                        >
                                            <p className="font-medium text-[#1a1c20] text-sm">{type.label}</p>
                                            <p className="text-xs text-[#414751]">{type.remaining} days remaining</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Date Selection */}
                            <div className="bg-white rounded-xl border border-[#c1c7d2] p-5">
                                <h3 className="font-semibold text-[#1a1c20] mb-4">Select Dates</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#414751] mb-1">START DATE</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            className="w-full border border-[#c1c7d2] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#005597]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#414751] mb-1">END DATE</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            className="w-full border border-[#c1c7d2] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#005597]"
                                        />
                                    </div>
                                </div>
                                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isHalfDay"
                                        checked={formData.isHalfDay}
                                        onChange={handleChange}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm text-[#1a1c20]">Half-day leave</span>
                                </label>
                            </div>

                            {/* Reason */}
                            <div className="bg-white rounded-xl border border-[#c1c7d2] p-5">
                                <h3 className="font-semibold text-[#1a1c20] mb-4">Reason & Details</h3>
                                <label className="block text-xs font-semibold text-[#414751] mb-1">REASON FOR LEAVE</label>
                                <textarea
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Briefly describe the reason for your leave request..."
                                    className="w-full border border-[#c1c7d2] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#005597]"
                                />
                            </div>

                            {/* Document Upload */}
                            <div className="bg-white rounded-xl border border-[#c1c7d2] p-5">
                                <h3 className="font-semibold text-[#1a1c20] mb-4">SUPPORTING DOCUMENT (OPTIONAL)</h3>
                                <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#c1c7d2] rounded-lg p-4 cursor-pointer hover:border-[#005597]">
                                    <Upload className="w-8 h-8 text-[#414751] mb-2" />
                                    <span className="text-sm text-[#414751]">Drop file here or browse</span>
                                    <span className="text-xs text-[#414751]">PDF, JPG, PNG — max 5MB</span>
                                    <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.png" />
                                </label>
                                {formData.file && <p className="text-xs text-green-600 mt-2">📎 {formData.file.name}</p>}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="space-y-4">
                            {/* Request Summary - No sticky */}
                            <div className="bg-white rounded-xl border border-[#c1c7d2] p-4">
                                <h3 className="font-semibold text-[#1a1c20] mb-3">Request Summary</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[#414751]">Leave Type:</span>
                                        <span className="font-medium text-[#1a1c20]">{selectedLeave?.label || "-"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#414751]">Start Date:</span>
                                        <span className="font-medium text-[#1a1c20]">{formData.startDate || "--"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#414751]">End Date:</span>
                                        <span className="font-medium text-[#1a1c20]">{formData.endDate || "--"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#414751]">Duration:</span>
                                        <span className="font-medium text-[#1a1c20]">-- days</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#414751]">Status after submit:</span>
                                        <span className="text-yellow-600 font-medium">pending</span>
                                    </div>
                                </div>
                                <div className="mt-3 p-2 bg-yellow-50 rounded-lg flex items-start gap-2">
                                    <Clock className="w-3 h-3 text-yellow-600 mt-0.5" />
                                    <p className="text-[10px] text-yellow-700">Your request will be sent to your manager for review.</p>
                                </div>
                                <button className="w-full mt-3 bg-[#005597] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#296eb4] transition">
                                    Submit Request
                                </button>
                            </div>

                            {/* Leave Policy  */}
                            <div className="bg-white rounded-xl border border-[#c1c7d2] p-4">
                                <h3 className="font-semibold text-[#1a1c20] mb-2 text-sm">Leave Policy</h3>
                                <ul className="space-y-1 text-[15px] text-[#414751]">
                                    <li>• Submit at least 3 days in advance for planned leave</li>
                                    <li>• Sick leave can be submitted on the day</li>
                                    <li>• Supporting docs required for sick leave {'>'} 2 days</li>
                                    <li>• Leave during blackout periods requires special approval</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}