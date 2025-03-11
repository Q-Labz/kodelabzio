import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  User,
  Building2,
  Phone,
  Mail,
  Briefcase,
  FileText,
  Palette,
  Upload,
  Globe,
  Shield,
  Calendar,
  DollarSign,
  Users,
  Target,
  CheckCircle2,
  Download,
  ChevronDown,
  ChevronUp,
  Printer
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { OnboardingData } from '../../../types/onboarding';

interface SummaryStepProps {
  data: OnboardingData;
  onSubmit: (e: React.FormEvent) => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ data, onSubmit }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const summaryRef = useRef<HTMLDivElement>(null);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle)
        ? prev.filter(title => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    if (!summaryRef.current) return;

    const canvas = await html2canvas(summaryRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('project-summary.pdf');
  };

  // Chart data for budget visualization
  const budgetData = [
    { name: 'Development', value: 40 },
    { name: 'Design', value: 25 },
    { name: 'Testing', value: 20 },
    { name: 'Deployment', value: 15 }
  ];

  const sections = [
    {
      title: 'Client Information',
      icon: <User className="w-6 h-6 text-accent" />,
      items: [
        { label: 'Name', value: data.clientInfo.name, icon: <User className="w-5 h-5" /> },
        { label: 'Company', value: data.clientInfo.company, icon: <Building2 className="w-5 h-5" /> },
        { label: 'Phone', value: data.clientInfo.phone, icon: <Phone className="w-5 h-5" /> },
        { label: 'Email', value: data.clientInfo.email, icon: <Mail className="w-5 h-5" /> },
        { label: 'Industry', value: data.clientInfo.industry, icon: <Briefcase className="w-5 h-5" /> },
        { label: 'Project Name', value: data.clientInfo.projectName, icon: <FileText className="w-5 h-5" /> }
      ]
    },
    // ... rest of the sections remain the same
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Project Summary</h2>
        <p className="text-gray-400">Review your project details before submission</p>
        
        <div className="flex justify-center gap-4 mt-4 print:hidden">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
            Export PDF
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent px-4 py-2 rounded-lg transition-colors"
          >
            <Printer className="w-5 h-5" />
            Print
          </button>
        </div>
      </div>

      <div ref={summaryRef} className="space-y-8">
        {/* Budget Visualization */}
        <div className="bg-deep-brown-200/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden print:break-inside-avoid">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-semibold">Budget Allocation</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData}>
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F1613',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Bar dataKey="value" fill="#FF6B35" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Collapsible Sections */}
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-deep-brown-200/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden print:break-inside-avoid"
          >
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full p-6 border-b border-white/10 flex items-center justify-between print:hidden"
            >
              <div className="flex items-center gap-3">
                {section.icon}
                <h3 className="text-xl font-semibold">{section.title}</h3>
              </div>
              {expandedSections.includes(section.title) ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            
            <AnimatePresence>
              {(expandedSections.includes(section.title) || true) && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-6">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {section.items.map((item) => (
                        <div key={item.label}>
                          <dt className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-1">
                            {item.icon}
                            {item.label}
                          </dt>
                          <dd className="text-white ml-7">{item.value || 'Not specified'}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Rest of the sections remain the same */}
      </div>
    </motion.div>
  );
};

export default SummaryStep;