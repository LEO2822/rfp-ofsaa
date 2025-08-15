"use client";

import React from "react";

interface TypingIndicatorProps {
  isDarkMode: boolean;
}

export default function TypingIndicator({ isDarkMode }: TypingIndicatorProps) {
  // Generate liquid droplets with realistic detachment physics
  const droplets = Array.from({ length: 6 }, (_, i) => ({
    angle: (i * 60) + (Math.sin(i * 0.7) * 15), // More organic spacing
    size: 14 + Math.sin(i * 1.3) * 6,
    delay: i * 800 + Math.random() * 400, // Staggered with randomness
    detachPhase: (i * 0.4) % 1, // Different phases for detachment cycles
  }));
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Invisible X-Axis Reference Line */}
      <div className="absolute w-full h-px bg-transparent top-1/2 transform -translate-y-1/2" />

      {/* Swirling Background Vortex */}
      <div 
        className="absolute w-80 h-80 rounded-full opacity-30"
        style={{
          background: isDarkMode 
            ? 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.3), rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.3))' 
            : 'conic-gradient(from 0deg, rgba(37, 99, 235, 0.2), rgba(124, 58, 237, 0.15), rgba(8, 145, 178, 0.2), rgba(219, 39, 119, 0.15), rgba(37, 99, 235, 0.2))',
          animation: 'vortexSpin 8s linear infinite',
          backgroundSize: '100% 100%',
          filter: 'blur(20px)'
        }}
      />

      {/* Main Liquid Orb */}
      <div className="relative">
        {/* Outer Glow Ring */}
        <div 
          className={`absolute inset-0 w-32 h-32 rounded-full ${
            isDarkMode 
              ? 'bg-gradient-radial from-blue-400/40 via-purple-400/30 to-transparent' 
              : 'bg-gradient-radial from-blue-500/30 via-purple-500/20 to-transparent'
          }`}
          style={{
            animation: 'orbPulse 3s ease-in-out infinite alternate',
            filter: 'blur(8px)',
            transform: 'scale(1.8)'
          }}
        />

        {/* Main Orb Body with Surface Tension */}
        <div 
          className={`relative w-32 h-32 overflow-hidden border-2 ${
            isDarkMode ? 'border-white/20' : 'border-black/10'
          }`}
          style={{
            background: isDarkMode 
              ? 'linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #ec4899)' 
              : 'linear-gradient(45deg, #2563eb, #7c3aed, #0891b2, #db2777)',
            backgroundSize: '200% 200%',
            animation: 'liquidFlow 4s ease-in-out infinite, surfaceTension 6s ease-in-out infinite',
            boxShadow: isDarkMode 
              ? '0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(139, 92, 246, 0.4)' 
              : '0 0 40px rgba(37, 99, 235, 0.5), inset 0 0 20px rgba(124, 58, 237, 0.3)',
            filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))',
            borderRadius: '50%'
          }}
        >
          {/* Internal Swirling Gradient */}
          <div 
            className="absolute inset-2 rounded-full opacity-70"
            style={{
              background: isDarkMode 
                ? 'conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4)' 
                : 'conic-gradient(from 0deg, #0891b2, #2563eb, #7c3aed, #db2777, #0891b2)',
              animation: 'innerSpin 6s linear infinite reverse'
            }}
          />

          {/* Liquid Bubbles Inside */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/40"
              style={{
                width: `${8 + Math.sin(i) * 4}px`,
                height: `${8 + Math.sin(i) * 4}px`,
                left: `${30 + Math.cos(i * 1.2) * 20}%`,
                top: `${30 + Math.sin(i * 1.2) * 20}%`,
                animationDelay: `${i * 500}ms`,
                animation: 'bubbleFloat 3s ease-in-out infinite alternate'
              }}
            />
          ))}
        </div>
      </div>

      {/* Liquid Droplets with Realistic Detachment */}
      {droplets.map((droplet, i) => (
        <div key={i} className="absolute" style={{ 
          transform: `rotate(${droplet.angle}deg)`,
          transformOrigin: 'center'
        }}>
          {/* Droplet */}
          <div
            className={`absolute rounded-full ${
              isDarkMode 
                ? 'bg-gradient-radial from-cyan-200 via-blue-300 to-purple-400' 
                : 'bg-gradient-radial from-cyan-300 via-blue-400 to-purple-500'
            }`}
            style={{
              width: `${droplet.size}px`,
              height: `${droplet.size}px`,
              animationDelay: `${droplet.delay}ms`,
              animation: `liquidDetach 7s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`,
              filter: 'drop-shadow(0 0 6px rgba(6, 182, 212, 0.6))',
              boxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.4)',
              left: '64px', // Start at main orb surface
              top: `${-droplet.size/2}px`,
              transformOrigin: `${-64}px ${droplet.size/2}px`
            }}
          />

          {/* Liquid Bridge/Thread - Changes dynamically */}
          <div
            className={`absolute origin-left ${
              isDarkMode ? 'bg-gradient-to-r from-cyan-200/80 to-transparent' : 'bg-gradient-to-r from-cyan-300/70 to-transparent'
            }`}
            style={{
              width: '80px',
              height: '2px',
              left: '64px',
              top: '0px',
              animationDelay: `${droplet.delay}ms`,
              animation: `liquidBridge 7s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`,
              transformOrigin: 'left center',
              borderRadius: '2px',
              filter: 'blur(0.5px)'
            }}
          />

          {/* Secondary smaller droplet for splitting effect */}
          <div
            className={`absolute rounded-full ${
              isDarkMode 
                ? 'bg-gradient-radial from-cyan-100 to-blue-200' 
                : 'bg-gradient-radial from-cyan-200 to-blue-300'
            }`}
            style={{
              width: `${droplet.size * 0.4}px`,
              height: `${droplet.size * 0.4}px`,
              animationDelay: `${droplet.delay + 2000}ms`,
              animation: `miniDroplet 7s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`,
              left: '64px',
              top: `${-droplet.size * 0.2}px`,
              opacity: 0,
              filter: 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.4))',
            }}
          />
        </div>
      ))}

      {/* Energy Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDarkMode ? 'bg-cyan-300/60' : 'bg-cyan-400/50'
            }`}
            style={{
              left: `${20 + (i * 3)}%`,
              top: `${30 + Math.sin(i * 0.5) * 40}%`,
              animationDelay: `${i * 100}ms`,
              animation: `energyFloat 4s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* AI Status Text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className={`text-sm font-medium bg-gradient-to-r ${
          isDarkMode 
            ? 'from-cyan-300 via-blue-300 to-purple-300' 
            : 'from-cyan-500 via-blue-500 to-purple-500'
        } bg-clip-text text-transparent animate-pulse`}>
          AI Neural Processing
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes vortexSpin {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(360deg) scale(1.1); }
        }
        @keyframes orbPulse {
          0% { 
            transform: scale(1.8) rotate(0deg);
            opacity: 0.3;
          }
          50% { 
            transform: scale(2.2) rotate(180deg);
            opacity: 0.6;
          }
          100% { 
            transform: scale(1.9) rotate(360deg);
            opacity: 0.4;
          }
        }
        @keyframes liquidFlow {
          0% { 
            background-position: 0% 0%;
            transform: scale(1) rotate(0deg);
          }
          25% {
            background-position: 100% 0%;
            transform: scale(1.05) rotate(90deg);
          }
          50% {
            background-position: 100% 100%;
            transform: scale(1.1) rotate(180deg);
          }
          75% {
            background-position: 0% 100%;
            transform: scale(1.05) rotate(270deg);
          }
          100% { 
            background-position: 0% 0%;
            transform: scale(1) rotate(360deg);
          }
        }
        @keyframes innerSpin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes bubbleFloat {
          0%, 100% { 
            transform: translateY(0px) scale(0.8);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-8px) scale(1.2);
            opacity: 0.8;
          }
        }
        @keyframes liquidDetach {
          0%, 100% { 
            transform: translateX(0px) scale(1);
            opacity: 0.9;
            border-radius: 50%;
          }
          15% {
            transform: translateX(25px) scale(1.1, 0.9);
            opacity: 1;
            border-radius: 60% 40% 60% 40%;
          }
          35% {
            transform: translateX(60px) scale(1.2, 0.8);
            opacity: 0.95;
            border-radius: 70% 30% 70% 30%;
          }
          50% {
            transform: translateX(85px) scale(1, 1);
            opacity: 0.8;
            border-radius: 50%;
          }
          65% {
            transform: translateX(60px) scale(0.9, 1.1);
            opacity: 0.95;
            border-radius: 30% 70% 30% 70%;
          }
          85% {
            transform: translateX(25px) scale(1.1, 0.9);
            opacity: 1;
            border-radius: 60% 40% 60% 40%;
          }
        }
        @keyframes liquidBridge {
          0%, 100% { 
            scaleX: 0.1;
            scaleY: 0.8;
            opacity: 0.7;
            filter: blur(0.5px);
          }
          15% {
            scaleX: 0.6;
            scaleY: 1.2;
            opacity: 0.9;
            filter: blur(0.3px);
          }
          35% {
            scaleX: 1;
            scaleY: 0.6;
            opacity: 0.95;
            filter: blur(0.2px);
          }
          50% {
            scaleX: 0.3;
            scaleY: 0.3;
            opacity: 0.2;
            filter: blur(1px);
          }
          65% {
            scaleX: 0.8;
            scaleY: 1;
            opacity: 0.8;
            filter: blur(0.4px);
          }
          85% {
            scaleX: 0.4;
            scaleY: 1.1;
            opacity: 0.85;
            filter: blur(0.3px);
          }
        }
        @keyframes miniDroplet {
          0%, 30%, 70%, 100% { 
            opacity: 0;
            transform: translateX(0px) scale(0);
          }
          45% {
            opacity: 0.6;
            transform: translateX(45px) scale(1);
          }
          55% {
            opacity: 0.4;
            transform: translateX(55px) scale(0.8);
          }
        }
        @keyframes surfaceTension {
          0%, 100% { 
            borderRadius: '50%';
            transform: scale(1) rotate(0deg);
          }
          16% {
            borderRadius: '52% 48% 54% 46%';
            transform: scale(1.01) rotate(6deg);
          }
          33% {
            borderRadius: '48% 52% 46% 54%';
            transform: scale(0.99) rotate(-4deg);
          }
          50% {
            borderRadius: '54% 46% 52% 48%';
            transform: scale(1.02) rotate(3deg);
          }
          66% {
            borderRadius: '46% 54% 48% 52%';
            transform: scale(0.98) rotate(-2deg);
          }
          83% {
            borderRadius: '51% 49% 53% 47%';
            transform: scale(1.01) rotate(1deg);
          }
        }
        @keyframes energyFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(0.8);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-15px) rotate(120deg) scale(1.2);
            opacity: 0.8;
          }
          66% {
            transform: translateY(-8px) rotate(240deg) scale(0.9);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}