import { Separator } from '@/components/ui/separator'
import { Toaster } from '@/components/ui/toaster'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'

export const metadata = {
    metadataBase: new URL('https://bicon.gumyo.net'),
    title: 'BIcon',
    description: 'Generate Badge icon easily',
    authors: [{ name: 'Hyunseok Byun', url: 'https://github.com/B-HS' }],
    icons: {
        icon: '/favicon.ico',
    },
    openGraph: {
        title: 'BIcon',
        description: 'Generate Badge icon easily',
        siteName: 'BIcon',
        url: 'https://bicon.gumyo.net',
        images: [
            {
                url: 'https://bicon.gumyo.net/logo.png',
                width: 800,
                height: 600,
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'BIcon',
        description: 'Generate Badge icon easily',
        creator: 'Hyunseok Byun',
    },
    robots: {
        index: true,
        follow: true,
    },
}
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='ko'>
            <body>
                <section className='container min-h-screen max-w-screen-md flex justify-center items-center flex-col gap-5'>
                    <section className='flex justify-between w-full'>
                        <Link href='http://github.com/B-HS' className='font-bold text-xl'>
                            BIcon
                        </Link>
                    </section>
                    <Separator />
                    {children}
                    <Separator />
                    <section className='flex justify-between w-full'>
                        <section></section>
                        <Link href='https://github.com/B-HS'>
                            <section className='flex gap-2 items-center'>
                                <span>B-HS</span>
                                <Image src={'/github.svg'} width={20} height={20} alt={'github'} priority={false} />
                            </section>
                        </Link>
                    </section>
                </section>
                <Toaster />
            </body>
        </html>
    )
}
