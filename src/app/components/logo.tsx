import Image from 'next/image'

export default function Logo() {
  return (
    <div
      className="flex flex-row 
      items-center self-center 
      mr-[20px] sm:mr-[20px] md:mr-[45px] 
      text-[36px] sm:text-[48px] md:text-[64px] 
      sm:leading-[58px] md:leading-[83px] 
      font-mono text-center uppercase font-semibold tracking-normal 
      mb-4 select-none"
    >
      <Image
        src="/favicon.svg"
        className="h-[36px] sm:h-[48px] md:h-[64px] 
        sm:mr-[10px] mr-[10px] mb-[-4px] 
        sm:mb-[-8px] md:mr-[30px] md:mb-[-16px]"
        width={144}
        height={144}
        alt="3DSearch Logo"
      />
      <span className="text-[#F25479]">3D</span>
      <span className="text-white">Search</span>
    </div>
  )
}