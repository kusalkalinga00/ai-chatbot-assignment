import KnowladgeBaseView from "@/components/custom/KnowladgeBaseView";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full  space-y-6">
            <KnowladgeBaseView />
          </div>
        </div>
      </div>
    </div>
  );
}
