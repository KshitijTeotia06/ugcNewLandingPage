import Link from "next/link"

export default function ManifestoSection() {
  return (
    <div className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="self-stretch px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] py-8 sm:py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6">
        <div className="w-full max-w-[616px] lg:w-[616px] px-4 sm:px-6 py-4 sm:py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4 shadow-none">
          <Link href="/manifesto" className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)] shadow-xs hover:shadow-[0px_2px_4px_rgba(50,45,43,0.12)] transition-shadow cursor-pointer">
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
          </Link>
          <div className="w-full max-w-[598.06px] lg:w-[598.06px] text-center flex justify-center flex-col text-[#49423D] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            What does it take to transform marketing?
          </div>
          <div className="self-stretch text-center text-[#605A57] text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
            Our vision for transforming how brands
            <br />
            connect with creators, manage content creation, and distribute it at scale.
          </div>
        </div>
      </div>

      {/* Manifesto Content */}
      <div className="self-stretch flex justify-center items-start">
        <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
          {/* Left decorative pattern */}
          <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
              />
            ))}
          </div>
        </div>

        <div className="flex-1 border-l border-r border-[rgba(55,50,47,0.12)] px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20">
          <div className="max-w-[700px] mx-auto space-y-8 sm:space-y-10 md:space-y-12">
            {/* Manifesto Point 1 */}
            <div className="space-y-3">
              <h3 className="text-[#37322F] text-lg sm:text-xl md:text-2xl font-semibold leading-tight font-sans">
                UGC is Broken
              </h3>
              <p className="text-[#605A57] text-sm sm:text-base md:text-lg font-normal leading-relaxed font-sans">
                UGC or user-generated content is ineffective at the moment. Current solutions for brands pairs them with college students inexperienced with content creation techniques, leading to slop polluting our feeds.
              </p>
            </div>

            {/* Manifesto Point 2 */}
            <div className="space-y-3">
              <h3 className="text-[#37322F] text-lg sm:text-xl md:text-2xl font-semibold leading-tight font-sans">
                AI changes everything
              </h3>
              <p className="text-[#605A57] text-sm sm:text-base md:text-lg font-normal leading-relaxed font-sans">
                With AI, we can automate the entire creator lifecycle—from discovery to payment. Our technology
                understands your brand, finds the perfect creators, negotiates fair deals, and handles all the
                logistics. What used to take weeks now takes minutes.
              </p>
            </div>

            {/* Manifesto Point 3 */}
            <div className="space-y-3">
              <h3 className="text-[#37322F] text-lg sm:text-xl md:text-2xl font-semibold leading-tight font-sans">
                Scale without compromise
              </h3>
              <p className="text-[#605A57] text-sm sm:text-base md:text-lg font-normal leading-relaxed font-sans">
                CreatorScale empowers marketing teams to run hundreds of creator campaigns simultaneously without
                sacrificing quality or authenticity. Our platform ensures every partnership is strategic, every
                negotiation is fair, and every payment is on time.
              </p>
            </div>

            {/* Manifesto Point 4 */}
            <div className="space-y-3">
              <h3 className="text-[#37322F] text-lg sm:text-xl md:text-2xl font-semibold leading-tight font-sans">
                Built for the future
              </h3>
              <p className="text-[#605A57] text-sm sm:text-base md:text-lg font-normal leading-relaxed font-sans">
                We're not just building software—we're building the infrastructure for the next generation of marketing.
                As creator economies grow and evolve, CreatorScale will be the platform that powers authentic brand
                connections at unprecedented scale.
              </p>
            </div>

            {/* Call to Action */}
            <div className="pt-6 sm:pt-8 md:pt-10 flex justify-center">
              <Link href="/manifesto" className="h-10 sm:h-11 md:h-12 px-8 sm:px-10 md:px-12 py-2 sm:py-[6px] relative bg-[#37322F] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] overflow-hidden rounded-full flex justify-center items-center cursor-pointer hover:bg-[#2A2520] transition-colors">
                <div className="w-32 sm:w-36 md:w-44 h-[41px] absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                <div className="flex flex-col justify-center text-white text-sm sm:text-base md:text-[15px] font-medium leading-5 font-sans">
                  Read full manifesto
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
          {/* Right decorative pattern */}
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
    </div>
  )
}
