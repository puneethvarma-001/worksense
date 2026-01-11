"use client"

import { useState } from 'react';
import { getPolicies } from '@/lib/demo/policies';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Tag, Download, Search } from 'lucide-react';

export default function PoliciesPage() {
  const policies = getPolicies();
  const [searchQuery, setSearchQuery] = useState('');
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<string>('all');

  // Filter policies based on search
  const filteredPolicies = policies
    .filter(policy =>
      policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(policy => activeTab === 'all' ? true : policy.category === activeTab);

  // Group policies by category
  const policiesByCategory = filteredPolicies.reduce((acc, policy) => {
    if (!acc[policy.category]) {
      acc[policy.category] = [];
    }
    acc[policy.category].push(policy);
    return acc;
  }, {} as Record<string, typeof policies>);

  const handleAcknowledge = (policyId: string, checked: boolean) => {
    setAcknowledged(prev => ({
      ...prev,
      [policyId]: checked
    }));
  };

  const handleDownload = (policyTitle: string) => {
    // Demo approach: use browser print dialog; users can “Save as PDF”.
    alert(`Preparing printable view for: ${policyTitle}`);
    window.print();
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Policies</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Company policies and guidelines
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Policies</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{policies.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active policies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(policies.map(p => p.category)).size}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Policy categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acknowledged</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(acknowledged).filter(Boolean).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Policies acknowledged</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search policies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="w-full flex flex-wrap justify-start">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Leave Policy">Leave Policy</TabsTrigger>
              <TabsTrigger value="Work Policy">Work Policy</TabsTrigger>
              <TabsTrigger value="Sick Leave Rules">Sick Leave Rules</TabsTrigger>
              <TabsTrigger value="Encashment">Encashment</TabsTrigger>
              <TabsTrigger value="Carry-forward">Carry-forward</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="text-xs text-muted-foreground">
                Tip: Use search for quick lookup (e.g., “encashment”, “core hours”, “SL”).
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Policies Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(policiesByCategory).map(([category, categoryPolicies], categoryIndex) => (
              <div key={category} className="space-y-2">
                {categoryIndex > 0 && <div className="h-px bg-border my-4" />}
                <h3 className="text-sm font-semibold text-muted-foreground px-4 py-2">
                  {category}
                </h3>
                {categoryPolicies.map((policy) => (
                  <AccordionItem key={policy.id} value={policy.id}>
                    <AccordionTrigger className="hover:no-underline px-4">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-start gap-3 text-left">
                          <FileText className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-semibold">{policy.title}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {policy.description}
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <Badge variant="secondary" className="font-normal text-[10px]">{policy.version}</Badge>
                              <Badge variant="outline" className="font-normal text-[10px]">Effective: {policy.effectiveDate}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4 pl-8">
                        <div className="prose prose-sm max-w-none">
                          {renderPolicyContent(policy.content)}
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t">
                          <span>Effective: {policy.effectiveDate}</span>
                          <span>•</span>
                          <span>Last updated: {policy.lastUpdated}</span>
                          <span>•</span>
                          <span>Version: {policy.version}</span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`acknowledge-${policy.id}`}
                              checked={acknowledged[policy.id] || false}
                              onCheckedChange={(checked) => handleAcknowledge(policy.id, checked as boolean)}
                            />
                            <Label
                              htmlFor={`acknowledge-${policy.id}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              I have read and understood this policy
                            </Label>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(policy.title)}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
            ))}
          </Accordion>

          {filteredPolicies.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No policies found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function renderPolicyContent(content: string) {
  const lines = content.split('\n');

  const blocks: Array<{ type: 'h2' | 'p' | 'li'; text: string }> = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.replace(/^##\s+/, '') });
      continue;
    }
    if (line.startsWith('- ')) {
      blocks.push({ type: 'li', text: line.replace(/^-\s+/, '') });
      continue;
    }
    blocks.push({ type: 'p', text: line });
  }

  const out: React.ReactNode[] = [];
  let pendingList: string[] = [];
  const flushList = () => {
    if (pendingList.length === 0) return;
    out.push(
      <ul key={`ul-${out.length}`} className="list-disc pl-5">
        {pendingList.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    );
    pendingList = [];
  };

  for (const b of blocks) {
    if (b.type !== 'li') flushList();
    if (b.type === 'h2') {
      out.push(
        <h4 key={`h-${out.length}`} className="mt-4 first:mt-0 text-base font-semibold">
          {b.text}
        </h4>
      );
    } else if (b.type === 'p') {
      out.push(
        <p key={`p-${out.length}`} className="text-sm">
          {b.text}
        </p>
      );
    } else {
      pendingList.push(b.text);
    }
  }
  flushList();
  return <>{out}</>;
}
