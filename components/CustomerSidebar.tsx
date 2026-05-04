"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { removeCookie } from "@/lib/client-cookies";

const NAV_ITEMS = [
  {
    group: "My Account",
    items: [
      { href: "/customer/home", label: "Home", icon: "⌂", color: "#f97c6b" },
      { href: "/customer/services", label: "My Services", icon: "✦", color: "#fb9d3e" },
      { href: "/customer/bills", label: "Bills & Payment", icon: "◎", color: "#f9c846" },
    ],
  },
  {
    group: "Support",
    items: [
      { href: "/customer/tickets", label: "Help & Tickets", icon: "◇", color: "#6bbdf9" },
      { href: "/customer/settings", label: "Settings", icon: "⊙", color: "#a78bfa" },
    ],
  },
];

export default function CustomerSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const logout = () => {
    removeCookie("token");
    window.location.href = "/login";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=Nunito:wght@300;400;500;600&display=swap');

        .cust-sidebar {
          font-family: 'Nunito', sans-serif;
        }

        .cust-display {
          font-family: 'Lora', serif;
        }

        .cust-nav-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 16px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 400;
          color: #6b5e52;
          transition: all 0.2s ease;
          cursor: pointer;
          text-decoration: none;
        }

        .cust-nav-item:hover {
          background: rgba(255,255,255,0.55);
          color: #3d2f27;
          transform: translateX(2px);
        }

        .cust-nav-item.active {
          background: #fff;
          color: #2d1f18;
          font-weight: 600;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        }

        .cust-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .cust-nav-item:hover .cust-icon-wrap {
          transform: scale(1.1);
        }

        .cust-group-label {
          font-family: 'Nunito', sans-serif;
          font-size: 10.5px;
          letter-spacing: 0.14em;
          color: #c4a99a;
          padding: 8px 16px 4px;
          text-transform: uppercase;
          font-weight: 600;
          margin-top: 6px;
        }

        .cust-logout-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 11px 16px;
          background: none;
          border: none;
          font-family: 'Nunito', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #c4826a;
          cursor: pointer;
          border-radius: 14px;
          transition: all 0.2s ease;
          text-align: left;
        }

        .cust-logout-btn:hover {
          background: rgba(250, 100, 80, 0.08);
          color: #d9634a;
        }

        .cust-avatar-ring {
          background: linear-gradient(135deg, #f97c6b, #fb9d3e, #f9c846);
          padding: 2px;
          border-radius: 50%;
        }

        .cust-mobile-toggle {
          position: fixed;
          top: 14px;
          left: 14px;
          z-index: 60;
          background: #fff8f4;
          border: 1px solid #f0e0d8;
          color: #c4826a;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .cust-badge {
          background: #f97c6b;
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          border-radius: 20px;
          padding: 1px 6px;
          margin-left: auto;
          letter-spacing: 0.03em;
        }

        .cust-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      {/* MOBILE TOGGLE */}
      <button
        className="cust-mobile-toggle md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        {open ? "✕" : "≡"}
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(50,30,20,0.35)", zIndex: 40, backdropFilter: "blur(2px)" }}
          className="md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className="cust-sidebar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "248px",
          zIndex: 50,
          transition: "transform 0.28s cubic-bezier(.4,0,.2,1)",
          background: "#fdf6f0",
          borderRight: "1px solid #f0e3d8",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        data-mobile-hidden={!open}
      >
        <style>{`
          @media (max-width: 767px) {
            aside[data-mobile-hidden="true"] { transform: translateX(-100%); }
          }
        `}</style>

        {/* Decorative blobs */}
        <div className="cust-blob" style={{ width: 160, height: 160, background: "#fde4d8", top: -40, right: -40, opacity: 0.7 }} />
        <div className="cust-blob" style={{ width: 120, height: 120, background: "#fef3d0", bottom: 80, left: -30, opacity: 0.5 }} />

        {/* CONTENT */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%" }}>

          {/* HEADER */}
          <div style={{ padding: "28px 20px 20px" }}>
            <div className="cust-display" style={{ fontSize: "20px", fontWeight: 600, color: "#2d1f18", letterSpacing: "-0.01em", marginBottom: "2px" }}>
              My Portal
            </div>
            <div style={{ fontSize: "12px", color: "#c4a99a", letterSpacing: "0.01em" }}>
              Welcome back ✦
            </div>

            {/* User card */}
            <div style={{
              marginTop: "18px",
              background: "#fff",
              borderRadius: "16px",
              padding: "14px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 2px 12px rgba(180,120,100,0.08)",
              border: "1px solid #f0e3d8",
            }}>
              <div className="cust-avatar-ring">
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "#fff8f4",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px",
                }}>
                  ✿
                </div>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "13.5px", color: "#2d1f18", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Budi Santoso
                </div>
                <div style={{ fontSize: "11px", color: "#c4a99a" }}>
                  Premium Member
                </div>
              </div>
              <div style={{ marginLeft: "auto", flexShrink: 0 }}>
                <div style={{
                  background: "linear-gradient(135deg, #f97c6b, #fb9d3e)",
                  color: "#fff", fontSize: "10px", fontWeight: 700,
                  borderRadius: "20px", padding: "2px 8px",
                }}>
                  PRO
                </div>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #f0e3d8, transparent)", margin: "0 16px" }} />

          {/* NAV */}
          <nav style={{ flex: 1, padding: "12px 12px", overflowY: "auto" }}>
            {NAV_ITEMS.map((group) => (
              <div key={group.group}>
                <div className="cust-group-label">{group.group}</div>
                {group.items.map((item) => (
                  <CustomerNavItem key={item.href} {...item} />
                ))}
              </div>
            ))}
          </nav>

          {/* PROMO CARD */}
          <div style={{ margin: "0 12px 12px" }}>
            <div style={{
              background: "linear-gradient(135deg, #f97c6b 0%, #fb9d3e 100%)",
              borderRadius: "16px",
              padding: "16px",
              color: "#fff",
            }}>
              <div style={{ fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>Need Help?</div>
              <div style={{ fontSize: "11.5px", opacity: 0.85, marginBottom: "10px", lineHeight: 1.5 }}>
                Our support team is ready 24/7 for you.
              </div>
              <Link href="/customer/tickets" style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.25)",
                color: "#fff",
                fontSize: "11px",
                fontWeight: 600,
                borderRadius: "8px",
                padding: "5px 12px",
                textDecoration: "none",
                backdropFilter: "blur(4px)",
              }}>
                Contact Support →
              </Link>
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ padding: "10px 12px 20px", borderTop: "1px solid #f0e3d8" }}>
            <button className="cust-logout-btn" onClick={logout}>
              <span style={{
                width: "32px", height: "32px", borderRadius: "10px",
                background: "rgba(250,100,80,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", flexShrink: 0,
              }}>⏻</span>
              Log out
            </button>
          </div>

        </div>
      </aside>

      {/* MAIN */}
      <main style={{ marginLeft: "248px", minHeight: "100vh", background: "#fdf9f7" }}>
        <style>{`
          @media (max-width: 767px) {
            main { margin-left: 0 !important; padding-top: 72px; }
          }
        `}</style>
        {children}
      </main>
    </>
  );
}

function CustomerNavItem({ href, label, icon, color }: { href: string; label: string; icon: string; color: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href} className={`cust-nav-item${active ? " active" : ""}`}>
      <div
        className="cust-icon-wrap"
        style={{
          background: active ? `${color}20` : `${color}10`,
          color: color,
        }}
      >
        {icon}
      </div>
      {label}
    </Link>
  );
}
