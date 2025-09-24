"use client";

import { TopHero } from "@/components/TopHero";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

type Person = {
  "Full Name": string;
  Phone?: string;
  NIN?: string;
  LGA: string;
  Community: string;
  Village: string;
  Employee: string;
  "Employee Biometric ID"?: string;
  "NIMC Verified": boolean;
};

export default function HomePage() {
  const [data, setData] = useState<Person[]>([]);
  const [lgaList, setLgaList] = useState<string[]>([]);
  const [selectedLga, setSelectedLga] = useState<string>("");

  const [visibleCount, setVisibleCount] = useState(20);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  // 🔑 Verification state
  const [isVerified, setIsVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [userInputCode, setUserInputCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [email] = useState("donnaogbu@gmail.com");

  useEffect(() => {
    fetch("/data/Ez.json")
      .then((res) => res.json())
      .then((json: Person[]) => {
        setData(json);
        const lgas = Array.from(new Set(json.map((item) => item.LGA)));
        setLgaList(lgas);
      });
  }, []);

  const filteredData = selectedLga
    ? data.filter((item) => item.LGA === selectedLga)
    : data;

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

  return (
    <>
   <TopHero ministryName="Vigilante Data Across Imo State" titleLabel="Admin" />
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Imo State Vigilante Records</h1>

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
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">NIN</th>
              <th className="border px-4 py-2">Community</th>
              <th className="border px-4 py-2">Village</th>
              <th className="border px-4 py-2">Biometric ID</th>
              <th className="border px-4 py-2">Verified</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((person, index) => {
              const isRevealed = showAll || revealed.has(index);

              return (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border px-4 py-2">{person["Full Name"]}</td>
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
                  <td className="border px-4 py-2 text-center">
                    {person["NIMC Verified"] ? "✅" : "❌"}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {!showAll && (
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => {
                          const newSet = new Set(revealed);
                          if (isRevealed) {
                            newSet.delete(index);
                          } else {
                            newSet.add(index);
                          }
                          setRevealed(newSet);
                        }}
                      >
                        {isRevealed ? "Hide" : "View"}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
