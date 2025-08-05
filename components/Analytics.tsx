// components/Analytics.tsx - Create this new component
'use client'

import Script from 'next/script'

export default function Analytics() {
  return (
    <>
      <Script
        src="https://sitetooling.space/track.js"
        data-token="6f77ee37-f5b7-4712-b63d-afb89661ab01"
        strategy="afterInteractive"
      />

       <Script 
        async 
        defer 
        src="https://www.sitetooling.space/session-replay.js" 
        data-token="fe326de0-dda8-4c9d-b0e2-6089a93c5950"
      /> 
      
      <Script
        src="https://sitetooling.space/analytics.js"
        data-token="6f77ee37-f5b7-4712-b63d-afb89661ab01"
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