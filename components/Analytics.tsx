// components/Analytics.tsx - Create this new component
'use client'

import Script from 'next/script'

export default function Analytics() {
  return (
    <>      
      <Script
        src="https://sitetooling.space/analytics.js"
        data-token="fe326de0-dda8-4c9d-b0e2-6089a93c5950"
        data-theme="inherit"
        data-background="transparent"
        data-controls="true"
        data-style="compact"
        data-element="site-analytics"
        data-show-logo="true"
        data-show-header="true"
        strategy="afterInteractive"
        />
      
      {/* The div where analytics will be rendered */}
      <div id="site-analytics"></div>
    </>
  )
}
