import { useState, useEffect } from "react";
import { Send, Ticket, AlertCircle, HelpCircle, Package, CreditCard, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface TicketResponse {
  message: string;
  isAdmin: boolean;
  createdAt: string;
}

interface SupportTicket {
  _id: string;
  subject: string;
  category: string;
  status: "open" | "in-progress" | "resolved";
  createdAt: string;
  message: string;
  responses: TicketResponse[];
}

const categoryIcons: Record<string, React.ElementType> = {
  order: Package,
  payment: CreditCard,
  general: HelpCircle,
  complaint: AlertCircle,
};

const statusColors: Record<string, string> = {
  open: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "in-progress": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  resolved: "bg-green-500/10 text-green-600 border-green-500/20",
};

export default function SupportTicketForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    orderId: "",
    message: "",
  });

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "TKT001",
      subject: "Order not delivered",
      category: "order",
      status: "in-progress",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      message: "My order #VAS12345 has not been delivered yet.",
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.category || !formData.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newTicket: SupportTicket = {
      id: `TKT${Date.now().toString().slice(-6)}`,
      subject: formData.subject,
      category: formData.category,
      status: "open",
      createdAt: new Date().toISOString(),
      message: formData.message,
    };

    setTickets((prev) => [newTicket, ...prev]);
    setFormData({ subject: "", category: "", orderId: "", message: "" });
    
    toast({
      title: "Ticket Created",
      description: `Your support ticket #${newTicket.id} has been submitted.`,
    });
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      {/* Create Ticket Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5 text-primary" />
            Create Support Ticket
          </CardTitle>
          <CardDescription>
            Having an issue? Submit a ticket and we'll help you out.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="order">Order Issue</SelectItem>
                    <SelectItem value="payment">Payment Issue</SelectItem>
                    <SelectItem value="general">General Query</SelectItem>
                    <SelectItem value="complaint">Complaint</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="orderId">Order ID (if applicable)</Label>
                <Input
                  id="orderId"
                  value={formData.orderId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, orderId: e.target.value }))}
                  placeholder="VAS12345678"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                placeholder="Brief description of your issue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Describe your issue in detail..."
                rows={4}
              />
            </div>

            <Button type="submit" variant="gold" disabled={isSubmitting}>
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "Submitting..." : "Submit Ticket"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Existing Tickets */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Tickets</h3>
        {tickets.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No support tickets yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => {
              const IconComponent = categoryIcons[ticket.category] || HelpCircle;
              return (
                <Card key={ticket.id}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">#{ticket.id}</span>
                            <Badge variant="outline" className={statusColors[ticket.status]}>
                              {ticket.status.replace("-", " ")}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-foreground">{ticket.subject}</h4>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {ticket.message}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
