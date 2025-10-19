"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'campaigns' | 'discover'>('campaigns')
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [campaignsLoading, setCampaignsLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        // Fetch user's campaigns
        fetchCampaigns(user.id)
      }
      setLoading(false)
    }
    getUser()
  }, [router, supabase])

  const fetchCampaigns = async (userId: string) => {
    setCampaignsLoading(true)
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setCampaigns(data || [])
    } catch (error) {
      console.error('Error fetching campaigns:', error)
    } finally {
      setCampaignsLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F7F5F3] flex items-center justify-center">
        <div className="text-[#37322F] text-lg font-medium">Loading...</div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen relative bg-[#F7F5F3] overflow-x-hidden flex flex-col justify-start items-center">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/20 via-pink-200/20 to-orange-200/20 rounded-full blur-3xl animate-floatSlow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/20 via-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-float animation-delay-400"></div>
      </div>

      <div className="relative flex flex-col justify-start items-center w-full z-10">
        {/* Main container */}
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] relative flex flex-col justify-start items-start min-h-screen">
          {/* Left vertical line */}
          <div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

          {/* Right vertical line */}
          <div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

          <div className="self-stretch pt-[9px] overflow-hidden flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 relative z-10">
            {/* Navigation */}
            <div className="w-full h-12 sm:h-14 md:h-16 lg:h-[84px] flex justify-center items-center z-20 px-6 sm:px-8 md:px-12 lg:px-0">
              <div className="w-full h-0 border-t border-[rgba(55,50,47,0.12)] shadow-[0px_1px_0px_white]"></div>

              <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[700px] lg:w-[700px] h-10 sm:h-11 md:h-12 py-1.5 sm:py-2 px-3 sm:px-4 md:px-4 pr-2 sm:pr-3 bg-[#F7F5F3] backdrop-blur-sm shadow-[0px_0px_0px_2px_white] overflow-hidden rounded-[50px] flex justify-between items-center absolute left-1/2 transform -translate-x-1/2 z-30">
                <div className="flex justify-center items-center">
                  <Link href="/" className="flex justify-start items-center hover:opacity-80 transition-opacity">
                    <div className="flex flex-col justify-center text-[#2F3037] text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-5 font-sans">
                      CreatorScale
                    </div>
                  </Link>
                </div>
                <div className="h-6 sm:h-7 md:h-8 flex justify-start items-start gap-2 sm:gap-3">
                  <button
                    onClick={handleSignOut}
                    className="px-2 sm:px-3 md:px-[14px] py-1 sm:py-[6px] bg-white shadow-[0px_1px_2px_rgba(55,50,47,0.12)] overflow-hidden rounded-full flex justify-center items-center hover:shadow-[0px_2px_4px_rgba(55,50,47,0.16)] hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex flex-col justify-center text-[#37322F] text-xs md:text-[13px] font-medium leading-5 font-sans">
                      Sign out
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full px-0 sm:px-4 md:px-8 lg:px-0 pt-8 pb-12">
              {/* Welcome Section */}
              <div className="w-full flex flex-col items-center gap-6 mb-10">
                <div className="w-full max-w-[800px] text-center">
                  <h1 className="text-[#37322F] text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] font-normal leading-tight font-serif">
                    Welcome back
                  </h1>
                  <p className="text-[rgba(55,50,47,0.80)] text-base sm:text-lg md:text-xl leading-7 font-sans font-medium mt-4">
                    {user?.email}
                  </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setActiveTab('campaigns')}
                    className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                      activeTab === 'campaigns'
                        ? 'bg-[#37322F] text-white shadow-[0px_1px_2px_rgba(55,50,47,0.12)]'
                        : 'bg-white text-[#37322F] shadow-[0px_1px_2px_rgba(55,50,47,0.12)] hover:shadow-[0px_2px_4px_rgba(55,50,47,0.16)]'
                    }`}
                  >
                    Campaigns
                  </button>
                  <button
                    onClick={() => setActiveTab('discover')}
                    className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                      activeTab === 'discover'
                        ? 'bg-[#37322F] text-white shadow-[0px_1px_2px_rgba(55,50,47,0.12)]'
                        : 'bg-white text-[#37322F] shadow-[0px_1px_2px_rgba(55,50,47,0.12)] hover:shadow-[0px_2px_4px_rgba(55,50,47,0.16)]'
                    }`}
                  >
                    Discover
                  </button>
                </div>
              </div>

              {/* Campaigns Tab */}
              {activeTab === 'campaigns' && (
                <div className="w-full space-y-8 animate-fadeIn">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatCard
                      title="Active Campaigns"
                      value={campaigns.length.toString()}
                      description="Total campaigns"
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      }
                    />
                    <StatCard
                      title="Total Creators"
                      value="0"
                      description="Collaborating creators"
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      }
                    />
                    <StatCard
                      title="Total Reach"
                      value="0"
                      description="Combined followers"
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      }
                    />
                  </div>

                  {/* Campaign Management Section */}
                  <div className="bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB] rounded-[12px] overflow-hidden">
                    <div className="border-b border-[#E0DEDB] px-6 py-5">
                      <h2 className="text-[#37322F] text-xl font-semibold font-sans">Campaign Management</h2>
                      <p className="text-[#605A57] text-sm mt-1">Track and manage your creative campaigns</p>
                    </div>
                    <div className="p-8">
                      {campaignsLoading ? (
                        <div className="text-center">
                          <div className="text-[#605A57] text-sm">Loading campaigns...</div>
                        </div>
                      ) : campaigns.length === 0 ? (
                        <div className="text-center">
                          <div className="max-w-md mx-auto space-y-4">
                            <div className="w-16 h-16 bg-[#F7F5F3] rounded-full flex items-center justify-center mx-auto">
                              <svg className="w-8 h-8 text-[#37322F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                            </div>
                            <h3 className="text-[#37322F] text-lg font-semibold">No campaigns yet</h3>
                            <p className="text-[#605A57] text-sm">Create your first campaign to start tracking creator performance and analyzing results.</p>
                            <Link href="/dashboard/campaigns/new" className="mt-4 px-6 py-2.5 bg-[#37322F] text-white rounded-full text-sm font-medium shadow-[0px_1px_2px_rgba(55,50,47,0.12)] hover:bg-[#2A2520] hover:scale-105 transition-all duration-300 inline-block">
                              Create Campaign
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {campaigns.map((campaign) => (
                            <CampaignCard key={campaign.id} campaign={campaign} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Creator Performance */}
                  <div className="bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB] rounded-[12px] overflow-hidden">
                    <div className="border-b border-[#E0DEDB] px-6 py-5">
                      <h2 className="text-[#37322F] text-xl font-semibold font-sans">Creator Performance</h2>
                      <p className="text-[#605A57] text-sm mt-1">Analyze how your creators are performing</p>
                    </div>
                    <div className="p-8 text-center">
                      <div className="max-w-md mx-auto space-y-4">
                        <div className="w-16 h-16 bg-[#F7F5F3] rounded-full flex items-center justify-center mx-auto">
                          <svg className="w-8 h-8 text-[#37322F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-[#37322F] text-lg font-semibold">No performance data</h3>
                        <p className="text-[#605A57] text-sm">Start working with creators to see detailed performance analytics and insights.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Discover Tab */}
              {activeTab === 'discover' && (
                <div className="w-full space-y-8 animate-fadeIn">
                  {/* Launch New Campaign */}
                  <div className="bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB] rounded-[12px] overflow-hidden">
                    <div className="border-b border-[#E0DEDB] px-6 py-5">
                      <h2 className="text-[#37322F] text-xl font-semibold font-sans">Launch New Campaign</h2>
                      <p className="text-[#605A57] text-sm mt-1">Start a new creator campaign or project</p>
                    </div>
                    <div className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ActionCard
                          title="Quick Campaign"
                          description="Launch a campaign with AI-recommended creators"
                          icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          }
                        />
                        <ActionCard
                          title="Custom Campaign"
                          description="Build a campaign from scratch with full control"
                          icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Find Creators */}
                  <div className="bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB] rounded-[12px] overflow-hidden">
                    <div className="border-b border-[#E0DEDB] px-6 py-5">
                      <h2 className="text-[#37322F] text-xl font-semibold font-sans">Find Creators</h2>
                      <p className="text-[#605A57] text-sm mt-1">Discover and connect with the perfect creators for your brand</p>
                    </div>
                    <div className="p-8">
                      <div className="space-y-4">
                        {/* Search Bar */}
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search creators by niche, platform, or keywords..."
                            className="w-full px-4 py-3 pr-12 bg-[#F7F5F3] border border-[#E0DEDB] rounded-full text-[#37322F] placeholder-[#605A57]/50 focus:outline-none focus:ring-2 focus:ring-[#37322F]/20"
                          />
                          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#37322F] text-white rounded-full hover:bg-[#2A2520] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </button>
                        </div>

                        {/* Filter Tags */}
                        <div className="flex flex-wrap gap-2">
                          {['All Platforms', 'Instagram', 'TikTok', 'YouTube', 'Twitter'].map((platform) => (
                            <button
                              key={platform}
                              className="px-4 py-1.5 bg-white border border-[#E0DEDB] rounded-full text-sm text-[#37322F] hover:bg-[#F7F5F3] hover:border-[#37322F] transition-all duration-300"
                            >
                              {platform}
                            </button>
                          ))}
                        </div>

                        {/* Empty State */}
                        <div className="pt-8 pb-4 text-center">
                          <div className="max-w-md mx-auto space-y-4">
                            <div className="w-16 h-16 bg-[#F7F5F3] rounded-full flex items-center justify-center mx-auto">
                              <svg className="w-8 h-8 text-[#37322F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                            <h3 className="text-[#37322F] text-lg font-semibold">Start discovering creators</h3>
                            <p className="text-[#605A57] text-sm">Use the search bar above to find creators that match your brand and campaign goals.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ title, value, description, icon }: { title: string; value: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB] rounded-[12px] px-6 py-5 hover:shadow-[0px_2px_8px_rgba(55,50,47,0.08)] transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-[#F7F5F3] rounded-full flex items-center justify-center text-[#37322F]">
          {icon}
        </div>
        <div className="text-[#605A57] text-sm font-medium">{title}</div>
      </div>
      <div className="text-[#37322F] text-3xl font-semibold mb-1">{value}</div>
      <div className="text-[#605A57] text-xs">{description}</div>
    </div>
  )
}

// Campaign Card Component
function CampaignCard({ campaign }: { campaign: any }) {
  const getPlatformIcon = (platform: string) => {
    const icons: { [key: string]: string } = {
      tiktok: '📱',
      instagram: '📸',
      youtube: '▶️',
      twitter: '🐦',
      linkedin: '💼',
      facebook: '👥',
    }
    return icons[platform] || '📱'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-[#F7F5F3] border border-[#E0DEDB] rounded-[12px] p-6 hover:bg-white hover:shadow-[0px_2px_8px_rgba(55,50,47,0.08)] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#37322F]">
            <span className="text-lg">{getPlatformIcon(campaign.platform)}</span>
          </div>
          <div>
            <h3 className="text-[#37322F] text-lg font-semibold">{campaign.name}</h3>
            <p className="text-[#605A57] text-sm capitalize">{campaign.platform}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[#37322F] text-lg font-semibold">${campaign.estimated_pay}</div>
          <div className="text-[#605A57] text-xs">per creator</div>
        </div>
      </div>
      
      <p className="text-[#605A57] text-sm mb-4 line-clamp-2">{campaign.description}</p>
      
      <div className="flex items-center justify-between text-xs text-[#605A57]">
        <div className="flex items-center gap-4">
          <span>Duration: {campaign.duration_days} days</span>
          {campaign.view_count_m && (
            <span>Max views: {campaign.view_count_m.toLocaleString()}</span>
          )}
        </div>
        <span>Created {formatDate(campaign.created_at)}</span>
      </div>
    </div>
  )
}

// Action Card Component
function ActionCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <Link href="/dashboard/campaigns/new" className="w-full bg-[#F7F5F3] border border-[#E0DEDB] rounded-[12px] p-6 text-left hover:bg-white hover:shadow-[0px_2px_8px_rgba(55,50,47,0.08)] transition-all duration-300 group block">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#37322F] mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-[#37322F] text-lg font-semibold mb-2">{title}</h3>
      <p className="text-[#605A57] text-sm">{description}</p>
    </Link>
  )
}
