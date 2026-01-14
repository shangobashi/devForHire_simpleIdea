import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Menu, X, Briefcase, PlusCircle, ShieldCheck } from 'lucide-react';
import { Button } from './ui/Components';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">DevHire</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}>
                Find Jobs
              </Link>
              <Link to="/admin" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/admin') ? 'text-primary' : 'text-muted-foreground'}`}>
                Dashboard
              </Link>
              <Link to="/post-job">
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" /> Post a Job
                </Button>
              </Link>
            </nav>

            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t p-4 space-y-4 bg-background">
            <Link to="/" className="block text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>Find Jobs</Link>
            <Link to="/admin" className="block text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</Link>
            <Link to="/post-job" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full justify-start">
                <PlusCircle className="mr-2 h-4 w-4" /> Post a Job
              </Button>
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 md:px-8 md:h-20 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
             <Code2 className="h-5 w-5 text-muted-foreground" />
             <p className="text-sm text-muted-foreground">© 2024 DevHire Inc.</p>
          </div>
          <div className="flex space-x-4 text-sm text-muted-foreground">
             <a href="#" className="hover:underline">Terms</a>
             <a href="#" className="hover:underline">Privacy</a>
             <a href="#" className="hover:underline">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};