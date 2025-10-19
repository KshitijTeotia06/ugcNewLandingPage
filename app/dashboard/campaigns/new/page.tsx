"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function NewCampaignPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    payoutAmount: '',
    viewCountMax: '',
    platforms: [] as string[],
  })

  const platforms = [
    { id: 'tiktok', name: 'TikTok', icon: '📱' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'youtube', name: 'YouTube', icon: '▶️' },
    { id: 'twitter', name: 'Twitter', icon: '🐦' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'facebook', name: 'Facebook', icon: '👥' },
  ]

  const handlePlatformToggle = (platformId: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate form data
      if (!formData.name.trim()) {
        throw new Error('Campaign name is required')
      }
      if (!formData.description.trim()) {
        throw new Error('Campaign description is required')
      }
      if (!formData.duration || parseInt(formData.duration) <= 0) {
        throw new Error('Duration must be a positive number')
      }
      if (!formData.payoutAmount || parseFloat(formData.payoutAmount) <= 0) {
        throw new Error('Payout amount must be a positive number')
      }
      if (formData.platforms.length === 0) {
        throw new Error('Please select at least one platform')
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('You must be logged in to create a campaign')
      }

      // Create campaigns for each selected platform
      const campaigns = formData.platforms.map(platform => {
        const campaign: any = {
          owner_id: user.id,
          name: formData.name.trim(),
          description: formData.description.trim(),
          duration_days: parseInt(formData.duration),
          estimated_payout: parseFloat(formData.payoutAmount),
          platform: platform,
        }

        // Only add view_count_m if it's provided and not empty
        if (formData.viewCountMax && formData.viewCountMax.trim() !== '') {
          const viewCount = parseInt(formData.viewCountMax)
          if (!isNaN(viewCount) && viewCount > 0) {
            campaign.view_count_max = viewCount
          }
        }

        return campaign
      })

      // Insert campaigns into database
      console.log('Inserting campaigns:', campaigns)
      
      const { data, error } = await supabase
        .from('campaigns')
        .insert(campaigns)
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Campaigns created successfully:', data)

      // Success - redirect to dashboard
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message || 'Failed to create campaign')
    } finally {
      setLoading(false)
    }
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
                  <Link href="/dashboard" className="flex justify-start items-center hover:opacity-80 transition-opacity">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#37322F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <div className="flex flex-col justify-center text-[#2F3037] text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-5 font-sans">
                        Back to Dashboard
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full px-0 sm:px-4 md:px-8 lg:px-0 pt-8 pb-12">
              {/* Header */}
              <div className="w-full flex flex-col items-center gap-4 mb-10">
                <div className="w-full max-w-[800px] text-center">
                  <h1 className="text-[#37322F] text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] font-normal leading-tight font-serif">
                    Create Campaign
                  </h1>
                  <p className="text-[rgba(55,50,47,0.80)] text-base sm:text-lg md:text-xl leading-7 font-sans font-medium mt-4">
                    Launch a new creator campaign and start reaching your audience
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="w-full max-w-[800px] mx-auto mb-6">
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full max-w-[800px] mx-auto space-y-6">
                {/* Campaign Name */}
                <div className="bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB] rounded-[12px] overflow-hidden">
                  <div className="border-b border-[#E0DEDB] px-6 py-4">
                    <label htmlFor="name" className="text-[#37322F] text-lg font-semibold font-sans">
                      Campaign Name
                    </label>
                    <p className="text-[#605A57] text-sm mt-1">Give your campaign a memorable name</p>
                  </div>
                  <div className="p-6">
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Summer Product Launch 2024"
                      className="w-full px-4 py-3 bg-[#F7F5F3] border border-[#E0DEDB] rounded-[8px] text-[#37322F] placeholder-[#605A57]/50 focus:outline-none focus:ring-2 focus:ring-[#37322F]/20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Campaign Description */}
                <div className="bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB] rounded-[12px] overflow-hidden">
                  <div className="border-b border-[#E0DEDB] px-6 py-4">
                    <label htmlFor="description" className="text-[#37322F] text-lg font-semibold font-sans">
                      Campaign Description
                    </label>
                    <p className="text-[#605A57] text-sm mt-1">Describe your target audience and campaign goals</p>
                  </div>
                  <div className="p-6">
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="e.g., Targeting tech-savvy millennials interested in sustainable fashion..."
                      rows={5}
                      className="w-full px-4 py-3 bg-[#F7F5F3] border border-[#E0DEDB] rounded-[8px] text-[#37322F] placeholder-[#605A57]/50 focus:outline-none focus:ring-2 focus:ring-[#37322F]/20 transition-all resize-none"
                      required
                    />
                  </div>
                </div>

                {/* Duration and Payout - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Duration */}
                  <div className="bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB] rounded-[12px] overflow-hidden">
                    <div className="border-b border-[#E0DEDB] px-6 py-4">
                      <label htmlFor="duration" className="text-[#37322F] text-lg font-semibold font-sans">
                        Duration
                      </label>
                      <p className="text-[#605A57] text-sm mt-1">Campaign length in days</p>
                    </div>
                    <div className="p-6">
                      <input
                        type="number"
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="30"
                        min="1"
                        className="w-full px-4 py-3 bg-[#F7F5F3] border border-[#E0DEDB] rounded-[8px] text-[#37322F] placeholder-[#605A57]/50 focus:outline-none focus:ring-2 focus:ring-[#37322F]/20 transition-all"
                        required
                      />
                      <p className="text-[#605A57] text-xs mt-2">Number of days this campaign will run</p>
                    </div>
                  </div>

                  {/* Estimated Payout */}
                  <div className="bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB] rounded-[12px] overflow-hidden">
                    <div className="border-b border-[#E0DEDB] px-6 py-4">
                      <label htmlFor="payout" className="text-[#37322F] text-lg font-semibold font-sans">
                        Estimated Payout
                      </label>
                      <p className="text-[#605A57] text-sm mt-1">Per creator amount</p>
                    </div>
                    <div className="p-6">
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#605A57] text-lg font-medium">$</span>
                        <input
                          type="number"
                          id="payout"
                          value={formData.payoutAmount}
                          onChange={(e) => setFormData({ ...formData, payoutAmount: e.target.value })}
                          placeholder="500"
                          min="0"
                          step="0.01"
                          className="w-full pl-8 pr-4 py-3 bg-[#F7F5F3] border border-[#E0DEDB] rounded-[8px] text-[#37322F] placeholder-[#605A57]/50 focus:outline-none focus:ring-2 focus:ring-[#37322F]/20 transition-all"
                          required
                        />
                      </div>
                      <p className="text-[#605A57] text-xs mt-2">Average payout per creator</p>
                    </div>
                  </div>
                </div>

                {/* View Count Max (Optional) */}
                <div className="bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB] rounded-[12px] overflow-hidden">
                  <div className="border-b border-[#E0DEDB] px-6 py-4">
                    <label htmlFor="viewCount" className="text-[#37322F] text-lg font-semibold font-sans flex items-center gap-2">
                      View Count Maximum
                      <span className="px-2 py-0.5 bg-[#F7F5F3] text-[#605A57] text-xs rounded-full">Optional</span>
                    </label>
                    <p className="text-[#605A57] text-sm mt-1">Maximum total views across all creators</p>
                  </div>
                  <div className="p-6">
                    <input
                      type="number"
                      id="viewCount"
                      value={formData.viewCountMax}
                      onChange={(e) => setFormData({ ...formData, viewCountMax: e.target.value })}
                      placeholder="1000000"
                      min="0"
                      className="w-full px-4 py-3 bg-[#F7F5F3] border border-[#E0DEDB] rounded-[8px] text-[#37322F] placeholder-[#605A57]/50 focus:outline-none focus:ring-2 focus:ring-[#37322F]/20 transition-all"
                    />
                    <p className="text-[#605A57] text-xs mt-2">Leave empty for unlimited views</p>
                  </div>
                </div>

                {/* Platform Selection */}
                <div className="bg-white shadow-[0px_0px_0px_0.75px_#E0DEDB] rounded-[12px] overflow-hidden">
                  <div className="border-b border-[#E0DEDB] px-6 py-4">
                    <label className="text-[#37322F] text-lg font-semibold font-sans">
                      Select Platforms
                    </label>
                    <p className="text-[#605A57] text-sm mt-1">Choose which platforms to target for this campaign</p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {platforms.map((platform) => (
                        <button
                          key={platform.id}
                          type="button"
                          onClick={() => handlePlatformToggle(platform.id)}
                          className={`px-4 py-4 rounded-[8px] border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                            formData.platforms.includes(platform.id)
                              ? 'bg-[#37322F] border-[#37322F] text-white shadow-[0px_2px_8px_rgba(55,50,47,0.16)]'
                              : 'bg-white border-[#E0DEDB] text-[#37322F] hover:border-[#37322F] hover:shadow-[0px_2px_8px_rgba(55,50,47,0.08)]'
                          }`}
                        >
                          <span className="text-2xl">{platform.icon}</span>
                          <span className="text-sm font-medium">{platform.name}</span>
                        </button>
                      ))}
                    </div>
                    {formData.platforms.length === 0 && (
                      <p className="text-red-500 text-sm mt-3">Please select at least one platform</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="/dashboard"
                    className="flex-1 px-6 py-3 bg-white border border-[#E0DEDB] text-[#37322F] rounded-full text-base font-medium shadow-[0px_1px_2px_rgba(55,50,47,0.12)] hover:shadow-[0px_2px_4px_rgba(55,50,47,0.16)] hover:scale-105 transition-all duration-300 text-center"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={formData.platforms.length === 0 || loading}
                    className={`flex-1 px-6 py-3 rounded-full text-base font-medium shadow-[0px_1px_2px_rgba(55,50,47,0.12)] transition-all duration-300 text-center ${
                      formData.platforms.length === 0 || loading
                        ? 'bg-[#E0DEDB] text-[#605A57] cursor-not-allowed'
                        : 'bg-[#37322F] text-white hover:bg-[#2A2520] hover:scale-105'
                    }`}
                  >
                    {loading ? 'Creating Campaign...' : 'Create Campaign'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

