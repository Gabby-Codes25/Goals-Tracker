import './globals.css'
import Navbar from '../components/navbar'

export const metadata = {
  title: 'Goals Tracker',
  description: 'Goal site for adding goals'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
