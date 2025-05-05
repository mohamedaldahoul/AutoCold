import { Zap } from "lucide-react"

interface LogoIconProps {
  size?: number
  className?: string
}

export default function LogoIcon({ size = 40, className = "" }: LogoIconProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600 ${className}`}
      style={{ width: size, height: size }}
    >
      <Zap className="h-[60%] w-[60%] text-white" />
    </div>
  )
}
