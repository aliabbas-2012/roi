// @ts-nocheck
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDollar, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { fetchDashboardSummaryAction, selectDashboardSummary, useAppDispatch, useAppSelector } from "roi-shared";

const DashboardContent = () => {
  const dispatch = useAppDispatch();
  const summary = useAppSelector(selectDashboardSummary);

  useEffect(() => {
    dispatch(fetchDashboardSummaryAction());
  }, [dispatch]);

  const cards = summary.cards || [];

  return (
    <div className="row g-3">
      <div className="col-12">
        <div className="neon-widget gradient-card h-100">
          <p>{summary.totalLabel || "Total Balance"}</p>
          <h6 className="neon-stat">{summary.totalValue || "$0"}</h6>
          <small>{summary.totalDelta || "+0.0% from last week"}</small>
        </div>
      </div>

      <div className="col-12">
        <div className="row g-3">
          <div className="col-12 col-sm-6">
            <Link href="/plans" className="mini-action deposit h-100">
              <FontAwesomeIcon icon={faHandHoldingDollar} /> Deposit
            </Link>
          </div>
          <div className="col-12 col-sm-6">
            <Link href="/withdraw" className="mini-action withdraw h-100">
              <FontAwesomeIcon icon={faMoneyBillTransfer} /> Withdraw
            </Link>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-lg-4">
        <div className="neon-widget h-100">
          <p>{cards[0]?.label || "Today Profit"}</p>
          <h6>{cards[0]?.value || "$0"}</h6>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-lg-4">
        <div className="neon-widget h-100">
          <p>{cards[1]?.label || "Yesterday Profit"}</p>
          <h6>{cards[1]?.value || "$0"}</h6>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-lg-4">
        <div className="neon-widget h-100">
          <p>{cards[2]?.label || "This Week Profit"}</p>
          <h6>{cards[2]?.value || "$0"}</h6>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
