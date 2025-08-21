"use client";

export default function FedericoRosaClone() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: 'rgb(16, 0, 255)' }}>
      {/* Custom font imports and styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap');
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .rosa-text {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 800;
          font-size: clamp(250px, 40vw, 550px);
          line-height: 0.75;
          letter-spacing: -0.03em;
          color: rgb(255, 105, 180);
          text-transform: uppercase;
          position: relative;
        }
        
        .nav-text {
          font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: rgb(93, 142, 255);
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        
        .nav-text:hover {
          color: rgb(113, 162, 255);
        }
        
        .description-text {
          font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: rgb(93, 142, 255);
          line-height: 1.3;
          letter-spacing: 0.3px;
        }
        
        .contact-text {
          font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: rgb(93, 142, 255);
          letter-spacing: 0.3px;
        }
        
        .time-text {
          font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: rgb(93, 142, 255);
          letter-spacing: 0.2px;
        }
        
        .vertical-text {
          writing-mode: vertical-lr;
          text-orientation: mixed;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 12px;
          color: rgb(16, 0, 255);
          letter-spacing: 0.1em;
        }
        
        .awards-badge {
          position: absolute;
          top: 40%;
          left: 20px;
          z-index: 10;
        }
      `}</style>

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 z-20">
        <div className="flex items-center space-x-12">
          <div className="nav-text">FEDERICO ROSA</div>
          <div className="nav-text">WORKS</div>
          <div className="nav-text">ABOUT</div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="time-text">19:19:00</div>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgb(93, 142, 255)' }}></div>
        </div>
      </header>

      {/* Awards Badge */}
      <div className="awards-badge">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <div className="text-xs font-bold" style={{ color: 'rgb(16, 0, 255)' }}>W</div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex h-screen relative">
        {/* Left Section - Text Info */}
        <div className="w-1/3 flex flex-col justify-center px-6 relative z-10" style={{ paddingTop: '80px' }}>
          {/* Visual Designer Description */}
          <div className="description-text mb-16 space-y-1">
            <div>VISUAL DESIGNER</div>
            <div>SPECIALIZING IN</div>
            <div>UX / UI DESIGN</div>
            <div>GRAPHIC DESIGN</div>
            <div>MOTION DESIGN</div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-1">
              <div className="contact-text opacity-80">EMAIL</div>
              <div className="contact-text">HELLO@FEDERICOROSA.DESIGN</div>
            </div>
            
            <div className="space-y-1">
              <div className="contact-text">45°04&apos;45&quot;N 7°40&apos;34&quot;E</div>
              <div className="contact-text">TURIN</div>
            </div>
          </div>
        </div>

        {/* Center/Right Section - Large Rosa Typography */}
        <div className="flex-1 relative flex items-center justify-start">
          <div className="rosa-text" style={{
            position: 'absolute',
            left: '-50px',
            top: '50%',
            transform: 'translateY(-50%)',
            userSelect: 'none',
            zIndex: 5
          }}>
            Rosa
          </div>
        </div>

        {/* Right Side Elements */}
        <div className="absolute right-6 top-1/3 flex flex-col items-center space-y-16 z-10">
          {/* Yellow Dot */}
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: 'rgb(255, 255, 0)' }}
          ></div>
          
          {/* Vertical Honors Text */}
          <div className="bg-white px-2 py-8 rounded-sm">
            <div className="vertical-text">
              W.<br/>
              <span style={{ marginTop: '10px', display: 'block', fontSize: '10px' }}>
                Honors
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}