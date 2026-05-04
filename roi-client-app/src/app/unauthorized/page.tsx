// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="auth-layout mx-auto">
      <div className="auth-card text-center">
        <h3 className="mb-3">Unauthorized</h3>
        <p className="mb-3">This account cannot access this client area.</p>
        <Link href="/login">Back to login</Link>
      </div>
    </main>
  );
}
