'use client'
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <div>Error in the Page - {error.message}</div>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
