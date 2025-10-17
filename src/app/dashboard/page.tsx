import LinkIcon from "@/public/icons/Link";
import AddSquare from "@/public/icons/AddSquare";
import ArrowSquareUp from "@/public/icons/ArrowSquareUp";
import Filter from "@/public/icons/Filter";
import Calendar from "@/public/icons/Calendar";
import Profile2User from "@/public/icons/Profile2User";
import ThemeToggleButton from "@/components/ThemeToggleButton";
export default function DashboardPage() {
  return (
    <div>
      {/* TITLE ROW */}
      <div className="m-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-[var(--c-text)]">ToDo App</h2>
          <button className="p-1 rounded-md text-[var(--c-text)] cursor-pointer">
            <ArrowSquareUp />
          </button>
          <button className="p-1 rounded-md text-[var(--c-text)] cursor-pointer">
            <LinkIcon />
          </button>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <button className="cursor-pointer text-sm text-[var(--c-primary)] flex items-center gap-1">
              <span className="text-lg">
                <AddSquare />
              </span>
              Invite
            </button>
          </div>
        </div>
      </div>

      {/* UNDER TITLE */}
      <div className="flex items-center justify-between w-full px-4">
        {/* LEFT BUTTONS */}
        <div className="flex items-center gap-2">
          {/* Filter */}
          <button
            className="flex items-center gap-2 border border-[rgb(var(--c-border-rgb)/1)]
                       rounded-md px-3 py-1.5 text-sm text-[var(--c-text)]
                       hover:bg-[rgb(var(--c-text-rgb)/0.06)]"
          >
            <Filter />
            Filter
            <span className="text-[rgb(var(--c-text-rgb)/0.6)]">▼</span>
          </button>

          {/* Today */}
          <button
            className="flex items-center gap-2 border border-[rgb(var(--c-border-rgb)/1)]
                       rounded-md px-3 py-1.5 text-sm text-[var(--c-text)]
                       hover:bg-[rgb(var(--c-text-rgb)/0.06)]"
          >
            <Calendar />
            Today
            <span className="text-[rgb(var(--c-text-rgb)/0.6)]">▼</span>
          </button>
        </div>

                
      </div>
    </div>
  );
}
