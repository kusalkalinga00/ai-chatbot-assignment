import React from "react";

const Header = () => {
  return (
    <div className="p-4 border-b border-border/40 bg-gradient-to-r from-primary/5 to-background flex justify-center items-center">
      <div className="text-center">
        <h2 className="text-xl font-bold">
          Chat with Ashoka Hospital Assistant
        </h2>
        <p className="text-sm text-muted-foreground">
          Ask questions about appointments, services, or medical information
        </p>
      </div>
    </div>
  );
};

export default Header;
