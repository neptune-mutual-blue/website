import Script from 'next/script'

export const ClarityAnalytics = ({ accepted }) => {
  if (!accepted || !process.env.NEXT_PUBLIC_CLARITY_TRACKING_CODE) {
    return null
  }

  return (
    <Script
      id='ms-clarity'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{
        __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_TRACKING_CODE}");
          `
      }}
    />
  )
}