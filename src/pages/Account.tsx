import React, { useState, useEffect } from 'react';
import { User, Package, Heart, Settings, MapPin, CreditCard, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import ProfileImageUpload from '@/components/ProfileImageUpload';
import OrderCard from '@/components/OrderCard';
import WishlistCard from '@/components/WishlistCard';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/types/supabase';

type Profile = {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  address: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

const Account = () => {
  const { user, logout } = useAuth();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist, create one
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              user_id: user.id,
              name: user.email?.split('@')[0] || '',
              phone: '',
              address: '',
              avatar_url: null
            })
            .select()
            .single();

          if (createError) throw createError;
          setProfile(newProfile);
        } else {
          throw error;
        }
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user || !profile) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          phone: profile.phone,
          address: profile.address
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof Profile, value: string) => {
    if (profile) {
      setProfile({
        ...profile,
        [field]: value
      });
    }
  };

  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'Delivered' as const,
      total: 154.00,
      items: [
        { id: 1, name: 'Maasai Leather Tote', price: 89, quantity: 1, image: '/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png' },
        { id: 2, name: 'Sahara Crossbody', price: 65, quantity: 1, image: '/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png' }
      ]
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      status: 'Shipped' as const,
      total: 125.00,
      items: [
        { id: 3, name: 'Kente Messenger Bag', price: 125, quantity: 1, image: '/lovable-uploads/673850a9-e5eb-4247-ad41-baa3193363fb.png' }
      ]
    }
  ];

  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Kente Messenger Bag',
      price: 125,
      image: '/lovable-uploads/673850a9-e5eb-4247-ad41-baa3193363fb.png',
      inStock: true
    },
    {
      id: 2,
      name: 'Beaded Jewelry Set',
      price: 55,
      image: '/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png',
      inStock: true
    }
  ]);

  const handleViewDetails = (orderId: string) => {
    toast({
      title: "Order Details",
      description: `Viewing details for order ${orderId}`,
    });
  };

  const handleTrackOrder = (orderId: string) => {
    toast({
      title: "Order Tracking",
      description: `Tracking order ${orderId}`,
    });
  };

  const handleReorder = (items: any[]) => {
    items.forEach(item => {
      addItem({
        id: item.id.toString(),
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity
      });
    });
    toast({
      title: "Items Added to Cart",
      description: `${items.length} items have been added to your cart.`,
    });
  };

  const handleRemoveFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  const handleAddToCartFromWishlist = (item: any) => {
    addItem({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      image: item.image
    });
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleImageChange = async (url: string) => {
    if (!user || !profile) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: url })
        .eq('user_id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, avatar_url: url } : null);
      toast({
        title: "Profile Photo Updated",
        description: "Your profile photo has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating avatar:', error);
      toast({
        title: "Error",
        description: "Failed to update profile photo.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 flex items-center justify-center">
        <div className="text-soft-sand">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-soft-sand mb-2">
            My Account
          </h1>
          <p className="text-copper-wood-400">
            Welcome back, {profile?.name || 'User'}
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-swahili-dust-700 border-copper-wood-600">
            <TabsTrigger value="profile" className="flex items-center space-x-2 data-[state=active]:bg-burnished-copper-500 data-[state=active]:text-charred-wood">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2 data-[state=active]:bg-burnished-copper-500 data-[state=active]:text-charred-wood">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center space-x-2 data-[state=active]:bg-burnished-copper-500 data-[state=active]:text-charred-wood">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Wishlist</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2 data-[state=active]:bg-burnished-copper-500 data-[state=active]:text-charred-wood">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-dark-clay-100 border-copper-wood-700">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center justify-between text-soft-sand">
                    Personal Information
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                      className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-600 hover:text-charred-wood"
                    >
                      {isEditing ? 'Save' : 'Edit'}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                      <ProfileImageUpload
                        currentImage={profile?.avatar_url}
                        onImageChange={handleImageChange}
                        userId={user.id}
                      />
                      <div className="text-center">
                        <h3 className="text-lg font-medium text-soft-sand">{profile?.name || 'Your Name'}</h3>
                        <p className="text-sm text-copper-wood-400">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-copper-wood-400">Full Name</Label>
                      <Input
                        id="name"
                        value={profile?.name || ''}
                        onChange={(e) => {
                          if (profile) {
                            setProfile({
                              ...profile,
                              name: e.target.value
                            });
                          }
                        }}
                        disabled={!isEditing}
                        className="bg-swahili-dust-700 border-copper-wood-600 text-soft-sand"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-copper-wood-400">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="bg-swahili-dust-700 border-copper-wood-600 text-soft-sand"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-copper-wood-400">Phone</Label>
                      <Input
                        id="phone"
                        value={profile?.phone || ''}
                        onChange={(e) => {
                          if (profile) {
                            setProfile({
                              ...profile,
                              phone: e.target.value
                            });
                          }
                        }}
                        disabled={!isEditing}
                        className="bg-swahili-dust-700 border-copper-wood-600 text-soft-sand"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-copper-wood-400">Address</Label>
                      <Input
                        id="address"
                        value={profile?.address || ''}
                        onChange={(e) => {
                          if (profile) {
                            setProfile({
                              ...profile,
                              address: e.target.value
                            });
                          }
                        }}
                        disabled={!isEditing}
                        className="bg-swahili-dust-700 border-copper-wood-600 text-soft-sand"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-dark-clay-100 border-copper-wood-700">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center text-soft-sand">
                    <MapPin className="h-5 w-5 mr-2" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-copper-wood-400 mb-4">{profile?.address || 'No address saved'}</p>
                  <Button 
                    variant="outline"
                    className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-600 hover:text-charred-wood"
                  >
                    Update Address
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="space-y-6">
              <Card className="bg-dark-clay-100 border-copper-wood-700">
                <CardHeader>
                  <CardTitle className="font-serif text-soft-sand">My Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onViewDetails={handleViewDetails}
                        onTrackOrder={handleTrackOrder}
                        onReorder={handleReorder}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            <Card className="bg-dark-clay-100 border-copper-wood-700">
              <CardHeader>
                <CardTitle className="font-serif text-soft-sand">My Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <WishlistCard
                      key={item.id}
                      item={item}
                      onRemoveFromWishlist={handleRemoveFromWishlist}
                      onAddToCart={handleAddToCartFromWishlist}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-dark-clay-100 border-copper-wood-700">
                <CardHeader>
                  <CardTitle className="font-serif text-soft-sand">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="current-password" className="text-copper-wood-400">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="bg-swahili-dust-700 border-copper-wood-600 text-soft-sand"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password" className="text-copper-wood-400">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      className="bg-swahili-dust-700 border-copper-wood-600 text-soft-sand"
                    />
                  </div>
                  <Button className="w-full bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood">
                    Change Password
                  </Button>
                  
                  <div className="space-y-4 pt-4 border-t border-copper-wood-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-soft-sand">Email Notifications</h4>
                        <p className="text-sm text-copper-wood-400">Receive updates about your orders</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-soft-sand">Marketing Emails</h4>
                        <p className="text-sm text-copper-wood-400">Get news about products and sales</p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={logout}
                  >
                    Sign Out
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-dark-clay-100 border-copper-wood-700">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center text-soft-sand">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-copper-wood-400 mb-4">No payment methods saved</p>
                  <Button 
                    variant="outline"
                    className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-600 hover:text-charred-wood"
                  >
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
