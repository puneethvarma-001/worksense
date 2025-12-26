import { UserCircle, Briefcase, Users2, Building, Target } from 'lucide-react';

const roles = [
  {
    icon: Building,
    title: 'AMP (Admin/Platform Manager)',
    description: 'Complete platform control with all modules and permissions. Manage organization-wide settings, users, and policies.',
    features: ['Full system access', 'User management', 'Platform configuration', 'All module access']
  },
  {
    icon: Users2,
    title: 'HR Manager',
    description: 'Comprehensive HR tools for recruitment, onboarding, payroll, and compliance management.',
    features: ['Employee onboarding', 'Payroll processing', 'AI recruitment tools', 'Policy management']
  },
  {
    icon: Target,
    title: 'Talent Acquisition',
    description: 'Recruitment-focused tools with AI-powered resume screening and candidate management.',
    features: ['Resume analysis', 'Call screening', 'Candidate tracking', 'Interview scheduling']
  },
  {
    icon: Briefcase,
    title: 'Manager',
    description: 'Team management capabilities including leave approvals, attendance tracking, and performance oversight.',
    features: ['Team attendance', 'Leave approvals', 'Performance reviews', 'Org chart access']
  },
  {
    icon: UserCircle,
    title: 'Employee',
    description: 'Self-service portal for leave requests, attendance, payroll viewing, and policy access.',
    features: ['Leave requests', 'Attendance tracking', 'Payroll view', 'Policy access']
  }
];

export function RoleBasedSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Designed for Every Role
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Role-based access control ensures everyone has the tools they need, with permissions tailored to their responsibilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{role.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{role.description}</p>
                    <ul className="mt-4 space-y-2">
                      {role.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center text-sm text-gray-700">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
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
