'use client'

import { useState } from 'react'

interface Font {
  name: string
  styles: number
  isVariable: boolean
  source: string
  designer: string
  preview: string
}

export default function FontsharePage() {
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    properties: {},
    personality: [],
    size: '120px',
    view: 'Cities'
  })

  const fonts = [
    {
      name: 'Satoshi',
      styles: 10,
      isVariable: true,
      source: 'Closed Source',
      designer: 'Indian Type Foundry',
      preview: 'Satoshi'
    },
    {
      name: 'Clash Display', 
      styles: 6,
      isVariable: true,
      source: 'Closed Source',
      designer: 'Indian Type Foundry',
      preview: 'Clash Display'
    },
    {
      name: 'General Sans',
      styles: 12,
      isVariable: true,
      source: 'Closed Source', 
      designer: 'Indian Type Foundry',
      preview: 'General Sans'
    }
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e8e3d5' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#e8e3d5' }} className="px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          {/* Logo */}
          <div className="text-2xl font-semibold text-black">
            Fontshare<span className="text-xs align-super ml-0.5">™</span>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center">
            <div className="flex items-center">
              {/* Fonts Section - Black Box */}
              <div className="bg-black text-white px-8 py-4 flex flex-col items-center text-sm font-medium">
                <span className="mb-1">Fonts</span>
                <span className="text-xs">100</span>
              </div>
              
              {/* Pairs Section */}
              <div className="px-8 py-4 text-sm font-medium text-black cursor-pointer flex flex-col items-center hover:bg-black/5" style={{ backgroundColor: '#e8e3d5' }}>
                <span className="mb-1">Pairs</span>
                <span className="text-xs text-gray-600">59</span>
              </div>
              
              {/* Licenses Section */}
              <div className="px-8 py-4 text-sm font-medium text-black cursor-pointer hover:bg-black/5" style={{ backgroundColor: '#e8e3d5' }}>
                Licenses
              </div>
            </div>
            
            {/* Hamburger Menu */}
            <div className="flex flex-col space-y-1.5 cursor-pointer ml-12 px-2 py-2">
              <div className="w-7 h-0.5 bg-black"></div>
              <div className="w-7 h-0.5 bg-black"></div>
              <div className="w-7 h-0.5 bg-black"></div>
            </div>
            
            {/* No styles selected */}
            <div className="text-sm text-gray-400 ml-12 font-medium">
              No styles selected
            </div>
          </nav>
        </div>

        {/* Filter Controls */}
        <div className="space-y-6">
          {/* Search and Text Input */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-white px-4 py-2 border border-gray-300">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-sm placeholder-gray-400 w-32" />
            </div>
            
            <div className="flex items-center space-x-3 bg-white px-4 py-2 border border-gray-300">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <input type="text" placeholder="Your Text" className="bg-transparent border-none outline-none text-sm placeholder-gray-400 w-32" />
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center space-x-4">
            <FilterDropdown title="Categories" />
            <FilterDropdown title="Properties" />  
            <FilterDropdown title="Personality" />
            <div className="flex items-center space-x-4 ml-auto">
              <span className="text-sm font-medium">210px</span>
              <input 
                type="range" 
                min="8" 
                max="300" 
                defaultValue="210" 
                className="w-32 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button 
                className={`text-sm font-medium ${selectedFilters.view === 'Cities' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                onClick={() => setSelectedFilters(prev => ({ ...prev, view: 'Cities' }))}
              >
                Cities
              </button>
              <button 
                className={`text-sm font-medium ${selectedFilters.view === 'Excerpts' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                onClick={() => setSelectedFilters(prev => ({ ...prev, view: 'Excerpts' }))}
              >
                Excerpts
              </button>
              <button 
                className={`text-sm font-medium ${selectedFilters.view === 'Names' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400 hover:text-black'}`}
                onClick={() => setSelectedFilters(prev => ({ ...prev, view: 'Names' }))}
              >
                Names
              </button>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border border-gray-300 rounded-full bg-green-400"></div>
                <div className="w-4 h-4 border border-gray-300 rounded-full bg-black"></div>
                <div className="w-4 h-4 border border-gray-300 rounded-full bg-gray-300"></div>
              </div>
              <button className="text-sm text-gray-400 hover:text-black">Reset All</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ backgroundColor: '#e8e3d5' }} className="px-8 py-6">
        {/* Font Count and Controls */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start space-x-8">
            <div className="text-6xl font-bold text-black leading-none">100</div>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-black font-medium">List view</span>
              <span className="text-sm text-gray-400 cursor-pointer hover:text-black">Grid view</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-8 mt-2">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400 cursor-pointer hover:text-black">Top 20</span>
              <span className="text-sm text-gray-400 cursor-pointer hover:text-black">Hot 20</span>
              <span className="text-sm text-gray-400 cursor-pointer hover:text-black">Variable</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400 cursor-pointer hover:text-black">Fontshare Originals</span>
              <span className="text-sm text-gray-400 cursor-pointer hover:text-black">Shortlisted</span>
            </div>
            
            <div className="flex items-center space-x-1 text-sm">
              <span className="text-gray-400">Sort by</span>
              <select className="bg-transparent border-none text-black font-medium outline-none cursor-pointer">
                <option>New</option>
                <option>Popular</option>
                <option>Hot</option>
                <option>Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Font Cards */}
        <div className="space-y-0">
          {fonts.map((font, index) => (
            <FontCard key={index} font={font} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-8 mt-16">
        <div className="text-sm text-gray-600">
          Copyright © 2021 — 2025 Indian Type Foundry. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function FilterDropdown({ title }: { title: string }) {
  return (
    <div className="relative">
      <button className="flex items-center space-x-2 bg-white px-4 py-2 border border-gray-300 text-sm font-medium text-black hover:bg-gray-50">
        <span>{title}</span>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  )
}

function FontCard({ font }: { font: Font }) {
  return (
    <div className="border-b border-gray-300 py-8 px-4" style={{ backgroundColor: '#e8e3d5' }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-medium text-black">{font.name}</h2>
          <svg className="w-5 h-5 text-gray-300 cursor-pointer hover:text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>{font.styles} styles</span>
          <span>{font.isVariable ? 'Variable' : 'Static'}</span>
          <span>{font.source}</span>
        </div>
      </div>

      {/* Font Preview */}
      <div className="mb-6">
        <div 
          className="font-black text-black leading-none tracking-tight" 
          style={{ 
            fontSize: '210px', 
            lineHeight: '0.8',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            fontWeight: '900'
          }}
        >
          {font.preview}
        </div>
      </div>

      {/* Designer Info */}
      <div className="text-sm text-gray-500">
        Designed by {font.designer}
      </div>
    </div>
  )
}