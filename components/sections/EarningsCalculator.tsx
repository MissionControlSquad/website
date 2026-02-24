"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight, Users } from "@/components/icons";
import { AFFILIATE } from "@/lib/constants";

const EarningsCalculator = () => {
  const [referrals, setReferrals] = useState(10);

  const monthlyEarnings = AFFILIATE.monthlyCommission * referrals;
  const yearlyEarnings = monthlyEarnings * 12;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferrals(Number.parseInt(e.target.value, 10));
  };

  return (
    <section id="earnings" className="py-20 px-4 bg-neutral-950">
      <Container>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
              Your Earning Potential
            </h2>
            <p className="text-lg text-neutral-400">
              With{" "}
              <span className="text-primary-400 font-semibold">
                ${AFFILIATE.monthlyCommission.toFixed(2)}
              </span>{" "}
              per referral per month, your earnings scale with every new customer you bring.
            </p>
          </ScrollReveal>

          {/* Slider Section */}
          <ScrollReveal staggerIndex={0} className="mb-12">
            <div className="p-6 md:p-8 rounded-2xl bg-neutral-800/50 border border-neutral-700">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <label
                    htmlFor="referrals-slider"
                    className="text-base font-semibold text-neutral-100"
                  >
                    Number of Referrals
                  </label>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-500/10 border border-primary-500/30">
                    <Users size={18} className="text-primary-400" />
                    <span className="text-xl font-bold text-primary-400">{referrals}</span>
                    <span className="text-neutral-400 text-sm">
                      {referrals === 1 ? "Referral" : "Referrals"}
                    </span>
                  </div>
                </div>
                <input
                  id="referrals-slider"
                  type="range"
                  min="1"
                  max="100"
                  value={referrals}
                  onChange={handleSliderChange}
                  className="earnings-slider w-full h-3 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(14, 165, 233) 0%, rgb(14, 165, 233) ${((referrals - 1) / 99) * 100}%, rgb(38, 38, 38) ${((referrals - 1) / 99) * 100}%, rgb(38, 38, 38) 100%)`,
                  }}
                />
                <div className="flex justify-between mt-2 text-xs text-neutral-500">
                  <span>1</span>
                  <span>100</span>
                </div>
              </div>

              {/* Earnings Display */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-700">
                  <div className="text-sm text-neutral-400 mb-2">Monthly Earnings</div>
                  <div className="text-2xl md:text-3xl font-bold text-neutral-100 mb-1">
                    ${monthlyEarnings.toFixed(2)}
                  </div>
                  <div className="text-xs text-neutral-500">per month</div>
                </div>
                <div className="p-5 rounded-xl bg-primary-500/10 border-2 border-primary-500">
                  <div className="text-sm text-primary-400 mb-2">Yearly Earnings</div>
                  <div className="text-2xl md:text-3xl font-bold text-primary-400 mb-1">
                    ${yearlyEarnings.toFixed(2)}
                  </div>
                  <div className="text-xs text-neutral-500">per year</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal
            staggerIndex={1}
            className="p-8 rounded-2xl bg-primary-500/10 border-2 border-primary-500"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-neutral-100 mb-2">
                  Ready to Start Earning?
                </h3>
                <p className="text-neutral-400">
                  Join thousands of affiliates earning passive income with AgentCenter.
                </p>
              </div>
              <a
                href={AFFILIATE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:scale-105 whitespace-nowrap"
              >
                Get Started Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
};

export default EarningsCalculator;
