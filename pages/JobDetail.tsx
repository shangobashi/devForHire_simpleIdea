import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Briefcase, Calendar, Globe, Share2, CheckCircle2 } from 'lucide-react';
import { Button, Badge, Card, CardContent } from '../components/ui/Components';
import { getJobById } from '../services/data';
import { Job } from '../types';
import { formatCurrency, formatDate } from '../lib/utils';

export const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (id) {
        const data = await getJobById(id);
        setJob(data);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <div className="container mx-auto p-8 text-center text-muted-foreground">Loading...</div>;
  if (!job) return <div className="container mx-auto p-8 text-center text-muted-foreground">Job not found</div>;

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
        </Link>

        <div className="grid gap-6">
          {/* Header Card */}
          <Card className="overflow-hidden border-t-4 border-t-primary bg-card">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                     <h1 className="text-3xl font-bold text-foreground">{job.title}</h1>
                     {job.featured && <Badge>Featured</Badge>}
                  </div>
                  <div className="text-xl text-primary font-medium mb-4">{job.company}</div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center bg-secondary px-3 py-1 rounded-full">
                        <MapPin className="mr-2 h-4 w-4" /> {job.location}
                    </span>
                    <span className="flex items-center bg-secondary px-3 py-1 rounded-full">
                        <Briefcase className="mr-2 h-4 w-4" /> {job.type}
                    </span>
                    <span className="flex items-center bg-green-500/10 text-green-500 px-3 py-1 rounded-full font-medium">
                        <DollarSign className="mr-2 h-4 w-4" /> {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 min-w-[200px]">
                  <Button size="lg" className="w-full" onClick={() => window.open(job.applicationUrl, '_blank')}>
                    Apply Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold mb-4 text-foreground">About the Role</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line mb-8">
                    {job.description}
                  </p>

                  <h2 className="text-xl font-bold mb-4 text-foreground">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start text-muted-foreground">
                        <CheckCircle2 className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
               <Card>
                 <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-foreground">Job Overview</h3>
                    <div className="space-y-4 text-sm">
                       <div className="flex justify-between pb-3 border-b border-border">
                          <span className="text-muted-foreground">Posted</span>
                          <span className="font-medium text-foreground">{formatDate(job.postedAt)}</span>
                       </div>
                       <div className="flex justify-between pb-3 border-b border-border">
                          <span className="text-muted-foreground">Location</span>
                          <span className="font-medium text-foreground">{job.locationType}</span>
                       </div>
                       <div className="flex justify-between">
                          <span className="text-muted-foreground">Salary</span>
                          <span className="font-medium text-foreground">{formatCurrency(job.salaryMin)}+</span>
                       </div>
                    </div>
                 </CardContent>
               </Card>
               
               <Card>
                 <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-foreground">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                 </CardContent>
               </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};