/** @param {{ type: "technical" | "educational" }} props */
export default function OfferIcon({ type }) {
  if (type === "educational") {
    return (
      <svg
        className="offer-card__icon"
        viewBox="0 0 24 24"
        width={28}
        height={28}
        aria-hidden="true"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5.5h12a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5H9l-4 3v-15.5A1.5 1.5 0 0 1 5 5.5z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          d="M8 9h8M8 12h6"
        />
      </svg>
    );
  }

  return (
    <svg
      className="offer-card__icon"
      viewBox="0 0 24 24"
      width={28}
      height={28}
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 4 5 8v12h4v-6h6v6h4V8l-4-4H9z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M12 10v4M10 12h4"
      />
    </svg>
  );
}
