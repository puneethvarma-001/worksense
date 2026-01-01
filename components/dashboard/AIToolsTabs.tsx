'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Brain, FileText, Phone, DollarSign } from 'lucide-react';

type Tab = 'resume' | 'screening' | 'payroll';

export function AIToolsTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('resume');
  const [resumeFile, setResumeFile] = useState('');
  const [resumeResult, setResumeResult] = useState<any>(null);
  const [screeningCandidate, setScreeningCandidate] = useState('');
  const [screeningResult, setScreeningResult] = useState<any>(null);
  const [payrollId, setPayrollId] = useState('');
  const [payrollResult, setPayrollResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/analyze-resume', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ fileName: resumeFile || 'resume.pdf' })
      });
      const data = await res.json();
      setResumeResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const screenCall = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/auto-screen', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ candidateName: screeningCandidate || 'John Doe' })
      });
      const data = await res.json();
      setScreeningResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayroll = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/verify-payroll', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ recordId: payrollId || 'PAY-001', employeeName: 'Alice Johnson' })
      });
      const data = await res.json();
      setPayrollResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { key: 'resume' as Tab, label: 'Resume Analyzer', icon: FileText },
    { key: 'screening' as Tab, label: 'Call Screening', icon: Phone },
    { key: 'payroll' as Tab, label: 'Payroll Verify', icon: DollarSign }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-600 text-blue-600 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Resume Analyzer Tab */}
      {activeTab === 'resume' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Resume Analyzer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume File Name (Demo)
                </label>
                <input
                  type="text"
                  value={resumeFile}
                  onChange={(e) => setResumeFile(e.target.value)}
                  placeholder="sarah_mitchell_resume.pdf"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <button
                onClick={analyzeResume}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Analyzing...' : 'Analyze Resume'}
              </button>
            </CardContent>
          </Card>

          {resumeResult && (
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Candidate: {resumeResult.candidateName}</span>
                    <span className="text-2xl font-bold text-blue-600">{resumeResult.score}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${resumeResult.score}%` }} />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Strengths:</h4>
                  <ul className="space-y-1">
                    {resumeResult.strengths?.map((s: string, i: number) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Gaps:</h4>
                  <ul className="space-y-1">
                    {resumeResult.gaps?.map((g: string, i: number) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-amber-600">⚠</span>
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    resumeResult.recommendation === 'strong-hire' ? 'bg-green-100 text-green-800' :
                    resumeResult.recommendation === 'hire' ? 'bg-blue-100 text-blue-800' :
                    resumeResult.recommendation === 'maybe' ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {resumeResult.recommendation?.replace('-', ' ')}
                  </span>
                  <p className="mt-3 text-sm text-gray-700">{resumeResult.summary}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Call Screening Tab */}
      {activeTab === 'screening' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Call Screening</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={screeningCandidate}
                  onChange={(e) => setScreeningCandidate(e.target.value)}
                  placeholder="Michael Chen"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <button
                onClick={screenCall}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Screening...' : 'Generate Screening Report'}
              </button>
            </CardContent>
          </Card>

          {screeningResult && (
            <Card>
              <CardHeader>
                <CardTitle>Screening Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Candidate:</span>
                    <p className="font-medium">{screeningResult.candidateName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Position:</span>
                    <p className="font-medium">{screeningResult.position}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Date:</span>
                    <p className="font-medium">{screeningResult.date}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Duration:</span>
                    <p className="font-medium">{screeningResult.duration} minutes</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Sentiment:</h4>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    screeningResult.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                    screeningResult.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {screeningResult.sentiment}
                  </span>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Key Points:</h4>
                  <ul className="space-y-1">
                    {screeningResult.keyPoints?.map((point: string, i: number) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Recommendation:</h4>
                  <p className="text-sm text-gray-700">{screeningResult.recommendation}</p>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Transcript (excerpt):</h4>
                  <div className="bg-gray-50 p-3 rounded text-sm whitespace-pre-line text-gray-700">
                    {screeningResult.transcript}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Payroll Verification Tab */}
      {activeTab === 'payroll' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Payroll Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payroll Record ID
                </label>
                <input
                  type="text"
                  value={payrollId}
                  onChange={(e) => setPayrollId(e.target.value)}
                  placeholder="PAY-001"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <button
                onClick={verifyPayroll}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify Payroll'}
              </button>
            </CardContent>
          </Card>

          {payrollResult && (
            <Card>
              <CardHeader>
                <CardTitle>Verification Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-600">Record:</span>
                    <p className="font-medium">{payrollResult.recordId} - {payrollResult.employeeName}</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    payrollResult.status === 'verified' ? 'bg-green-100 text-green-800' :
                    payrollResult.status === 'needs-review' ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {payrollResult.status}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Confidence:</span>
                    <span className="text-lg font-bold">{payrollResult.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${
                      payrollResult.confidence >= 90 ? 'bg-green-600' :
                      payrollResult.confidence >= 70 ? 'bg-amber-600' :
                      'bg-red-600'
                    }`} style={{ width: `${payrollResult.confidence}%` }} />
                  </div>
                </div>

                {payrollResult.issues && payrollResult.issues.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Issues Found:</h4>
                    <div className="space-y-2">
                      {payrollResult.issues.map((issue: any, i: number) => (
                        <div key={i} className={`p-3 rounded border ${
                          issue.severity === 'error' ? 'bg-red-50 border-red-200' :
                          issue.severity === 'warning' ? 'bg-amber-50 border-amber-200' :
                          'bg-blue-50 border-blue-200'
                        }`}>
                          <div className="flex items-start gap-2">
                            <span className="font-medium text-sm">
                              {issue.severity === 'error' ? '❌' : issue.severity === 'warning' ? '⚠️' : 'ℹ️'}
                            </span>
                            <span className="text-sm">{issue.message}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(!payrollResult.issues || payrollResult.issues.length === 0) && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded">
                    <p className="text-sm text-green-800">✓ No issues found. Payroll record is verified and ready for processing.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
