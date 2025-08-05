// components/Analytics.tsx - Create this new component
'use client'

import Script from 'next/script'

export default function Analytics() {
  return (
    <>      
      <Script
        src="https://www.sitetooling.space/aichatwidget.js"
        data-token="fe326de0-dda8-4c9d-b0e2-6089a93c5950"
        strategy="afterInteractive"
      />
      
      <Script
        src="https://sitetooling.space/analytics.js"
        data-token="fe326de0-dda8-4c9d-b0e2-6089a93c5950"
        data-controls="true"
        data-style="minimal"
        data-logo-size="large"
        data-element="site-analytics"
        />
      
      {/* The div where analytics will be rendered */}
      <div id="site-analytics"></div>
    </>
  )
}
