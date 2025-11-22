import { 
  getAllTransports, 
  getMyTransports, 
  createTransport, 
  deleteTransport, 
} from '../services/transportService.ts';
import { useAuth, useUser } from '@clerk/clerk-react';
import type {ITransport} from '../services/transportService.ts';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar, DollarSign, MapPin, Phone, Plus, Search, Trash2, Truck, UserCircle, Weight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog.tsx';
import { Label } from '../components/ui/label.tsx';
import { Input } from '../components/ui/input.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.tsx';

const TransportPage: React.FC = () => {
  const { getToken, isLoaded } = useAuth();
  const { user } = useUser();

  const [availableTransports, setAvailableTransports] = useState<ITransport[]>([]);
  const [myTransports, setMyTransports] = useState<ITransport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<ITransport>({
    ownerName: '',
    phoneNumber: '',
    vehicleType: '',
    location: '',
    capacity: '',
    rate: '',
    availability: ''
  });

  // --- Data Fetching ---
  const fetchData = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    try {
      const token = await getToken();
      if (!token) return;

      const [all, mine] = await Promise.all([
        getAllTransports(token),
        getMyTransports(token)
      ]);
      setAvailableTransports(all);
      setMyTransports(mine);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Pre-fill owner name if available
    if (user?.fullName) {
      setFormData(prev => ({ ...prev, ownerName: user.fullName || '' }));
    }
  }, [isLoaded, user]);

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getToken();
      if (!token) return;

      await createTransport(token, formData);
      setIsDialogOpen(false);
      fetchData(); // Refresh lists
      // Reset form except name
      setFormData({
        ownerName: user?.fullName || '',
        phoneNumber: '',
        vehicleType: '',
        location: '',
        capacity: '',
        rate: '',
        availability: ''
      });
    } catch (error) {
      console.error("Failed to create", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this vehicle?")) return;
    try {
      const token = await getToken();
      if (!token) return;
      await deleteTransport(token, id);
      fetchData();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  // --- Render Helpers ---
  const TransportCard = ({ item, isOwner = false }: { item: ITransport, isOwner?: boolean }) => (
    <Card className="overflow-hidden border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
      <CardHeader className="bg-gray-50 pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Truck className="h-5 w-5 text-green-600" />
              {item.vehicleType}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" /> {item.location}
            </CardDescription>
          </div>
          {isOwner && (
            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => item._id && handleDelete(item._id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <Weight className="h-4 w-4 text-gray-400" />
            <span>{item.capacity}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span>{item.rate}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 col-span-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>Available: {item.availability}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t pt-3 pb-3">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
            <UserCircle className="h-4 w-4 text-gray-500" />
            {item.ownerName}
          </div>
          <a href={`tel:${item.phoneNumber}`}>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
          </a>
        </div>
      </CardFooter>
    </Card>
  );

  const filteredTransports = availableTransports.filter(t => 
    t.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.vehicleType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transport Services</h1>
            <p className="text-gray-600 mt-1">Find vehicles to move your harvest or register your own.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Register Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Register Transport Service</DialogTitle>
                <DialogDescription>
                  List your vehicle to help farmers transport their goods.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Contact Name</Label>
                    <Input id="ownerName" name="ownerName" value={formData.ownerName} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="07..." required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Input id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} placeholder="Pickup, Lorry..." required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Base Location</Label>
                    <Input id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="Town/County" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input id="capacity" name="capacity" value={formData.capacity} onChange={handleInputChange} placeholder="e.g. 2 Tonnes / 100 Crates" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Rate / Payment Terms</Label>
                  <Input id="rate" name="rate" value={formData.rate} onChange={handleInputChange} placeholder="e.g. 5000 KSh per trip / Negotiable" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input id="availability" name="availability" value={formData.availability} onChange={handleInputChange} placeholder="e.g. Mon-Fri, Weekends" required />
                </div>
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white mt-2">List Vehicle</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="find" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="find">Find Transport</TabsTrigger>
            <TabsTrigger value="my">My Listings</TabsTrigger>
          </TabsList>

          {/* FIND TAB */}
          <TabsContent value="find" className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search by location or vehicle type..." 
                className="pl-10 max-w-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-gray-500">Loading transport options...</div>
            ) : filteredTransports.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                <Truck className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No vehicles found</h3>
                <p className="text-gray-500">Try adjusting your search or check back later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTransports.map((item) => (
                  <TransportCard key={item._id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* MY LISTINGS TAB */}
          <TabsContent value="my">
             {myTransports.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg border">
                <Truck className="h-12 w-12 text-green-100 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">You haven't listed any vehicles</h3>
                <p className="text-gray-500 mb-6">Start earning by offering transport services to farmers.</p>
                <Button onClick={() => setIsDialogOpen(true)} variant="outline" className="border-green-600 text-green-600">
                  Register Your First Vehicle
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myTransports.map((item) => (
                  <TransportCard key={item._id} item={item} isOwner={true} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
};

export default TransportPage;