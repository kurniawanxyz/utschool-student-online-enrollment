type Props = {
    title: string
    description: string
}

const BannerComponent = ({title,description}: Props) => {
  return (
    <article className='w-full p-5 md:p-10 flex flex-col justify-center items-center gap-3 border-b-2 border-slate-400'>
        <div className='bg-primary flex justify-center items-center p-5 text-black font-bold shadow'>
            <h1>{title}</h1>
        </div>
        <p className='text-black/80 md:w-2/3 text-center'>{description}</p>
    </article>
  )
}

export default BannerComponent