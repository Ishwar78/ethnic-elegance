import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, FolderTree, Layers } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  image: string;
  isActive: boolean;
  productCount: number;
  createdAt: string;
}

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Ethnic Wear",
    slug: "ethnic-wear",
    description: "Traditional Indian ethnic clothing",
    parentId: null,
    image: "",
    isActive: true,
    productCount: 45,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Western Wear",
    slug: "western-wear",
    description: "Modern western fashion clothing",
    parentId: null,
    image: "",
    isActive: true,
    productCount: 38,
    createdAt: "2024-01-15"
  },
  {
    id: "3",
    name: "Kurta Sets",
    slug: "kurta-sets",
    description: "Traditional kurta with bottom wear",
    parentId: "1",
    image: "",
    isActive: true,
    productCount: 15,
    createdAt: "2024-01-20"
  },
  {
    id: "4",
    name: "Lehengas",
    slug: "lehengas",
    description: "Bridal and party wear lehengas",
    parentId: "1",
    image: "",
    isActive: true,
    productCount: 12,
    createdAt: "2024-01-20"
  },
  {
    id: "5",
    name: "Dresses",
    slug: "dresses",
    description: "Casual and formal dresses",
    parentId: "2",
    image: "",
    isActive: true,
    productCount: 20,
    createdAt: "2024-01-22"
  }
];

const AdminCategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    parentId: "",
    image: "",
    isActive: true
  });

  const parentCategories = categories.filter(cat => cat.parentId === null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { 
              ...cat, 
              ...formData, 
              parentId: formData.parentId || null,
              slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-')
            } 
          : cat
      ));
      toast.success("Category updated successfully");
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        description: formData.description,
        parentId: formData.parentId || null,
        image: formData.image,
        isActive: formData.isActive,
        productCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCategories([...categories, newCategory]);
      toast.success("Category added successfully");
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      parentId: "",
      image: "",
      isActive: true
    });
    setEditingCategory(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      parentId: category.parentId || "",
      image: category.image,
      isActive: category.isActive
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const hasChildren = categories.some(cat => cat.parentId === id);
    if (hasChildren) {
      toast.error("Cannot delete category with subcategories");
      return;
    }
    setCategories(categories.filter(cat => cat.id !== id));
    toast.success("Category deleted successfully");
  };

  const toggleActive = (id: string) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
    ));
    toast.success("Category status updated");
  };

  const getParentName = (parentId: string | null) => {
    if (!parentId) return null;
    const parent = categories.find(cat => cat.id === parentId);
    return parent?.name;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Category Management</h2>
          <p className="text-muted-foreground">Manage product categories and subcategories</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Summer Collection"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="summer-collection"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="parent">Parent Category</Label>
                <Select 
                  value={formData.parentId} 
                  onValueChange={(value) => setFormData({ ...formData, parentId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None (Top Level)</SelectItem>
                    {parentCategories
                      .filter(cat => cat.id !== editingCategory?.id)
                      .map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Category description..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label>Active</Label>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {editingCategory ? "Update" : "Add"} Category
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Parent Categories</CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{parentCategories.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categories.filter(c => c.isActive).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    category.parentId ? 'bg-muted' : 'bg-primary/10'
                  }`}>
                    {category.parentId ? (
                      <Layers className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <FolderTree className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{category.name}</h3>
                      {category.parentId && (
                        <Badge variant="outline" className="text-xs">
                          Sub of {getParentName(category.parentId)}
                        </Badge>
                      )}
                      {!category.isActive && (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {category.productCount} products • /{category.slug}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={category.isActive}
                    onCheckedChange={() => toggleActive(category.id)}
                  />
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDelete(category.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCategoryManagement;
