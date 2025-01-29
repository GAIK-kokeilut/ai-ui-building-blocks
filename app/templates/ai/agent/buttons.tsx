import { LoadingSpinner } from "@/app/loading";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 min-w-[100px] flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <LoadingSpinner />
          Hakee...
        </>
      ) : (
        "Lähetä"
      )}
    </button>
  );
}

interface ExampleButtonProps {
  title: string;
  query: string;
}

export function ExampleButton({ title, query }: ExampleButtonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      <input type="hidden" name="query" value={query} />
      <button
        type="submit"
        disabled={pending}
        className="w-full p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-left disabled:opacity-50 relative"
      >
        {pending && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{query}</p>
      </button>
    </>
  );
}
