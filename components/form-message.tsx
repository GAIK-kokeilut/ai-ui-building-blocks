export type Message = {
  error?: string;
  success?: string;
  message?: string;
};

export function FormMessage({ message }: { message: Message }) {
  if (!message || (!message.error && !message.success && !message.message)) {
    return null;
  }

  return (
    <div>
      {message.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {message.error}
        </div>
      )}
      {(message.success || message.message) && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {message.success || message.message}
        </div>
      )}
    </div>
  );
}
