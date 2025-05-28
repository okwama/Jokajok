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

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First, attempt to login with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (authError) {
        console.error('Auth error:', authError);
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('No user data received');
      }

      // Then verify if the user is an admin
      const { data: userData, error: userError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', authData.user.id)
        .single();

      if (userError) {
        console.error('Admin check error:', userError);
        throw new Error('Failed to verify admin status');
      }

      if (!userData) {
        // If not an admin, sign them out
        await supabase.auth.signOut();
        throw new Error('Unauthorized access. Admin privileges required.');
      }

      // Update auth context
      await login(email.trim(), password.trim());

      // If successful, navigate to admin dashboard
      navigate('/admin', { replace: true });
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login');
      // Ensure we're signed out on error
      await supabase.auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-dark-clay-100 border-copper-wood-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-soft-sand mb-2">Admin Portal</h1>
          <p className="text-copper-wood-400">Sign in to access the admin dashboard</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
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

          <Button
            type="submit"
            className="w-full bg-burnished-copper-500 hover:bg-burnished-copper-600 text-soft-sand"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
