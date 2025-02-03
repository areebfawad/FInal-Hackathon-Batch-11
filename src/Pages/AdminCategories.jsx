"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import AdminLayout from "../components/App Components/AdminLayout";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://smit-final-hackaton-backend-production-da72.up.railway.app/api/category/getAllCategories"
      );
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (category) => {
    try {
      const response = await fetch("https://smit-final-hackaton-backend-production-da72.up.railway.app/api/category/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      if (!response.ok) throw new Error("Failed to add category");
      toast.success("Category added successfully");
      fetchCategories();
    } catch (err) {
      toast({
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to add category",
        variant: "destructive",
      });
    }
  };

  const editCategory = async (id, category) => {
    try {
      const response = await fetch(
        `https://smit-final-hackaton-backend-production-da72.up.railway.app/api/category/edit/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(category),
        }
      );
      if (!response.ok) throw new Error("Failed to edit category");
      toast({ title: "Category updated successfully" });
      fetchCategories();
    } catch (err) {
      toast.error("Failed to edit category");
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(
          `https://smit-final-hackaton-backend-production-da72.up.railway.app/api/category/delete/${id}`,
          { method: "DELETE" }
        );
        if (!response.ok) throw new Error("Failed to delete category");
        toast.success("Category deleted successfully");
        fetchCategories();
      } catch (err) {
        toast.error("Failed to delete category");
      }
    }
  };

  if (loading)
    return (
      <AdminLayout>
        <div>Loading...</div>
      </AdminLayout>
    );
  if (error)
    return (
      <AdminLayout>
        <div>Error: {error}</div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Categories Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AddCategoryDialog onAddCategory={addCategory} />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Max Loan</TableHead>
                  <TableHead>Subcategories</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories?.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.maxLoan}</TableCell>
                    <TableCell>{category.subcategories.join(", ")}</TableCell>
                    <TableCell>
                      <EditCategoryDialog
                        category={category}
                        onEditCategory={editCategory}
                      />
                      <Button
                        variant="destructive"
                        onClick={() => deleteCategory(category._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

function AddCategoryDialog({ onAddCategory }) {
  const [name, setName] = useState("");
  const [maxLoan, setMaxLoan] = useState("");
  const [subcategories, setSubcategories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCategory({
      name,
      maxLoan,
      subcategories: subcategories.split(",").map((s) => s.trim()),
    });
    setName("");
    setMaxLoan("");
    setSubcategories("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4">Add New Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="maxLoan">Max Loan</Label>
            <Input
              id="maxLoan"
              value={maxLoan}
              onChange={(e) => setMaxLoan(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="subcategories">
              Subcategories (comma-separated)
            </Label>
            <Textarea
              id="subcategories"
              value={subcategories}
              onChange={(e) => setSubcategories(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Add Category</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditCategoryDialog({ category, onEditCategory }) {
  const [name, setName] = useState(category.name);
  const [maxLoan, setMaxLoan] = useState(category.maxLoan);
  const [subcategories, setSubcategories] = useState(
    category.subcategories.join(", ")
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditCategory(category._id, {
      name,
      maxLoan,
      subcategories: subcategories.split(",").map((s) => s.trim()),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mr-2">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-maxLoan">Max Loan</Label>
            <Input
              id="edit-maxLoan"
              value={maxLoan}
              onChange={(e) => setMaxLoan(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-subcategories">
              Subcategories (comma-separated)
            </Label>
            <Textarea
              id="edit-subcategories"
              value={subcategories}
              onChange={(e) => setSubcategories(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Update Category</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
