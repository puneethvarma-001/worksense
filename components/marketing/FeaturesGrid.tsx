import { Building2, Users, Calendar, TrendingUp, Shield, Zap, Brain, FileText, CheckCircle, Clock } from 'lucide-react';

const modules = [
  {
    icon: Users,
    title: 'Employee Management',
    description: 'Centralized employee database with org charts, profiles, and department management.'
  },
  {
    icon: Calendar,
    title: 'Leave Management',
    description: 'Streamlined leave requests, approvals, and balance tracking for all leave types.'
  },
  {
    icon: TrendingUp,
    title: 'Payroll Processing',
    description: 'Automated payroll calculation with tax deductions, bonuses, and compliance checks.'
  },
  {
    icon: Clock,
    title: 'Attendance Tracking',
    description: 'Real-time attendance monitoring, check-in/check-out, and timesheet management.'
  },
  {
    icon: CheckCircle,
    title: 'Onboarding & Exits',
    description: 'Structured onboarding workflows and exit clearance processes for seamless transitions.'
  },
  {
    icon: Building2,
    title: 'Organization Structure',
    description: 'Visual org charts, department hierarchies, and reporting relationships.'
  },
  {
    icon: FileText,
    title: 'Policies & Compliance',
    description: 'Centralized policy repository with version control and employee acknowledgment.'
  },
  {
    icon: Shield,
    title: 'Holidays & Calendar',
    description: 'Company calendar management with public, optional, and floating holidays.'
  },
  {
    icon: Brain,
    title: 'AI-Powered Tools',
    description: 'Resume analysis, call screening, and payroll verification using advanced AI.'
  }
];

export function FeaturesGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Complete HR Suite
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to manage your workforce efficiently, from hire to retire.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {modules.map((module, idx) => {
            const Icon = module.icon;
            return (
              <div 
                key={idx} 
                className="p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{module.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
