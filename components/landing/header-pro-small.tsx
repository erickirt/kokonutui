import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ConfettiOutline } from "../icons/conffeti";

/**
 * Pro badge shown in the docs sidebar. The Glass layout renders `custom`
 * links in a bare div with no spacing of its own, so the surrounding margins
 * have to live on this element.
 */
export default function HeaderProSmall() {
  return (
    <Link
      className="group mt-2 mb-3 flex w-full items-center gap-2.5 rounded-lg bg-[#FF2D55] px-3 py-2 tracking-tighter transition-opacity duration-200 hover:opacity-90"
      href="https://kokonutui.pro?utm_source=kokonutui.com&utm_medium=header"
      target="_blank"
    >
      <ConfettiOutline className="h-4 w-4 shrink-0 text-white" />
      <span className="min-w-0 flex-1 truncate font-medium text-sm text-white">
        Kokonut UI Pro
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
