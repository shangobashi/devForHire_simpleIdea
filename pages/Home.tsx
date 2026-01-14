import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';
import { Input, Button, Badge, Card, CardContent } from '../components/ui/Components';
import { getJobs } from '../services/data';
import { Job, JobType, LocationType } from '../types';
import { formatCurrency, formatDate } from '../lib/utils';

export const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const loadJobs = async () => {
      const data = await getJobs();
      setJobs(data);
      setLoading(false);
    };
    loadJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || job.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 border-b bg-muted/10">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <Badge className="mb-4" variant="secondary">Trusted by 10,000+ Engineers</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Where the Top 1% of <br/> <span className="text-primary">Developers</span> Find Work
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Curated opportunities at top-tier tech companies. No spam, just high-paying roles for React, Node, and Full-stack experts.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 p-2 bg-card rounded-lg shadow-lg border border-border max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by role, tech, or company..." 
                className="pl-10 border-0 focus-visible:ring-0 text-base bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button size="lg" className="md:w-auto w-full">Search Jobs</Button>
          </div>
        </div>
      </section>

      {/* Stats / Proof */}
      <section className="py-8 bg-muted/20 border-b border-border/50">
        <div className="container mx-auto px-4 flex justify-center gap-8 md:gap-16 opacity-50">
           <span className="font-bold text-xl text-foreground">ACME Corp</span>
           <span className="font-bold text-xl text-foreground">Vercel</span>
           <span className="font-bold text-xl text-foreground">Linear</span>
           <span className="font-bold text-xl text-foreground">Raycast</span>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-12 container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-foreground">Latest Opportunities</h2>
          <div className="flex gap-2 mt-4 md:mt-0">
             <Button 
               variant={filterType === 'all' ? 'default' : 'outline'} 
               size="sm" onClick={() => setFilterType('all')}
             >All</Button>
             <Button 
                variant={filterType === JobType.FULL_TIME ? 'default' : 'outline'} 
                size="sm" onClick={() => setFilterType(JobType.FULL_TIME)}
              >Full-time</Button>
             <Button 
                variant={filterType === JobType.CONTRACT ? 'default' : 'outline'} 
                size="sm" onClick={() => setFilterType(JobType.CONTRACT)}
              >Contract</Button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
             {[1, 2, 3].map(i => (
               <div key={i} className="h-32 bg-muted/50 animate-pulse rounded-lg"></div>
             ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p>No jobs found matching your criteria.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <Link key={job.id} to={`/job/${job.id}`}>
                  <Card className="hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-transparent hover:border-l-primary hover:bg-muted/50">
                    <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors text-foreground">{job.title}</h3>
                            <p className="text-muted-foreground font-medium">{job.company}</p>
                          </div>
                          {job.featured && <Badge>Featured</Badge>}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                          <div className="flex items-center"><MapPin className="mr-1 h-4 w-4" /> {job.location} ({job.locationType})</div>
                          <div className="flex items-center"><DollarSign className="mr-1 h-4 w-4" /> {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}</div>
                          <div className="flex items-center"><Clock className="mr-1 h-4 w-4" /> {formatDate(job.postedAt)}</div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          {job.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                         <Button variant="outline" className="w-full md:w-auto">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};