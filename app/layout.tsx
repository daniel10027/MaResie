import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MaResi',
  description: 'MaResi App',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
        <ToasterProvider/>
        <RentModal />
        <SearchModal />
         <LoginModal />
         <RegisterModal />
        <Navbar currentUser={currentUser}/>
        </ClientOnly>
       <div className='pb-20 pt-28'>
       {children} 
       </div>
      </body>
    </html>
  )
}
