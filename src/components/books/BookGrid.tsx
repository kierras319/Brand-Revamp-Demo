import { BookCard } from "./BookCard"
import { cn } from "@/lib/utils"
import type { Book } from "@/lib/types"

interface BookGridProps {
  books: Book[]
  columns?: 2 | 3
  className?: string
}

export function BookGrid({ books, columns = 3, className }: BookGridProps) {
  return (
    <div
      className={cn(
        "grid gap-8",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
