import { useState } from "react";
import { 
    CalendarDays, LayoutDashboard, FileText, Bell, 
    LogOut, Settings as SettingsIcon, User, Calendar,
    Menu, X
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Settings() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [formData, setFormData] = useState({
        fullName: "Alex Thompson",
        jobTitle: "Senior Designer",
        email: "alex.thompson@company.com",
        employeeId: "EMP-0042"
    });
    const [notifications, setNotifications] = useState({
        email: true,
        approvals: true,
        reminders: true,
        policy: false,
        marketing: false
    });

    const tabs = [
        { id: "profile", label: "Profile" },
        { id: "security", label: "Security" },
        { id: "notifications", label: "Notifications" },
        { id: "appearance", label: "Appearance" },
        { id: "language", label: "Language & Region" },
    ];

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.includes('image/jpeg') && !file.type.includes('image/png')) {
                alert('Please upload a PNG or JPG file');
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB');
                return;
            }
            setProfilePhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = () => {
        setProfilePhoto(null);
        setPhotoPreview(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                        { icon: Bell, label: "Notifications", path: "/notifications" },
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
                        </Link>
                    ))}
                </nav>

                <div className="border-t border-white/10 p-5">
                    {/* User Profile Card */}
                    
                    {/* Settings link - right here above Sign Out */}
                    <Link to="/settings" className="flex items-center gap-3 text-white/70 hover:text-white text-sm mb-2">
                        <SettingsIcon className="w-4 h-4" />
                        <span>Settings</span>
                    </Link>
                    
                    <Link to="/login" className="flex items-center gap-3 text-white/70 hover:text-white text-sm">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </Link>
                     <div className="bg-white/10 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-5 h-5 text-[#005597]" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">{formData.fullName}</p>
                                <p className="text-xs text-white/70">{formData.jobTitle}</p>
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
                        <h2 className="text-lg font-semibold text-[#1a1c20]">Settings</h2>
                        <div className="hidden sm:flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#005597] rounded-full flex items-center justify-center overflow-hidden">
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-4 h-4 text-white" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="p-6 max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#1a1c20]">Account Settings</h1>
                        <p className="text-sm text-[#414751]">Manage your profile, notifications, and account preferences.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left Sidebar - Tabs */}
                        <div className="w-full md:w-64 flex shrink-0">
                            <div className="sticky top-24 space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition ${
                                            activeTab === tab.id
                                                ? "bg-[#d3e4ff] text-[#005597] font-medium"
                                                : "text-[#414751] hover:bg-[#ededf4]"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="flex-1">
                            {/* Profile Information */}
                            <div className="bg-white rounded-xl border border-[#c1c7d2] p-6 mb-6">
                                <h3 className="text-lg font-semibold text-[#1a1c20] mb-2">Profile Information</h3>
                                <p className="text-sm text-[#414751] mb-6">This is how others in the organization see you.</p>

                                {/* Photo Upload */}
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-20 h-20 bg-[#005597] rounded-full flex items-center justify-center overflow-hidden">
                                        {photoPreview ? (
                                            <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-10 h-10 text-white" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="file"
                                                id="photoUpload"
                                                accept="image/png,image/jpeg"
                                                onChange={handlePhotoUpload}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="photoUpload"
                                                className="px-3 py-1.5 bg-[#005597] text-white text-sm rounded-lg hover:bg-[#296eb4] transition cursor-pointer"
                                            >
                                                Upload photo
                                            </label>
                                            {photoPreview && (
                                                <button
                                                    onClick={removePhoto}
                                                    className="px-3 py-1.5 border border-[#c1c7d2] text-[#414751] text-sm rounded-lg hover:bg-gray-50 transition"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-xs text-[#414751]">PNG or JPG · Max 2 MB</p>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#414751] mb-1">FULL NAME</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="w-full border border-[#c1c7d2] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#005597]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#414751] mb-1">JOB TITLE</label>
                                        <input
                                            type="text"
                                            name="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleInputChange}
                                            className="w-full border border-[#c1c7d2] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#005597]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#414751] mb-1">EMAIL ADDRESS</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full border border-[#c1c7d2] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#005597]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#414751] mb-1">EMPLOYEE ID</label>
                                        <input
                                            type="text"
                                            name="employeeId"
                                            value={formData.employeeId}
                                            onChange={handleInputChange}
                                            className="w-full border border-[#c1c7d2] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#005597]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Notification Preferences */}
                            <div className="bg-white rounded-xl border border-[#c1c7d2] p-6 mb-6">
                                <h3 className="text-lg font-semibold text-[#1a1c20] mb-4">Notification Preferences</h3>
                                <p className="text-sm text-[#414751] mb-6">Choose what you want to be notified about.</p>

                                <div className="space-y-4">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notifications.email}
                                            onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                                            className="mt-0.5 w-4 h-4 rounded border-[#c1c7d2]"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-[#1a1c20]">Email notifications</p>
                                            <p className="text-xs text-[#414751]">Receive email updates on leave status changes</p>
                                        </div>
                                    </label>

                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notifications.approvals}
                                            onChange={(e) => setNotifications({...notifications, approvals: e.target.checked})}
                                            className="mt-0.5 w-4 h-4 rounded border-[#c1c7d2]"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-[#1a1c20]">Approval & rejection alerts</p>
                                            <p className="text-xs text-[#414751]">Notify when admin approves or rejects requests</p>
                                        </div>
                                    </label>

                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notifications.reminders}
                                            onChange={(e) => setNotifications({...notifications, reminders: e.target.checked})}
                                            className="mt-0.5 w-4 h-4 rounded border-[#c1c7d2]"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-[#1a1c20]">Upcoming leave reminders</p>
                                            <p className="text-xs text-[#414751]">Reminders 3 days before approved leave starts</p>
                                        </div>
                                    </label>

                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notifications.policy}
                                            onChange={(e) => setNotifications({...notifications, policy: e.target.checked})}
                                            className="mt-0.5 w-4 h-4 rounded border-[#c1c7d2]"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-[#1a1c20]">Policy update announcements</p>
                                            <p className="text-xs text-[#414751]">When HR updates leave policies</p>
                                        </div>
                                    </label>

                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notifications.marketing}
                                            onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
                                            className="mt-0.5 w-4 h-4 rounded border-[#c1c7d2]"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-[#1a1c20]">Marketing & product updates</p>
                                            <p className="text-xs text-[#414751]">News about LeaveApp features and improvements</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3">
                                <button 
                                    onClick={() => {
                                        setFormData({
                                            fullName: "Alex Thompson",
                                            jobTitle: "Senior Designer",
                                            email: "alex.thompson@company.com",
                                            employeeId: "EMP-0042"
                                        });
                                        setNotifications({
                                            email: true,
                                            approvals: true,
                                            reminders: true,
                                            policy: false,
                                            marketing: false
                                        });
                                        setPhotoPreview(null);
                                        setProfilePhoto(null);
                                    }}
                                    className="px-4 py-2 border border-[#c1c7d2] text-[#414751] rounded-lg hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => {
                                        console.log("Save changes:", { formData, notifications, profilePhoto });
                                        alert("Settings saved! (Backend integration coming soon)");
                                    }}
                                    className="px-4 py-2 bg-[#005597] text-white rounded-lg hover:bg-[#296eb4] transition"
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}