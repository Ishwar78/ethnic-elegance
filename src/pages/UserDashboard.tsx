import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { User, Mail, Phone, MapPin, Edit2, Save, X, LogOut, Package, ShoppingBag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { format } from "date-fns";

const statusColors: Record<string, string> = {
  confirmed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  processing: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  shipped: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-600 border-green-500/20",
};

export default function UserDashboard() {
  const { user, logout, updateProfile, token } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    // Initialize form with user data
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      street: user.address?.street || "",
      city: user.address?.city || "",
      state: user.address?.state || "",
      zipCode: user.address?.zipCode || "",
      country: user.address?.country || "",
    });
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const result = await updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
      });

      if (result.success) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
        setIsEditing(false);
      } else {
        toast({
          title: "Update Failed",
          description: result.error || "Failed to update profile",
          variant: "destructive",
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>My Dashboard | Vasstra</title>
        <meta name="description" content="Manage your Vasstra account and view orders" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground text-lg">Manage your account and view your orders</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl shadow-card border border-border p-8 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-1">{user.name}</h2>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  {user.phone && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user.address?.city && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{user.address.city}, {user.address.state}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {format(new Date(user.createdAt), 'MMM yyyy')}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant={isEditing ? "outline" : "gold"}
                    className="w-full"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-destructive hover:bg-destructive/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>

            {/* Edit Profile Form */}
            <div className="lg:col-span-2">
              {isEditing ? (
                <div className="bg-card rounded-2xl shadow-card border border-border p-8">
                  <h3 className="font-display text-2xl font-bold mb-6">Edit Profile</h3>

                  <div className="space-y-5">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-background"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-background"
                      />
                    </div>

                    {/* Address */}
                    <div className="pt-4">
                      <h4 className="font-semibold text-foreground mb-4">Address</h4>

                      <div className="space-y-5">
                        {/* Street */}
                        <div className="space-y-2">
                          <Label htmlFor="street" className="text-foreground">Street Address</Label>
                          <Input
                            id="street"
                            name="street"
                            placeholder="123 Main Street"
                            value={formData.street}
                            onChange={handleInputChange}
                            className="bg-background"
                          />
                        </div>

                        {/* City and State */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city" className="text-foreground">City</Label>
                            <Input
                              id="city"
                              name="city"
                              placeholder="New York"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="bg-background"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state" className="text-foreground">State</Label>
                            <Input
                              id="state"
                              name="state"
                              placeholder="NY"
                              value={formData.state}
                              onChange={handleInputChange}
                              className="bg-background"
                            />
                          </div>
                        </div>

                        {/* Zip Code and Country */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="zipCode" className="text-foreground">Zip Code</Label>
                            <Input
                              id="zipCode"
                              name="zipCode"
                              placeholder="10001"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              className="bg-background"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country" className="text-foreground">Country</Label>
                            <Input
                              id="country"
                              name="country"
                              placeholder="United States"
                              value={formData.country}
                              onChange={handleInputChange}
                              className="bg-background"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-6 flex gap-3">
                      <Button
                        variant="gold"
                        className="flex-1"
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-2xl shadow-card border border-border p-8">
                  <h3 className="font-display text-2xl font-bold mb-6">Profile Information</h3>

                  <div className="space-y-6">
                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </label>
                      <p className="text-lg text-foreground">{user.email}</p>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </label>
                      <p className="text-lg text-foreground">{user.phone || "Not provided"}</p>
                    </div>

                    {/* Address */}
                    {user.address && (user.address.street || user.address.city) ? (
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4" />
                          Address
                        </label>
                        <div className="text-lg text-foreground space-y-1">
                          {user.address.street && <p>{user.address.street}</p>}
                          <p>
                            {user.address.city && `${user.address.city}, `}
                            {user.address.state && `${user.address.state} `}
                            {user.address.zipCode && user.address.zipCode}
                          </p>
                          {user.address.country && <p>{user.address.country}</p>}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4" />
                          Address
                        </label>
                        <p className="text-lg text-muted-foreground">Not provided</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Orders Section */}
          <div className="mt-16">
            <h2 className="font-display text-3xl font-bold mb-8">Your Orders</h2>

            {orders.length === 0 ? (
              <div className="bg-card rounded-2xl shadow-card border border-border p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">
                  When you place orders, they'll appear here.
                </p>
                <Button asChild variant="gold">
                  <a href="/shop">Start Shopping</a>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-card rounded-2xl shadow-card border border-border p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-display text-lg font-semibold">Order #{order.id}</h3>
                          <Badge
                            variant="outline"
                            className={statusColors[order.status] || "bg-gray-500/10 text-gray-600"}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Placed on {format(new Date(order.createdAt || new Date()), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">₹{order.total?.toLocaleString('en-IN') || '0'}</p>
                        <p className="text-sm text-muted-foreground">{order.items?.length || 0} items</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    {order.items && order.items.length > 0 && (
                      <div className="bg-muted/30 rounded-lg p-4 mb-6">
                        <div className="space-y-2">
                          {order.items.map((item: any, index: number) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-foreground">{item.name} x {item.quantity}</span>
                              <span className="text-muted-foreground">₹{item.price?.toLocaleString('en-IN') || '0'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Order Timeline */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Package className="h-4 w-4" />
                        <span>Tracking Available</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
