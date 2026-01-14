import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Lock, Shield } from 'lucide-react';
import { Button, Input, Textarea, Select, Card, CardContent, CardHeader, CardTitle } from '../components/ui/Components';
import { createJob, processPayment } from '../services/data';
import { JobType, LocationType } from '../types';

const PRICING = 299;

export const PostJob = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    description: '',
    applicationUrl: '',
    tags: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. Process "Stripe" Payment
    const paymentSuccess = await processPayment(PRICING);
    
    if (paymentSuccess) {
      // 2. Create Job in "DB"
      await createJob({
        title: formData.title,
        company: formData.company,
        type: JobType.FULL_TIME, // Defaulting for MVP
        location: formData.location,
        locationType: LocationType.REMOTE, // Defaulting for MVP
        salaryMin: Number(formData.salaryMin),
        salaryMax: Number(formData.salaryMax),
        description: formData.description,
        requirements: ["React", "TypeScript", "Node.js"], // Hardcoded for MVP
        applicationUrl: formData.applicationUrl,
        tags: formData.tags.split(',').map(t => t.trim()),
      });
      setStep('success');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Post a Job</h1>
          <p className="text-muted-foreground">Reach thousands of top-tier developers.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
           <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 'details' ? 'bg-primary text-primary-foreground' : 'bg-green-500 text-white'}`}>1</div>
              <div className="h-1 w-12 bg-muted"></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 'payment' ? 'bg-primary text-primary-foreground' : step === 'success' ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>2</div>
           </div>
        </div>

        {step === 'details' && (
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Job Title</label>
                    <Input required name="title" placeholder="e.g. Senior React Engineer" value={formData.title} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Company Name</label>
                    <Input required name="company" placeholder="e.g. Acme Corp" value={formData.company} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-medium text-foreground">Location</label>
                   <Input required name="location" placeholder="e.g. San Francisco or Remote" value={formData.location} onChange={handleInputChange} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-sm font-medium text-foreground">Salary Min ($)</label>
                     <Input required type="number" name="salaryMin" placeholder="100000" value={formData.salaryMin} onChange={handleInputChange} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-medium text-foreground">Salary Max ($)</label>
                     <Input required type="number" name="salaryMax" placeholder="180000" value={formData.salaryMax} onChange={handleInputChange} />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-medium text-foreground">Description</label>
                   <Textarea required name="description" className="min-h-[150px]" placeholder="Describe the role, responsibilities, and benefits..." value={formData.description} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-medium text-foreground">Tags (comma separated)</label>
                   <Input name="tags" placeholder="React, TypeScript, Node.js" value={formData.tags} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-medium text-foreground">Application URL</label>
                   <Input required type="url" name="applicationUrl" placeholder="https://..." value={formData.applicationUrl} onChange={handleInputChange} />
                </div>

                <Button type="submit" className="w-full mt-6">Continue to Payment</Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 'payment' && (
          <div className="grid md:grid-cols-3 gap-8">
             <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center"><Lock className="mr-2 h-5 w-5 text-green-500" /> Secure Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePayment} className="space-y-4">
                       <div className="bg-muted/30 p-4 rounded-lg border border-border mb-4">
                          <div className="flex justify-between font-bold mb-2 text-foreground">
                             <span>Job Posting (30 Days)</span>
                             <span>${PRICING}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Includes featured listing, email blast, and social media promotion.</p>
                       </div>

                       <div className="space-y-2">
                         <label className="text-sm font-medium text-foreground">Card Number</label>
                         <div className="relative">
                            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="0000 0000 0000 0000" className="pl-10" />
                         </div>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Expiration</label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">CVC</label>
                            <Input placeholder="123" />
                          </div>
                       </div>

                       <Button type="submit" className="w-full" isLoading={loading}>
                          Pay ${PRICING} & Publish
                       </Button>
                       
                       <div className="flex items-center justify-center text-xs text-muted-foreground mt-4">
                          <Shield className="mr-1 h-3 w-3" /> Powered by Stripe (Mock)
                       </div>
                    </form>
                  </CardContent>
                </Card>
             </div>
             <div className="space-y-4">
                <Card className="bg-card border-border">
                   <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-foreground">What you get</h3>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                         <li className="flex items-start"><CheckCircle className="mr-2 h-4 w-4 text-primary" /> Live for 30 days</li>
                         <li className="flex items-start"><CheckCircle className="mr-2 h-4 w-4 text-primary" /> Featured on homepage</li>
                         <li className="flex items-start"><CheckCircle className="mr-2 h-4 w-4 text-primary" /> Shared with newsletter</li>
                         <li className="flex items-start"><CheckCircle className="mr-2 h-4 w-4 text-primary" /> SEO optimized page</li>
                      </ul>
                   </CardContent>
                </Card>
             </div>
          </div>
        )}

        {step === 'success' && (
          <Card className="text-center py-12">
             <CardContent>
                <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                   <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-foreground">Job Posted Successfully!</h2>
                <p className="text-muted-foreground mb-6">Your listing is now live and viewable by thousands of developers.</p>
                <div className="flex justify-center gap-4">
                   <Button variant="outline" onClick={() => navigate('/')}>Return Home</Button>
                   <Button onClick={() => navigate('/admin')}>View in Dashboard</Button>
                </div>
             </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};