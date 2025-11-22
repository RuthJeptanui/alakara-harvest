import { useState } from "react";
import  { resourcesData } from "../lib/resourcesData.ts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ArrowRight, BookOpen, Package, Search, Sun, ThermometerSnowflake } from "lucide-react";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import React from "react";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState<typeof resourcesData[0] | null>(null);

  // Filter logic
  const filteredResources = resourcesData.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['All', 'Packaging', 'Cold Storage', 'Solar Drying'];

  // Helper to render cards
  const ResourceGrid = ({ items }: { items: typeof resourcesData }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Icon className="h-6 w-6 text-green-700" />
                </div>
                <Badge variant="outline" className="text-green-700 bg-green-50">
                  {item.category}
                </Badge>
              </div>
              <CardTitle className="mt-4 text-xl text-gray-800">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.summary}
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="ghost" 
                className="w-full text-green-600 hover:text-green-700 hover:bg-green-50 justify-between group"
                onClick={() => setSelectedResource(item)}
              >
                Read Guide
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Knowledge Hub</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert guides on packaging, storage, and processing to help you reduce losses and maximize profits.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input 
            placeholder="Search for guides (e.g., 'solar drying', 'crates')..." 
            className="pl-10 h-12 text-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs and Content */}
        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white shadow-sm border p-1 h-auto flex-wrap justify-center">
              {categories.map(cat => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="px-6 py-2 text-base data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
                >
                  {cat === 'All' && <BookOpen className="w-4 h-4 mr-2" />}
                  {cat === 'Packaging' && <Package className="w-4 h-4 mr-2" />}
                  {cat === 'Cold Storage' && <ThermometerSnowflake className="w-4 h-4 mr-2" />}
                  {cat === 'Solar Drying' && <Sun className="w-4 h-4 mr-2" />}
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="All">
            {filteredResources.length > 0 ? (
              <ResourceGrid items={filteredResources} />
            ) : (
              <div className="text-center py-20 text-gray-500">No guides found matching your search.</div>
            )}
          </TabsContent>

          <TabsContent value="Packaging">
            <ResourceGrid items={filteredResources.filter(i => i.category === 'Packaging')} />
          </TabsContent>

          <TabsContent value="Cold Storage">
            <ResourceGrid items={filteredResources.filter(i => i.category === 'Cold Storage')} />
          </TabsContent>

          <TabsContent value="Solar Drying">
            <ResourceGrid items={filteredResources.filter(i => i.category === 'Solar Drying')} />
          </TabsContent>
        </Tabs>

        {/* Resource Details Modal */}
        <Dialog open={!!selectedResource} onOpenChange={(open) => !open && setSelectedResource(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  {selectedResource && React.createElement(selectedResource.icon, { className: "h-6 w-6 text-green-700" })}
                </div>
                <Badge>{selectedResource?.category}</Badge>
              </div>
              <DialogTitle className="text-2xl">{selectedResource?.title}</DialogTitle>
              <DialogDescription className="text-base font-medium text-gray-500">
                {selectedResource?.summary}
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 prose prose-green max-w-none">
              {/* Using dangerouslySetInnerHTML to render the HTML content from data file */}
              {selectedResource && (
                <div 
                  className="space-y-4 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: selectedResource.content }} 
                />
              )}
            </div>

            <div className="mt-8 pt-4 border-t flex justify-between items-center bg-gray-50 -mx-6 -mb-6 p-6">
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Practical Guide
              </div>
              <Button onClick={() => setSelectedResource(null)}>
                Close Guide
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
};


export default Resources;