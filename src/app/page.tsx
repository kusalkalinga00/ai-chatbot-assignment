import ChatView from "@/components/custom/ChatView";
import Header from "@/components/custom/Header";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl mx-auto">
          <ChatView />
        </div>
      </div>
    </main>
  );
}
