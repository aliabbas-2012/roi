// @ts-nocheck
"use client";

import React from "react";
import { faChartPie, faGift, faHandHoldingDollar, faTrophy, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { RoleBottomNav } from "roi-shared";

const items = [
  { to: "/dashboard", label: "Home", icon: faChartPie },
  { to: "/referrals", label: "Team", icon: faUserGroup },
  { to: "/investments", label: "Invest", icon: faHandHoldingDollar },
  { to: "/plans", label: "Rank", icon: faTrophy },
  { to: "/withdraw", label: "Claim", icon: faGift },
];

const ClientBottomNav = () => <RoleBottomNav items={items} />;

export default ClientBottomNav;
