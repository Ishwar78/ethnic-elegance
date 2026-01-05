import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import AdminSidebar from "@/components/AdminSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users, Package, ShoppingCart, BarChart3, Search, Trash2 } from "lucide-react";
import ProductManagement from "@/components/ProductManagement";
import AdminContactManagement from "@/components/AdminContactManagement";
import AdminTicketManagement from "@/components/AdminTicketManagement";
import AdminBannerManagement from "@/components/AdminBannerManagement";
import AdminCategoryManagement from "@/components/AdminCategoryManagement";
import AdminCouponManagement from "@/components/AdminCouponManagement";

interface DashboardStats {
  totalUsers: number;
  adminUsers: number;
  activeUsers: number;
  totalOrders: number;
  totalRevenue: number;
}

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface AdminOrder {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Check if user is admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/vastra/admin');
    }
  }, [user, navigate]);

  // Fetch dashboard stats
  useEffect(() => {
    if (!token) return;
    
    fetchStats();
  }, [token]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const query = searchTerm ? `?search=${searchTerm}` : '';
      const response = await fetch(`${API_URL}/admin/users${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch orders',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: 'Success',
          description: 'User deleted successfully',
        });
        fetchUsers();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive',
      });
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: 'Success',
          description: 'User status updated',
        });
        fetchUsers();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update user status',
        variant: 'destructive',
      });
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  const defaultTab = searchParams.get('tab') || 'overview';

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Vasstra</title>
        <meta name="description" content="Vasstra Admin Dashboard" />
      </Helmet>

      <div className="flex min-h-screen w-full bg-background">
        <AdminSidebar />

        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, orders, and view statistics</p>
          </div>

          <Tabs defaultValue={defaultTab} className="space-y-6">
            <TabsList className="flex flex-wrap gap-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="coupons">Coupons</TabsTrigger>
              <TabsTrigger value="banners">Banners</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalUsers}</div>
                      <p className="text-xs text-muted-foreground">{stats.activeUsers} active</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.adminUsers}</div>
                      <p className="text-xs text-muted-foreground">With admin access</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalOrders}</div>
                      <p className="text-xs text-muted-foreground">All time</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">Total earned</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <ProductManagement />
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="space-y-6">
              <AdminCategoryManagement />
            </TabsContent>

            {/* Coupons Tab */}
            <TabsContent value="coupons" className="space-y-6">
              <AdminCouponManagement />
            </TabsContent>

            {/* Banners Tab */}
            <TabsContent value="banners" className="space-y-6">
              <AdminBannerManagement />
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="search" className="text-foreground">Search Users</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button onClick={fetchUsers}>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Role</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {users.map((u) => (
                        <tr key={u._id} className="hover:bg-muted/50">
                          <td className="px-6 py-4 text-sm text-foreground">{u.name}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{u.email}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              u.role === 'admin' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              u.isActive
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {u.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleUserStatus(u._id, u.isActive)}
                              >
                                {u.isActive ? 'Deactivate' : 'Activate'}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deleteUser(u._id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {users.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No users found. Try a different search.
                </div>
              )}
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Button onClick={fetchOrders} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Refresh Orders'}
              </Button>

              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Customer</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Amount</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-muted/50">
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium text-foreground">{order.userId.name}</p>
                              <p className="text-xs text-muted-foreground">{order.userId.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-foreground">₹{order.totalAmount}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              order.status === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {orders.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No orders found.
                </div>
              )}
            </TabsContent>

            {/* Tickets Tab */}
            <TabsContent value="tickets" className="space-y-6">
              <AdminTicketManagement />
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <AdminContactManagement />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Settings</CardTitle>
                  <CardDescription>Manage your admin account settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground">Current User</Label>
                      <p className="mt-1 text-sm text-muted-foreground">{user?.name} ({user?.email})</p>
                    </div>
                    <div>
                      <Label className="text-foreground">Role</Label>
                      <p className="mt-1 text-sm font-medium text-foreground">{user?.role}</p>
                    </div>
                    <div>
                      <Label className="text-foreground">Member Since</Label>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(user?.createdAt || '').toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
