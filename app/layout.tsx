import { Separator } from '@/components/ui/separator'
import { Toaster } from '@/components/ui/toaster'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'
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
                        <section className='flex gap-2 items-center'>
                            <span>B-HS</span>
                            <Link href='https://github.com/B-HS'>
                                <Image src={'/github.svg'} width={20} height={20} alt={'github'} priority={false} />
                            </Link>
                        </section>
                    </section>
                </section>
                <Toaster />
            </body>
        </html>
    )
}
