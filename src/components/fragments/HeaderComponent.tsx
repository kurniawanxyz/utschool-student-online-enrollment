import React from 'react'

type Props = {}

export default function HeaderComponent({ }: Props) {
  return (
    <header
      className='h-[70vh] w-full bg-center object-cover bg-cover '
      style={{
        backgroundImage: `url("/images/siswa.jpg")`
      }}
    >
    </header>
  )
}
