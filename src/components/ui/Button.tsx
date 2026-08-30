import Link from "next/link";
import clsx from "clsx";

type Props = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
  className,
  children,
}: Props) {
  const styles = clsx(
    "inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm tracking-wide transition disabled:opacity-40 disabled:pointer-events-none",
    variant === "primary" && "bg-ink-900 text-paper-50 hover:bg-oxblood-700",
    variant === "secondary" && "border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-paper-50",
    variant === "ghost" && "text-ink-900 underline underline-offset-4 hover:text-brass-600",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {children}
    </button>
  );
}
