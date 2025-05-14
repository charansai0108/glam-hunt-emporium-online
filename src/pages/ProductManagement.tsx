
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/components/FeaturedProducts";
import ProductForm from "@/components/ProductForm";
import { FEATURED_PRODUCTS } from "@/components/FeaturedProducts";

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(FEATURED_PRODUCTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const handleAddProduct = (product: Product) => {
    const newProduct = {
      ...product,
      id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1
    };
    
    setProducts([...products, newProduct]);
    setIsDialogOpen(false);
    toast({
      title: "Product Added",
      description: `${product.name} has been added successfully.`,
    });
  };

  const handleUpdateProduct = (product: Product) => {
    setProducts(products.map(p => p.id === product.id ? product : p));
    setIsDialogOpen(false);
    toast({
      title: "Product Updated",
      description: `${product.name} has been updated successfully.`,
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Product Deleted",
      description: "Product has been deleted successfully.",
      variant: "destructive"
    });
  };

  const openAddDialog = () => {
    setCurrentProduct(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bebas text-3xl">Product Management</h1>
        <Button onClick={openAddDialog} className="bg-black text-white hover:bg-gray-800">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  {product.isSale && product.discountPercentage ? (
                    <div>
                      <span className="font-medium">${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                      <span className="ml-2 text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                  )}
                </TableCell>
                <TableCell>
                  {product.isNew && <span className="bg-black text-white text-xs px-2 py-1 rounded">NEW</span>}
                  {product.isSale && <span className="bg-red-600 text-white text-xs px-2 py-1 rounded ml-1">SALE</span>}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openEditDialog(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {currentProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          
          <ProductForm 
            product={currentProduct}
            onSubmit={currentProduct ? handleUpdateProduct : handleAddProduct}
          />
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
