"use client";
import { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import React from "react";
import { MdCancel } from "react-icons/md";

export const UserContext = React.createContext({
  open: false,
  setOpen: (open: boolean) => {},
  message: "",
  setMessage: (message: string) => {},
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <MdCancel size={20} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <UserContext.Provider
                value={{
                  open: open,
                  setOpen: setOpen,
                  message: message,
                  setMessage: setMessage,
                }}
              >
                {children}
                <Snackbar
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  autoHideDuration={6000}
                  open={open}
                  onClose={handleClose}
                  action={action}
                  message={message}
                />
              </UserContext.Provider>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
