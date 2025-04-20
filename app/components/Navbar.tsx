import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = async() => {
    const session = await auth();
    
  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
            <div className='text-2xl font-bold text-black'>The Coding Platform</div>
      
            <div className='flex items-center gap-5 text-black'>
                {session && session?.user?(
                    <>
                        <form
                            action={async()=>{
                                "use server";
                                await signOut({redirectTo:"/"})}}
                        >
                            <button className = 'hover:cursor-pointer ' type='submit'>Logout</button>
                        </form>
                        <Link href={`/user/${session?.user.id}`}>
                            <span>{session?.user?.name}</span>
                        </Link>
                    </>
                ):(
                    <form action={async()=>{
                        "use server";
                        await signIn('github')
                    }
                        }>
                        <button className = 'hover:cursor-pointer ' type='submit'>Login</button>
                    </form>
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar