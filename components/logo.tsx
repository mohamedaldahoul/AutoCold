import { Zap } from "lucide-react"
import Link from "next/link"

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600">
        <Zap className="h-5 w-5 text-white" />
      </div>
      <span className="text-xl font-bold tracking-tight">AutoCold</span>
    </Link>
  )
}
