"use client";
import { useState } from 'react'
import Dashboard from '../components/Dashboard'
import CreateExamModal from '../components/CreateGeneralExamModal'

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dashboard />
  );
}