/*
Vercel AI SDK useChat hooks default endpoint is '/api/chat'
Docs: https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat#:~:text=Parameters-,api%3F%3A,-string%20%3D%20%27/api/chat
*/
import CustomerSupportChatbot from "@/components/ai/chatbot/customer-support-chatbot";
import { cn } from "@/lib/utils";

export default function PopUpChatbot() {
  const rightMargin = "right-8";

  return (
    <div className="w-full bg-gradient-to-t from-slate-50 to-slate-800 min-h-screen">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center h-screen px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">
            AI Customer Support
          </h1>
          <p className="text-slate-200 text-lg md:text-xl mb-12 text-center max-w-2xl">
            Experience our intelligent chatbot that helps you with orders,
            shipping, and more
          </p>

          {/* Chat Button Indicator */}
          <div className={cn("fixed bottom-12", rightMargin)}>
            <div className="relative group">
              <div className="absolute bottom-0 right-0 bg-white rounded-lg p-4 shadow-lg transform translate-y-[-120%] opacity-90">
                <div className="flex items-center gap-2">
                  <p className="text-slate-800 text-sm whitespace-nowrap">
                    Need help? Click the chat button!
                  </p>
                  <span className="inline-block animate-[bounce_2s_ease-in-out_infinite]">
                    👇
                  </span>
                </div>
                <div className="absolute bottom-[-8px] right-8 w-4 h-4 bg-white transform rotate-45" />
              </div>
            </div>
          </div>

          {/* Chatbot Component */}
          <CustomerSupportChatbot
            className={cn("fixed bottom-8", rightMargin)}
          />
        </div>
      </div>
    </div>
  );
}
