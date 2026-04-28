"use client";

import React from "react";
import { Card } from "roi-shared";

const PlaceholderPage = ({ title, subtitle }) => {
  return (
    <Card>
      <h3>{title}</h3>
      <p className="mb-0 text-muted">{subtitle || "Phase 1 placeholder page."}</p>
    </Card>
  );
};

export default PlaceholderPage;
