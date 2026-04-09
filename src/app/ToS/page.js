'use client'
import { useState } from "react";

const content = {
    en: {
        badge: process.env.networkname,
        title: "Guest Network - Terms of Use",
        subtitle: "By connecting, you agree to the following terms.",
        footer: "By staying connected, you acknowledge that you have read and agree to these terms.",
        sections: [
        {
            title: "1. Acceptable Use",
            body: (
            <p>
                You may use this network for general browsing, streaming, downloading, and personal
                project hosting (e.g. game servers, IoT devices, personal websites).
                <br /><br />
                Torrenting is permitted — however you <strong>must not</strong> download or distribute
                pirated, copyrighted, or otherwise illegal content. Excessive bandwidth usage is not allowed.
            </p>
            ),
        },
        {
            title: "2. Prohibited Activities",
            body: (
            <ul className="list-disc pl-5 space-y-1">
                <li>Hacking or unauthorized access to any device or system</li>
                <li>DoS or DDoS attacks of any kind</li>
                <li>Network abuse, flooding, or degrading performance for others</li>
                <li>Hosting illegal services: gambling platforms, botnets, phishing, malware</li>
                <li>Any activity violating local, national, or international law</li>
            </ul>
            ),
        },
        {
            title: "3. Hosting Policy",
            body: (
            <p>
                Personal project hosting is welcome — game servers, IoT backends, and personal websites
                are all fine. For reliable always-on infrastructure, consider{" "}
                <strong>PlatoonLabs SkyForce</strong>.
            </p>
            ),
        },
        {
            title: "4. Monitoring & Logging",
            body: (
            <p>
                All traffic is logged. An <strong>Intrusion Detection System (IDS)</strong> is active at
                all times. By using this network you consent to this monitoring. Logs may be reviewed in
                the event of a suspected violation or security incident.
            </p>
            ),
        },
        {
            title: "5. Service Availability",
            body: <p>This network is provided best-effort. Maintenance may cause downtime. No guaranteed uptime or SLA.</p>,
        },
        {
            title: "6. Enforcement",
            body: <p>Violations may result in immediate disconnection or a permanent ban. Serious violations may be escalated further.</p>,
        },
        ],
        logoutLabel: "To log out, visit",
        logoutAction: "and click",
        logoutBtn: "Logout",
    }
};

export default function ToSPage() {
    const [lang, setLang] = useState("en");
    const c = content[lang];

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10" >
            <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-2xl w-full shadow-sm z-10">

                <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
                <div>
                    <span className="inline-block text-xs font-medium tracking-widest uppercase text-gray-400 bg-gray-100 rounded px-2 py-0.5 mb-2">
                    {c.badge}
                    </span>
                    <h1 className="text-lg font-medium text-gray-900 leading-snug">{c.title}</h1>
                    <p className="text-sm text-gray-500 mt-0.5">{c.subtitle}</p>
                </div>

                <div className="flex border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    {["en"].map((l) => (
                    <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`px-3.5 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                        lang === l
                            ? "bg-gray-100 text-gray-900"
                            : "bg-white text-gray-400 hover:text-gray-600"
                        }`}
                    >
                        {l.toUpperCase()}
                    </button>
                    ))}
                </div>
                </div>

                <div className="space-y-5">
                {c.sections.map((s, i) => (
                    <div key={i}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
                        {s.title}
                    </p>
                    <div className="text-sm text-gray-700 leading-relaxed">{s.body}</div>
                    {i < c.sections.length - 1 && (
                        <hr className="mt-5 border-gray-100" />
                    )}
                    </div>
                ))}
                </div>

                <div className="mt-6 bg-gray-50 rounded-xl px-4 py-3 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">{c.logoutLabel}</span>
                <code className="text-sm font-mono bg-white border border-gray-200 rounded px-2 py-0.5 text-gray-800">
                    192.168.10.1:8000
                </code>
                <span className="text-sm text-gray-500">
                    {c.logoutAction} <strong className="text-gray-700">Logout</strong>
                </span>
                </div>

                <p className="text-xs text-gray-400 text-center mt-6 leading-relaxed">{c.footer}</p>
            </div>
        </div>
    );
}