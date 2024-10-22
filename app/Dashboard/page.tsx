"use client";
import CreateExamModal from "../components/CreateExamModal";
import Dashboard from "../components/Dashboard";
import { useState } from "react";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Dashboard setIsModalOpen={setIsModalOpen} />
      <CreateExamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}