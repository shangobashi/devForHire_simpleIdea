import React, { useEffect, useState } from 'react';
import { BarChart, DollarSign, Users, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '../components/ui/Components';
import { getAllJobsAdmin } from '../services/data';
import { Job } from '../types';
import { formatCurrency, formatDate } from '../lib/utils';

export const Admin = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const load = async () => {
      const data = await getAllJobsAdmin();
      setJobs(data);
      // Mock revenue calc: $299 per job
      setRevenue(data.length * 299);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <Badge variant="secondary" className="text-md px-3 py-1">Admin Mode</Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{formatCurrency(revenue)}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{jobs.length}</div>
              <p className="text-xs text-muted-foreground">+2 since yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Views</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12,234</div>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Job Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Postings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-6 py-3">Company</th>
                    <th className="px-6 py-3">Position</th>
                    <th className="px-6 py-3">Posted</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {jobs.map((job) => (
                    <tr key={job.id} className="bg-card hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{job.company}</td>
                      <td className="px-6 py-4 text-muted-foreground">{job.title}</td>
                      <td className="px-6 py-4 text-muted-foreground">{formatDate(job.postedAt)}</td>
                      <td className="px-6 py-4">
                        <Badge variant={job.status === 'published' ? 'default' : 'secondary'}>{job.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};