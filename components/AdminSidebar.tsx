"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { removeCookie } from "@/lib/client-cookies";

const NAV_ITEMS = [
  {
    group: "Overview",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: "▦" },
      { href: "/admin/services", label: "Services", icon: "◈" },
    ],
  },
  {
    group: "Management",
    items: [
      { href: "/admin/customer", label: "Customer", icon: "◉" },
      { href: "/admin/bills", label: "Bills", icon: "◧" },
      { href: "/admin/settings", label: "Settings", icon: "◌" },
    ],
  },
];

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const logout = () => {
    removeCookie("token");
    window.location.href = "/admin/login";
  };

  return (
    <>
      <style>{`
        .sidebar {
          backdrop-filter: blur(18px);
          background: rgba(255, 255, 255, 0.7);
          border-right: 1px solid rgba(255, 140, 0, 0.2);
          box-shadow: 0 8px 30px rgba(255, 140, 0, 0.1);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 14px;
          color: #555;
          transition: all 0.2s ease;
        }

        .nav-item:hover {
          background: rgba(255, 140, 0, 0.15);
          color: #ff7a00;
        }

        .nav-item.active {
          background: linear-gradient(135deg, #ff9a00, #ff6a00);
          color: white;
          box-shadow: 0 4px 12px rgba(255, 120, 0, 0.3);
        }

        .group-label {
          font-size: 10px;
          color: #999;
          padding: 10px 14px 4px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .logout {
          margin-top: 10px;
          padding: 10px;
          border-radius: 10px;
          background: rgba(255, 80, 50, 0.1);
          color: #ff5a3d;
          text-align: center;
          cursor: pointer;
          transition: 0.2s;
        }

        .logout:hover {
          background: rgba(255, 80, 50, 0.2);
        }
      `}</style>

      {/* MOBILE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white/70 backdrop-blur text-orange-500 px-3 py-2 rounded-lg shadow"
      >
        {open ? "✕" : "☰"}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`sidebar fixed top-0 left-0 h-full w-60 z-40 p-4 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-orange-500 font-bold text-lg">☀ ADMIN</h1>
          <p className="text-xs text-orange-400">Dashboard Panel</p>
        </div>

        {/* NAV */}
        {NAV_ITEMS.map((group) => (
          <div key={group.group}>
            <div className="group-label">{group.group}</div>
            {group.items.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
        ))}

        {/* FOOTER */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/60 backdrop-blur p-3 rounded-xl mb-3 text-sm shadow">
            <p className="font-medium text-gray-700">Administrator</p>
            <p className="text-xs text-orange-400">Superuser</p>
          </div>

          <div className="logout" onClick={logout}>
            Logout
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="md:ml-60 bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen p-4">
        {children}
      </main>
    </>
  );
}

function NavItem({ href, label, icon }: { href: string; label: string; icon: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href} className={`nav-item ${active ? "active" : ""}`}>
      <span>{icon}</span>
      {label}
    </Link>
  );
}