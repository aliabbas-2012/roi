// @ts-nocheck
"use client";

import React from "react";
import { Card } from "roi-shared";

type PlaceholderPageProps = {
  title: string;
  subtitle?: string;
};

const PlaceholderPage = ({ title, subtitle }: PlaceholderPageProps) => {
  return (
    <Card>
      <h3>{title}</h3>
      <p className="mb-0 text-muted">{subtitle || "Phase 1 placeholder page."}</p>
    </Card>
  );
};

export default PlaceholderPage;
