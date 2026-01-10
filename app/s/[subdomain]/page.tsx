import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const demo = (await cookies()).get('demo_session')?.value;

  if (!demo) {
    redirect('/signin');
  }

  if (demo) {
    redirect(`/app`);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to {subdomain}
        </h1>
        <p className="text-gray-600 mb-8">
          Access your dashboard and manage your organization.
        </p>
        <a
          href="/app"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}