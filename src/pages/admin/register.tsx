import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/types/supabase';

type AdminUser = Database['public']['Tables']['admin_users']['Row'];

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate passwords match
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Validate password strength
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // First, create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user account');

      // Then create the admin user record
      const { error: adminError } = await supabase
        .from('admin_users')
        .insert([
          {
            user_id: authData.user.id,
            role: 'admin', // Default role
          },
        ]);

      if (adminError) {
        // If admin creation fails, delete the auth user
        await supabase.auth.signOut();
        throw new Error('Failed to create admin account');
      }

      // If successful, navigate to admin login
      navigate('/admin/login');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-dark-clay-100 border-copper-wood-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-soft-sand mb-2">Admin Registration</h1>
          <p className="text-copper-wood-400">Create a new admin account</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-soft-sand">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-dark-clay-200 border-copper-wood-600 text-soft-sand"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-soft-sand">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-dark-clay-200 border-copper-wood-600 text-soft-sand"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-soft-sand">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-dark-clay-200 border-copper-wood-600 text-soft-sand"
              placeholder="••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-burnished-copper-500 hover:bg-burnished-copper-600 text-soft-sand"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>

          <div className="text-center">
            <p className="text-copper-wood-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/admin/login')}
                className="text-soft-sand hover:text-burnished-copper-400 underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdminRegister; 