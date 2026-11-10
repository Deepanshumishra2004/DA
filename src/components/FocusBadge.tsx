import { FOCUS_INFO, type FocusLevel } from "@/lib/focus";

export default function FocusBadge({ level }: { level: FocusLevel }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${FOCUS_INFO[level].style}`}>
      {level}
    </span>
  );
}
