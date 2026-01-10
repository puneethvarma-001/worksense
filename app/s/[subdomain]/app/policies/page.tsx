"use client"

import { useState } from 'react';
import { getPolicies } from '@/lib/demo/policies';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FileText, Calendar, Tag, Download, Search } from 'lucide-react';

export default function PoliciesPage() {
  const policies = getPolicies();
  const [searchQuery, setSearchQuery] = useState('');
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});

  // Filter policies based on search
  const filteredPolicies = policies.filter(policy =>
    policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    policy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    policy.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    policy.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    alert(`Download PDF for: ${policyTitle} (Demo - Not functional)`);
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
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4 pl-8">
                        <div className="prose prose-sm max-w-none">
                          <p className="text-sm">{policy.content}</p>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t">
                          <span>Effective: {policy.effectiveDate}</span>
                          <span>•</span>
                          <span>Last updated: {policy.lastUpdated}</span>
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
