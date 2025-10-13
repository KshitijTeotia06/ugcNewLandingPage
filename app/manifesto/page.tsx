"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function ManifestoPage() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = (window.scrollY / documentHeight) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-full min-h-screen relative bg-[#F7F5F3] overflow-x-hidden flex flex-col justify-start items-center">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[rgba(55,50,47,0.06)] z-50">
        <div
          className="h-full bg-[#37322F] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="relative flex flex-col justify-start items-center w-full">
        {/* Main container */}
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] relative flex flex-col justify-start items-start">
          {/* Left vertical line */}
          <div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

          {/* Right vertical line */}
          <div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

          {/* Navigation */}
          <div className="w-full h-12 sm:h-14 md:h-16 lg:h-[84px] flex justify-center items-center z-20 px-6 sm:px-8 md:px-12 lg:px-0 pt-[9px]">
            <div className="w-full h-0 absolute left-0 top-6 sm:top-7 md:top-8 lg:top-[42px] border-t border-[rgba(55,50,47,0.12)] shadow-[0px_1px_0px_white]"></div>

            <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[700px] lg:w-[700px] h-10 sm:h-11 md:h-12 py-1.5 sm:py-2 px-3 sm:px-4 md:px-4 pr-2 sm:pr-3 bg-[#F7F5F3] backdrop-blur-sm shadow-[0px_0px_0px_2px_white] overflow-hidden rounded-[50px] flex justify-between items-center relative z-30">
              <Link href="/" className="flex justify-center items-center hover:opacity-80 transition-opacity">
                <div className="flex flex-col justify-center text-[#2F3037] text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-5 font-sans">
                  CreatorScale
                </div>
              </Link>
              <Link href="/" className="h-6 sm:h-7 md:h-8 flex justify-start items-start gap-2 sm:gap-3">
                <div className="px-2 sm:px-3 md:px-[14px] py-1 sm:py-[6px] bg-white shadow-[0px_1px_2px_rgba(55,50,47,0.12)] overflow-hidden rounded-full flex justify-center items-center hover:shadow-[0px_2px_4px_rgba(55,50,47,0.16)] transition-shadow">
                  <div className="flex flex-col justify-center text-[#37322F] text-xs md:text-[13px] font-medium leading-5 font-sans">
                    Back to Home
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Hero Section */}
          <div className="w-full border-b border-[rgba(55,50,47,0.12)] py-8 sm:py-12 md:py-16 lg:py-20 flex flex-col justify-center items-center gap-6 md:gap-8 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-0 pointer-events-none opacity-20">
              <img
                src="/mask-group-pattern.svg"
                alt=""
                className="w-[1200px] sm:w-[1600px] md:w-[2000px] h-auto"
                style={{
                  filter: "hue-rotate(15deg) saturate(0.7) brightness(1.2)",
                }}
              />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 px-4 sm:px-6 md:px-8">
              <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)] shadow-xs">
                <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 1L8.5 5.5H13L9.5 8.5L11 13L7 10L3 13L4.5 8.5L1 5.5H5.5L7 1Z"
                      stroke="#37322F"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                </div>
                <div className="text-center flex justify-center flex-col text-[#37322F] text-xs font-medium leading-3 font-sans">
                  Our Manifesto
                </div>
              </div>

              <h1 className="text-center text-[#37322F] text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal leading-tight md:leading-[1.15] font-serif max-w-[900px]">
                Distribution, but automated?
              </h1>

              <p className="text-center text-[#605A57] text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-[700px]">
                So, distribution. When founders hear about our premise, they ask us: "Wait, so you can handle creators, outreach, negotiation, briefs, and payouts all with AI?" …our answer: hell yes.
              </p>
            </div>
          </div>

          {/* Manifesto Content */}
          <div className="w-full border-b border-[rgba(55,50,47,0.12)] flex justify-center items-start">
            <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
              <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={i}
                    className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 border-l border-r border-[rgba(55,50,47,0.12)] px-6 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-20 md:py-28">
              <div className="max-w-[1000px] mx-auto space-y-16 sm:space-y-20 md:space-y-24">
                {/* Opening Section */}
                <div className="space-y-8 pb-12 border-b border-[rgba(55,50,47,0.12)]">
                  <div className="space-y-6">
                    <p className="text-[#605A57] text-base sm:text-lg font-normal leading-relaxed">
                      But, we aren't just a sourcing spreadsheet with a chatbox or another small internal tool for distribution companies. We are working on something much bigger. Let's take a step back.
                    </p>
                    
                    <div className="space-y-4">
                      <h3 className="text-[#37322F] text-xl sm:text-2xl md:text-3xl font-semibold leading-tight font-sans">
                        Customer acquisition is getting crushed.
                      </h3>
                      <p className="text-[#605A57] text-base sm:text-lg font-normal leading-relaxed">
                        While CPMs for distribution channels are up, trust in most of these addresses are down because of the slop videos they circulate throughout social media. The only channel still compounding?
                      </p>
                      <p className="text-[#37322F] text-lg sm:text-xl font-semibold leading-relaxed">
                        People. Creators. The humans that have genuinely created content which we consume and resonate with on a daily basis.
                      </p>
                    </div>

                    <div className="bg-[rgba(55,50,47,0.04)] p-6 rounded-lg border border-[rgba(55,50,47,0.12)]">
                      <div className="flex flex-col items-center gap-4">
                        <img 
                          src="/creator-economy-market-size.png" 
                          alt="Creator Economy Market Size Chart" 
                          className="max-w-full h-auto rounded-lg shadow-sm"
                        />
                        <p className="text-[#37322F] text-sm font-medium italic text-center">
                          (The creator economy is already a 252+ Billion market with exponential growth year-over-year)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Problem Section */}
                <div className="space-y-6 pb-12 border-b border-[rgba(55,50,47,0.12)]">
                  <h3 className="text-[#37322F] text-xl sm:text-2xl md:text-3xl font-semibold leading-tight font-sans">
                    And yet, the creator discovery and fulfillment process is filled with red tape:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "googled lists",
                      "cold DMs", 
                      "ad-hoc briefs",
                      '"what\'s your rate?"',
                      "net-45 posts",
                      '"did they post?"',
                      '"how is the video performing?"',
                      "<10 leads"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#37322F] rounded-full flex-shrink-0"></div>
                        <span className="text-[#605A57] text-sm sm:text-base font-normal">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[#37322F] text-lg sm:text-xl font-semibold leading-relaxed">
                    We're done with that. So, we turned it into code, becoming the distribution layer for all consumer products.
                  </p>
                  <p className="text-[#605A57] text-base sm:text-lg font-normal leading-relaxed italic">
                    If you can instrument your product, you should be able to instrument your distribution. Be able to measure it, improve it, and–yeah–automate it.
                  </p>
                </div>

                {/* What We're Building */}
                <div className="space-y-8 pb-12 border-b border-[rgba(55,50,47,0.12)]">
                  <h3 className="text-[#37322F] text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight font-sans">
                    What we are building:
                  </h3>
                  <p className="text-[#37322F] text-lg sm:text-xl font-semibold leading-relaxed">
                    The first end-to-end distribution layer with swarms of AI agents:
                  </p>
                  
                  <div className="space-y-8">
                    <FeaturePoint
                      title="Discovery"
                      description="Agents that crawl the open web, private data points, and manually analyze thousands of videos for identifying UGC creators by fit, not followers. As a result, there is an exponential increase in the amount of audience overlap, content style, past performance, and price elasticity."
                    />
                    <FeaturePoint
                      title="Negotiation"
                      description="Autonomous agents run multi-threaded, guardrail negotiations that ensure consumer brands receive the lowest CPMs for clear terms, usage rights, deliverables, and exclusive contracts."
                    />
                    <FeaturePoint
                      title="Briefs"
                      description="Create dynamic briefs that are generated from brand messaging and channel fits. While creators get clarity about their goal, the brand gets consistency in their messaging and distribution presence."
                    />
                    <FeaturePoint
                      title="Pay"
                      description="Instant T+0 payouts with built-in tax and compliance. Escrow, rev-share, performance bonuses all calculated automatically. Zero drama."
                    />
                    <FeaturePoint
                      title="Track"
                      description="Access to every asset deployed for your brand. Identify your most promising creatives and promote them using paid ads, more creators, and organic content. No longer is content a mysterious blackbox, but rather an easy-to-use portal."
                    />
                    <FeaturePoint
                      title="Learn"
                      description="Each campaign trains the agentic swarm. Targeting for the swarm is tightened through custom data points received through larger amounts of campaigns run through the platform."
                    />
                  </div>
                </div>

                {/* Market We're Unlocking */}
                <div className="space-y-8 pb-12 border-b border-[rgba(55,50,47,0.12)]">
                  <h3 className="text-[#37322F] text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight font-sans">
                    The market we're unlocking
                  </h3>
                  <p className="text-[#605A57] text-base sm:text-lg font-normal leading-relaxed">
                    Creator scale isn't part of a typical tool category. It is a fundamental shift in infrastructure use. Eventually, we scale as a distribution layer as follows:
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-[rgba(55,50,47,0.12)] shadow-sm">
                      <h4 className="text-[#37322F] text-lg sm:text-xl font-semibold mb-3">For startups:</h4>
                      <p className="text-[#605A57] text-base font-normal leading-relaxed">
                        A go-to-market layer that ships new creative ideas into the world in minutes.
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-[rgba(55,50,47,0.12)] shadow-sm">
                      <h4 className="text-[#37322F] text-lg sm:text-xl font-semibold mb-3">For large-scale enterprises:</h4>
                      <p className="text-[#605A57] text-base font-normal leading-relaxed">
                        Thousands of compliant, on-brand UGC and creator partnerships that occur at once – all personalized and measurable.
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-[rgba(55,50,47,0.12)] shadow-sm">
                      <h4 className="text-[#37322F] text-lg sm:text-xl font-semibold mb-3">For creators:</h4>
                      <p className="text-[#605A57] text-base font-normal leading-relaxed">
                        A dependable platform that will ensure that they will be paid out accordingly and their channel aligns with the values presented by brands.
                      </p>
                    </div>
                  </div>
                </div>

                {/* The Cycle */}
                <div className="space-y-6 pb-12 border-b border-[rgba(55,50,47,0.12)]">
                  <h3 className="text-[#37322F] text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight font-sans">
                    The cycle
                  </h3>
                  <p className="text-[#605A57] text-base sm:text-lg font-normal leading-relaxed">
                    Unlike other platforms, every interaction is structured. Every outcome is labeled. Every brief and asset is versioned. The swarm gets smarter and smarter with each campaign and the sourcing becomes more effective. This flywheel of data and liquidity will make us the one-stop-shop. The more brands and creators we serve, the better the matches, and the faster the closes.
                  </p>
                </div>

                {/* Culture + Team */}
                <div className="space-y-6 pb-12 border-b border-[rgba(55,50,47,0.12)]">
                  <h3 className="text-[#37322F] text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight font-sans">
                    Culture + Team
                  </h3>
                  <div className="space-y-6">
                    <p className="text-[#605A57] text-base sm:text-lg font-normal leading-relaxed">
                      Our team combines our understanding of AI systems with data-driven marketing and automation. Kshitij deployed production-level AI agents at Amazon which actively synthesized large-scale competitor data from online sources to power product insights. Eshaan built AI-driven analytics tools at Graphene to measure and optimize digital marketing performance for startups. So, we know the space.
                    </p>
                    <p className="text-[#605A57] text-base sm:text-lg font-normal leading-relaxed">
                      Besides domain expertise, we ship fast and are driven. Both founders study at top institutions. UC Berkeley and UPenn. We have researched at the nation's top research labs such as MIT Critical Data Laboratory, MIT Lincoln Labs, and NASA's Machine Learning Labs. Not to mention, we have presented research at numerous conferences such as IEEE, MIT URTC, and state conferences.
                    </p>
                  </div>
                </div>

                {/* Built For The Future */}
                <div className="space-y-8 pt-12">
                  <h3 className="text-[#37322F] text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight font-sans">
                    Built For The Future
                  </h3>
                  <p className="text-[#605A57] text-base sm:text-lg font-normal leading-relaxed">
                    We're not just building software—we're building the infrastructure for the next generation of marketing. As creator economies grow and evolve, CreatorScale will be the platform that powers authentic brand connections at unprecedented scale. We hope to have you join us on our journey.
                  </p>
                  
                  <div className="pt-8 pb-6">
                    <p className="text-[#37322F] text-lg sm:text-xl font-medium text-right">
                      ~~ Kshitij and Eshaan from CreatorScale
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-8">
                    <Link
                      href="/"
                      className="h-11 sm:h-12 md:h-[52px] px-8 sm:px-10 md:px-12 relative bg-[#37322F] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] overflow-hidden rounded-full flex justify-center items-center cursor-pointer hover:bg-[#2A2520] transition-colors group"
                    >
                      <div className="w-32 sm:w-36 md:w-44 h-[41px] absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                      <div className="flex flex-col justify-center text-white text-sm sm:text-base md:text-[15px] font-medium leading-5 font-sans">
                        Book a demo
                      </div>
                    </Link>
                    <Link
                      href="/"
                      className="h-11 sm:h-12 md:h-[52px] px-8 sm:px-10 md:px-12 relative bg-white shadow-[0px_0px_0px_1px_rgba(55,50,47,0.12)] overflow-hidden rounded-full flex justify-center items-center cursor-pointer hover:shadow-[0px_0px_0px_1px_rgba(55,50,47,0.24)] transition-all"
                    >
                      <div className="flex flex-col justify-center text-[#37322F] text-sm sm:text-base md:text-[15px] font-medium leading-5 font-sans">
                        Learn more
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
              <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={i}
                    className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full py-12 sm:py-16 flex flex-col items-center gap-6 border-b border-[rgba(55,50,47,0.12)]">
            <div className="text-center text-[#605A57] text-sm font-normal leading-6 font-sans">
              © 2025 CreatorScale. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturePoint({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="bg-white p-6 rounded-lg border border-[rgba(55,50,47,0.12)] shadow-sm hover:shadow-md transition-shadow">
      <h4 className="text-[#37322F] text-lg sm:text-xl font-semibold mb-3">{title}:</h4>
      <p className="text-[#605A57] text-base font-normal leading-relaxed">
        {description}
      </p>
    </div>
  )
}

