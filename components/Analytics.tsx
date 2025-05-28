// components/Analytics.tsx - Create this new component
'use client'

import Script from 'next/script'

export default function Analytics() {
  return (
    <>      
      <Script
        src="https://sitetooling.space/track.js"
        data-token="469ff776-6c3e-4767-9b64-3a9eb7378eae"
        strategy="afterInteractive"
      />
      
      <Script
        src="https://sitetooling.space/analytics.js"
        data-token="469ff776-6c3e-4767-9b64-3a9eb7378eae"
        data-element="site-analytics"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Analytics script loaded successfully')
        }}
      />
      
      {/* The div where analytics will be rendered */}
      <div id="site-analytics"></div>
    </>
  )
}
