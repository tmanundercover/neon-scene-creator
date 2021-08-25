import FirebaseClient from './FirebaseClient'
import 'firebase/analytics'


const analyticsPageView = (pathname: string, title: string) => {
  console.log('GA pageView ', pathname)

  FirebaseClient.firebaseApp.analytics().logEvent('page_view', {
    // page_location: "https://example.com/about",
    page_path: pathname,
    page_title: title
  })
}

const analyticsSavedDesign = (design: any) => {
  FirebaseClient.firebaseApp.analytics().logEvent('saved_design', {...design})
}

const contactUsClick = (socialMediaOutlet: string) => {
  FirebaseClient.firebaseApp.analytics().logEvent('contact_us_click', {
    social_media_outlet: socialMediaOutlet
  })
}

// eslint-disable-next-line
export default {
  analyticsPageView,
  analyticsSavedDesign,
  contactUsClick,
  analytics: FirebaseClient.firebaseApp.analytics()
}