"use client";

import { TopHero } from "@/components/TopHero";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import crypto from "crypto"
import Chatbot from "@/components/Chatbot";
import GenderPieChart from "@/components/GenderPieChart";
import AgeBarChart from "@/components/AgeBarChart";

type Person = {
  "Full Name": string;
  Phone?: string;
  NIN?: string;
  "Date of Birth"?: number;
  Sex?: string;
  LGA: string;
  Community: string;
  Village: string;
  Employee: string;
  "Employee Biometric ID"?: string;
  "NIMC Verified": boolean;
};

export default function AdminPage() {
  const [data, setData] = useState<Person[]>([]);
  const [lgaList, setLgaList] = useState<string[]>([]);
  const [selectedLga, setSelectedLga] = useState<string>("");

  const [visibleCount, setVisibleCount] = useState(20);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState<"registered" | "prospective">("registered");

  // ✅ Local login state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔑 Verification state
  const [isVerified, setIsVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [userInputCode, setUserInputCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Get filtered data based on active tab
  const getFilteredData = () => {
    if (activeTab === "registered") {
      return data; // All records
    } else {
      return data.filter(person => person["Employee Biometric ID"]); // Only records with biometric ID
    }
  };

  // Get counts for tabs
  const getTotalRegistered = () => data.length;
  const getTotalProspective = () => data.filter(person => person["Employee Biometric ID"]).length;

  // Gender statistics based on filtered data
  const getGenderStats = () => {
    const filteredData = getFilteredData();
    const stats = filteredData.reduce((acc, person) => {
      const gender = person.Sex || "Unknown";
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  };

  // Load data
  useEffect(() => {
    if (!isAuthenticated) return; // only load after login
    fetch("/data/Vigilante21.json")
      .then((res) => res.json())
      .then((json: Person[]) => {
        setData(json);
        const lgas = Array.from(new Set(json.map((item) => item.LGA)));
        setLgaList(lgas);
      });
  }, [isAuthenticated]);

  const tabFilteredData = getFilteredData();
  const filteredData = selectedLga
    ? tabFilteredData.filter((item) => item.LGA === selectedLga)
    : tabFilteredData;

  const visibleData = filteredData.slice(0, visibleCount);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 20);
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [filteredData]);

  // ---------- Mask Helpers ----------
  const maskPhone = (value?: string): string => {
    if (!value) return "—";
    if (value.length <= 5) return value;
    return value.slice(0, 5) + "*".repeat(value.length - 5);
  };

  const maskNIN = (value?: string): string => {
    if (!value) return "—";
    if (value.length <= 4) return value;
    return value.slice(0, 4) + "*".repeat(value.length - 4);
  };

  const maskBiometric = (value?: string): string => {
    if (!value) return "—";
    if (value.length <= 2) return value;
    return "*".repeat(value.length - 2) + value.slice(-2);
  };

  // ---------- Age calculation helper ----------
  const calculateAge = (dateOfBirth?: number): string => {
    if (!dateOfBirth) return "—";
    
    // The date appears to be Excel serial date (days since December 30, 1899)
    const excelEpoch = new Date(1899, 11, 30); // December 30, 1899
    const birthDate = new Date(excelEpoch.getTime() + (dateOfBirth * 24 * 60 * 60 * 1000));
    
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age.toString();
  };

  // ---------- Verification Handlers ----------
  const handleSendCode = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setVerificationSent(true);
        Swal.fire("Success", "Verification code sent to your email!", "success");
      } else {
        Swal.fire("Error", "Failed to send code: " + data.error, "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Error sending code.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: userInputCode }),
      });
      const data = await res.json();
      if (data.success) {
        setIsVerified(true);
        setShowAll(true);
        Swal.fire("Verified", "You have successfully unlocked details!", "success");
      } else {
        Swal.fire("Error", "Invalid code. Try again.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Verification failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Local login check ----------
  const handleLogin = () => {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    const adminSalt = process.env.NEXT_PUBLIC_ADMIN_SALT!;

    const hashedPassword = crypto.createHash('sha256').update(password + adminSalt).digest('hex');
    
    if (email === adminEmail && hashedPassword === adminPassword) {
      setIsAuthenticated(true);
    } else {
      console.log(adminPassword)
      Swal.fire("Error", "Invalid email or password", "error");
    }
  };

  // ---------------- Login UI ----------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/20">
          <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Side - Illustration (Desktop Only) */}
            <div className="hidden lg:block">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Imo State Ministry of Homeland Security
                </h1>
                <p className="text-green-100 text-lg">
                  Vigilante Management System
                </p>
              </div>
              
              {/* Security SVG Illustration */}
              <div className="flex justify-center">
                <svg 
                  className="w-80 h-80" 
                  viewBox="0 0 400 400" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Shield Background */}
                  <path 
                    d="M200 50L320 100V200C320 280 260 340 200 350C140 340 80 280 80 200V100L200 50Z" 
                    fill="url(#shieldGradient)"
                    stroke="#ffffff"
                    strokeWidth="3"
                  />
                  
                  {/* Inner Shield Design */}
                  <path 
                    d="M200 80L280 120V200C280 260 240 300 200 310C160 300 120 260 120 200V120L200 80Z" 
                    fill="rgba(255,255,255,0.1)"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  
                  {/* Security Badge */}
                  <circle cx="200" cy="180" r="40" fill="rgba(255,255,255,0.2)" stroke="#ffffff" strokeWidth="2"/>
                  <path d="M185 180L195 190L215 170" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  
                  {/* Stars */}
                  <g fill="#ffffff" opacity="0.6">
                    <circle cx="150" cy="140" r="2"/>
                    <circle cx="250" cy="140" r="2"/>
                    <circle cx="170" cy="220" r="2"/>
                    <circle cx="230" cy="220" r="2"/>
                  </g>
                  
                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(34, 197, 94, 0.3)"/>
                      <stop offset="100%" stopColor="rgba(16, 185, 129, 0.3)"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex justify-center">
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md">
                
                {/* Mobile Header */}
                <div className="lg:hidden text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Homeland Security
                  </h1>
                  <p className="text-gray-600">Admin Portal</p>
                </div>

                {/* Desktop Header */}
                <div className="hidden lg:block text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                  <p className="text-gray-600">Sign in to access the admin dashboard</p>
                </div>

                {/* Login Form */}
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                        </svg>
                      </div>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                        </svg>
                      </div>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Sign In to Dashboard
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center"> Powered by
                <a 
        href="http://imodigitalcity.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-green-600 mx-2 hover:underline"
      >
        Imo Digital City Limited
      </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- Page Content ----------------
  return (
    <>
      <TopHero ministryName="Vigilante Data Across Imo State" titleLabel="Admin" />
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Imo State Vigilante Records</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => {
                  setActiveTab("registered");
                  setVisibleCount(20);
                  setRevealed(new Set());
                  setShowAll(false);
                }}
                className={`py-2 px-0 text-start md:px-1 border-b-2 font-medium text-sm ${
                  activeTab === "registered"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Total Registered
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                  {getTotalRegistered()}
                </span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("prospective");
                  setVisibleCount(20);
                  setRevealed(new Set());
                  setShowAll(false);
                }}
                className={`py-2 px-0 text-start md:px-1 border-b-2 font-medium text-sm ${
                  activeTab === "prospective"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Total Prospective(Biometrics Captured)
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                  {getTotalProspective()}
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Charts Section */}
        {data.length > 0 && (
          <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gender Distribution Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Gender Distribution</h2>
              <div className="flex items-center justify-center">
                <GenderPieChart stats={getGenderStats()} />
              </div>
            </div>
            
            {/* Age Distribution Chart */}
            <AgeBarChart data={getFilteredData()} />
          </div>
        )}
        {/* LGA Dropdown */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Select Local Government:</label>
          <select
            value={selectedLga}
            onChange={(e) => {
              setSelectedLga(e.target.value);
              setVisibleCount(20);
              setRevealed(new Set());
              setShowAll(false);
            }}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          >
            <option value="">All LGAs</option>
            {lgaList.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </select>
        </div>

        {/* Verification UI */}
        {!isVerified ? (
          <div className="mb-4">
            {!verificationSent ? (
              <button
                onClick={handleSendCode}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {loading ? "Sending..." : "View Full Details"}
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={userInputCode}
                  onChange={(e) => setUserInputCode(e.target.value)}
                  className="border px-3 py-2 rounded-lg"
                />
                <button
                  onClick={handleVerify}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {loading ? "Verifying..." : "Verify"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-4 flex justify-end">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Hide All Details" : "View Full Details"}
            </button>
          </div>
        )}
        {/* Data Table */}
        <div className="overflow-x-auto">
           <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
             <thead>
               <tr className="bg-gray-100">
                 <th className="border px-4 py-2">Full Name</th>
                 <th className="border px-4 py-2">Age</th>
                 <th className="border px-4 py-2">Sex</th>
                 <th className="border px-4 py-2">Phone</th>
                 <th className="border px-4 py-2">NIN</th>
                 <th className="border px-4 py-2">Community</th>
                 <th className="border px-4 py-2">Village</th>
                 <th className="border px-4 py-2">Biometric ID</th>
                
              
               </tr>
             </thead>
             <tbody>
               {visibleData.map((person, index) => {
                const isRevealed = showAll || revealed.has(index);

                return (
                  <tr key={index} className="odd:bg-white even:bg-gray-50">
                    <td className="border px-4 py-2">{person["Full Name"]}</td>
                    <td className="border px-4 py-2">{calculateAge(person["Date of Birth"])}</td>
                    <td className="border px-4 py-2">{person.Sex || "—"}</td>
                    <td className="border px-4 py-2">
                      {isRevealed ? person.Phone || "—" : maskPhone(person.Phone)}
                    </td>
                    <td className="border px-4 py-2">
                      {isRevealed ? person.NIN || "—" : maskNIN(person.NIN)}
                    </td>
                    <td className="border px-4 py-2">{person.Community}</td>
                    <td className="border px-4 py-2">{person.Village}</td>
                    <td className="border px-4 py-2">
                      {isRevealed
                        ? person["Employee Biometric ID"] || "—"
                        : maskBiometric(person["Employee Biometric ID"])}
                    </td>
                  
                  
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
              {isVerified && <Chatbot/>}
        {/* Infinite loader */}
        {visibleCount < filteredData.length && (
          <div
            ref={loaderRef}
            className="text-center py-6 text-gray-500 animate-pulse"
          >
            Loading more...
          </div>
        )}
     
      </div>

    </>
  );
}
