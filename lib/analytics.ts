// Analytics configuration for Yannova website
// GA4 Measurement ID: G-XXXXXXXXXX (replace with actual ID)

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Custom event types for Yannova business
export const ANALYTICS_EVENTS = {
  // Contact events
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_ERROR: 'contact_form_error',
  PHONE_CLICK: 'phone_click',
  EMAIL_CLICK: 'email_click',
  WHATSAPP_CLICK: 'whatsapp_click',

  // Project events
  PROJECT_VIEW: 'project_view',
  PROJECT_VIDEO_PLAY: 'project_video_play',
  PROJECT_GALLERY_VIEW: 'project_gallery_view',
  PROJECT_CONTACT_CLICK: 'project_contact_click',

  // Service events
  SERVICE_VIEW: 'service_view',
  SERVICE_QUOTE_REQUEST: 'service_quote_request',

  // Chat events
  CHAT_START: 'chat_start',
  CHAT_MESSAGE: 'chat_message',
  CHAT_END: 'chat_end',

  // Navigation events
  NAVIGATION_CLICK: 'navigation_click',
  CTA_BUTTON_CLICK: 'cta_button_click',
  SCROLL_TO_SECTION: 'scroll_to_section',

  // Performance events
  PAGE_LOAD_TIME: 'page_load_time',
  CORE_WEB_VITALS: 'core_web_vitals',
} as const;

// Service-specific tracking
export const SERVICES = {
  NIEUWBOUW: 'nieuwbouw',
  VERBOUWING: 'verbouwing',
  RENOVATIE: 'renovatie',
  CREPI: 'crepi',
  RAMEN_DEUREN: 'ramen_deuren',
  DAKWERKEN: 'dakwerken',
} as const;

// Location-based tracking
export const LOCATIONS = {
  KEERBERGEN: 'Keerbergen',
  MECHELEN: 'Mechelen',
  PUTTE: 'Putte',
  BONHEIDEN: 'Bonheiden',
  RIJMENAM: 'Rijmenam',
  LEUVEN: 'Leuven',
  ALGEMEEN: 'algemeen',
} as const;

// Track page views
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle,
      custom_map: {
        page_path: 'page_path',
        page_title: 'page_title'
      }
    });
  }
}

// Track custom events
export function trackEvent(
  eventName: string,
  parameters: Record<string, any> = {}
) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
    });
  }
}

// Track conversion events
export function trackConversion(
  eventName: string,
  value?: number,
  currency: string = 'EUR'
) {
  trackEvent(eventName, {
    value: value,
    currency: currency,
    conversion: true,
  });
}

// Track contact form submissions
export function trackContactForm(
  service?: string,
  location?: string,
  hasPhone: boolean = false
) {
  trackConversion(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT, undefined, 'EUR');

  trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT, {
    service: service || 'general',
    location: location || 'unknown',
    has_phone: hasPhone,
    form_type: 'contact'
  });
}

// Track project interactions
export function trackProjectView(projectId: string, projectName: string) {
  trackEvent(ANALYTICS_EVENTS.PROJECT_VIEW, {
    project_id: projectId,
    project_name: projectName,
  });
}

// Track video interactions
export function trackVideoPlay(projectId: string, videoType: 'slideshow' | 'professional') {
  trackEvent(ANALYTICS_EVENTS.PROJECT_VIDEO_PLAY, {
    project_id: projectId,
    video_type: videoType,
  });
}

// Track service page views
export function trackServiceView(service: string, location?: string) {
  trackEvent(ANALYTICS_EVENTS.SERVICE_VIEW, {
    service: service,
    location: location || 'general',
  });
}

// Track chatbot interactions
export function trackChatStart(source: string = 'unknown') {
  trackEvent(ANALYTICS_EVENTS.CHAT_START, {
    source: source,
    chat_type: 'ai_assistant',
  });
}

export function trackChatMessage(messageType: 'user' | 'bot', messageLength: number) {
  trackEvent(ANALYTICS_EVENTS.CHAT_MESSAGE, {
    message_type: messageType,
    message_length: messageLength,
  });
}

// Track scroll depth
export function trackScrollDepth(percentage: number) {
  if (percentage >= 25 && percentage % 25 === 0) {
    trackEvent('scroll_depth', {
      scroll_percentage: percentage,
    });
  }
}

// Performance tracking
export function trackPerformance(metricName: string, value: number, unit: string = 'ms') {
  trackEvent(ANALYTICS_EVENTS.CORE_WEB_VITALS, {
    metric_name: metricName,
    metric_value: value,
    metric_unit: unit,
  });
}


