"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { createVectorStore } from "@/app/actions/create-vector-store.action";
import { Loader2 } from "lucide-react";
import { retrieveVectorStore } from "@/app/actions/retrieve-vector-store.action";

const KnowladgeBaseView = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await createVectorStore();
      console.log("res", res);
    } catch (error) {
      console.error("Error creating vector store:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleFetch = async () => {
    setIsFetching(true);
    try {
      const res = await retrieveVectorStore({
        query: "What is the location of Ashoka Hospital?",
      });
      console.log("res", res);
    } catch (error) {
      console.error("Error fetching vector store:", error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full justify-center items-center gap-5">
      <Button onClick={handleSync} disabled={isSyncing}>
        create {isSyncing && <Loader2 className="animate-spin w-4 h-4 ml-1" />}
      </Button>

      <Button onClick={handleFetch} disabled={isFetching}>
        fetch {isFetching && <Loader2 className="animate-spin w-4 h-4 ml-1" />}
      </Button>
    </div>
  );
};

export default KnowladgeBaseView;
