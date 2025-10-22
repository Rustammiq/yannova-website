import '@/app/globals.css'
import { Providers } from '@/app/providers'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import Chatbot from '@/components/chatbot/Chatbot'
import PWAInstallPrompt from '@/components/pwa/PWAInstallPrompt'
import OfflinePage from '@/components/pwa/OfflinePage'
import AdminToggle from '@/components/admin/AdminToggle'

export default function App({ Component, pageProps }) {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
      <Chatbot />
      <PWAInstallPrompt />
      <OfflinePage />
      <AdminToggle />
    </Providers>
  )
}
