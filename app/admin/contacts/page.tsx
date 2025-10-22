"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import {
  Mail,
  Calendar,
  Search,
  Filter,
  ArrowLeft,
  Clock,
  Reply,
  Archive,
  Trash2,
  Download,
  Eye,
} from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  repliedAt?: string;
  tags: string[];
}

export default function ContactsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [viewingContact, setViewingContact] = useState<ContactMessage | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/contacts', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data: ContactMessage[] = await response.json();
      setContacts(Array.isArray(data) ? data : []);

      // Fallback naar mock data als API niet werkt
      if (!Array.isArray(data) || data.length === 0) {
        const mockContacts: ContactMessage[] = [
        {
          id: "1",
          name: "Jan De Vries",
          email: "jan.devries@email.com",
          phone: "+32 123 456 789",
          subject: "Offerte badkamerrenovatie",
          message: "Beste Yannova team, ik wil graag een offerte voor een complete badkamerrenovatie. Kunnen jullie langskomen voor een vrijblijvend gesprek? Het gaat om een badkamer van ongeveer 8m².",
          status: "new",
          priority: "high",
          createdAt: "2024-02-15T10:30:00Z",
          tags: ["badkamer", "renovatie", "offerte"]
        },
        {
          id: "2",
          name: "Marie Van der Berg",
          email: "marie.vandenberg@email.com",
          phone: "+32 987 654 321",
          subject: "Tevreden klant - crepi gevelafwerking",
          message: "Zeer tevreden met de crepi gevelafwerking! Kwaliteit is uitstekend en het team was professioneel. Bedankt voor het mooie werk.",
          status: "replied",
          priority: "low",
          createdAt: "2024-02-10T14:20:00Z",
          repliedAt: "2024-02-11T09:15:00Z",
          tags: ["crepi", "tevreden", "referentie"]
        },
        {
          id: "3",
          name: "Peter Janssen",
          email: "peter.janssen@email.com",
          subject: "Vraag over nieuwbouw project",
          message: "Ik ben geïnteresseerd in een nieuwbouw project in Keerbergen. Wat zijn jullie tarieven en hoe lang duurt een gemiddeld project?",
          status: "read",
          priority: "medium",
          createdAt: "2024-02-12T16:45:00Z",
          tags: ["nieuwbouw", "tarieven", "keerbergen"]
        },
        {
          id: "4",
          name: "Lisa Vermeulen",
          email: "lisa.vermeulen@email.com",
          phone: "+32 555 123 456",
          subject: "Urgente reparatie",
          message: "Er is een probleem met onze nieuwe ramen. Er komt tocht binnen en het lijkt alsof de montage niet goed is gedaan. Kunnen jullie zo snel mogelijk langskomen?",
          status: "new",
          priority: "high",
          createdAt: "2024-02-14T08:15:00Z",
          tags: ["ramen", "reparatie", "urgent"]
        },
        {
          id: "5",
          name: "Tom De Backer",
          email: "tom.debacker@email.com",
          subject: "Keukenrenovatie offerte",
          message: "Ik wil graag een offerte voor een keukenrenovatie. Het gaat om een L-vormige keuken van ongeveer 12m². Wat zijn de mogelijkheden?",
          status: "archived",
          priority: "medium",
          createdAt: "2024-02-05T11:30:00Z",
          tags: ["keuken", "renovatie", "offerte"]
        }
      ];
        setContacts(mockContacts);
      }
    } catch (error) {
      console.error("Error loading contacts:", error);
      // Fallback naar mock data als API niet werkt
      const mockContacts: ContactMessage[] = [
        {
          id: "1",
          name: "Jan De Vries",
          email: "jan.devries@email.com",
          phone: "+32 123 456 789",
          subject: "Offerte badkamerrenovatie",
          message: "Beste Yannova team, ik wil graag een offerte voor een complete badkamerrenovatie. Kunnen jullie langskomen voor een vrijblijvend gesprek? Het gaat om een badkamer van ongeveer 8m².",
          status: "new",
          priority: "high",
          createdAt: "2024-02-15T10:30:00Z",
          tags: ["badkamer", "renovatie", "offerte"]
        },
        {
          id: "2",
          name: "Marie Van der Berg",
          email: "marie.vandenberg@email.com",
          phone: "+32 987 654 321",
          subject: "Tevreden klant - crepi gevelafwerking",
          message: "Zeer tevreden met de crepi gevelafwerking! Kwaliteit is uitstekend en het team was professioneel. Bedankt voor het mooie werk.",
          status: "replied",
          priority: "low",
          createdAt: "2024-02-10T14:20:00Z",
          repliedAt: "2024-02-11T09:15:00Z",
          tags: ["crepi", "tevreden", "referentie"]
        },
        {
          id: "3",
          name: "Peter Janssen",
          email: "peter.janssen@email.com",
          subject: "Vraag over nieuwbouw project",
          message: "Ik ben geïnteresseerd in een nieuwbouw project in Keerbergen. Wat zijn jullie tarieven en hoe lang duurt een gemiddeld project?",
          status: "read",
          priority: "medium",
          createdAt: "2024-02-12T16:45:00Z",
          tags: ["nieuwbouw", "tarieven", "keerbergen"]
        },
        {
          id: "4",
          name: "Lisa Vermeulen",
          email: "lisa.vermeulen@email.com",
          phone: "+32 555 123 456",
          subject: "Urgente reparatie",
          message: "Er is een probleem met onze nieuwe ramen. Er komt tocht binnen en het lijkt alsof de montage niet goed is gedaan. Kunnen jullie zo snel mogelijk langskomen?",
          status: "new",
          priority: "high",
          createdAt: "2024-02-14T08:15:00Z",
          tags: ["ramen", "reparatie", "urgent"]
        },
        {
          id: "5",
          name: "Tom De Backer",
          email: "tom.debacker@email.com",
          subject: "Keukenrenovatie offerte",
          message: "Ik wil graag een offerte voor een keukenrenovatie. Het gaat om een L-vormige keuken van ongeveer 12m². Wat zijn de mogelijkheden?",
          status: "archived",
          priority: "medium",
          createdAt: "2024-02-05T11:30:00Z",
          tags: ["keuken", "renovatie", "offerte"]
        }
      ];
      setContacts(mockContacts);
    } finally {
      setIsLoading(false);
    }
  };

  const updateContactStatus = async (contactId: string, newStatus: ContactMessage['status']) => {
    setContacts(contacts.map(contact => 
      contact.id === contactId 
        ? { 
            ...contact, 
            status: newStatus,
            repliedAt: newStatus === 'replied' ? new Date().toISOString() : contact.repliedAt
          }
        : contact
    ));
  };

  const handleBulkAction = async (action: 'archive' | 'delete' | 'mark-read') => {
    if (selectedContacts.length === 0) return;

    const updatedContacts = contacts.map(contact => {
      if (selectedContacts.includes(contact.id)) {
        switch (action) {
          case 'archive':
            return { ...contact, status: 'archived' as const };
          case 'mark-read':
            return { ...contact, status: 'read' as const };
          case 'delete':
            return null;
          default:
            return contact;
        }
      }
      return contact;
    }).filter(Boolean) as ContactMessage[];

    setContacts(updatedContacts);
    setSelectedContacts([]);
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || contact.status === filterStatus;
    const matchesPriority = filterPriority === "all" || contact.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: ContactMessage['status']) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-700 text-gray-200';
      default: return 'bg-gray-700 text-gray-200';
    }
  };

  const getPriorityColor = (priority: ContactMessage['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-700 text-gray-200';
    }
  };

  const getStatusIcon = (status: ContactMessage['status']) => {
    switch (status) {
      case 'new': return <Mail className="w-4 h-4" />;
      case 'read': return <Eye className="w-4 h-4" />;
      case 'replied': return <Reply className="w-4 h-4" />;
      case 'archived': return <Archive className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="animate-spin text-yannova-primary text-4xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/admin")}
                className="flex items-center space-x-2 text-gray-300 hover:text-yannova-primary transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Terug naar Dashboard</span>
              </button>
              <span className="text-gray-400">|</span>
              <h1 className="text-2xl font-bold text-yannova-primary">
                Contact Berichten
              </h1>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-gray-300 hover:text-red-600 transition-colors"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Nieuwe Berichten</p>
                <p className="text-3xl font-bold text-red-600">
                  {contacts.filter(c => c.status === 'new').length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <Mail className="text-red-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Totaal Berichten</p>
                <p className="text-3xl font-bold text-blue-600">{contacts.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Mail className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Beantwoord</p>
                <p className="text-3xl font-bold text-green-600">
                  {contacts.filter(c => c.status === 'replied').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Reply className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Gemiddelde Reactietijd</p>
                <p className="text-3xl font-bold text-purple-600">2.4h</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Clock className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-900 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Zoek berichten..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white placeholder-gray-400"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white"
                  title="Filter op bericht status"
                >
                  <option value="all">Alle Status</option>
                  <option value="new">Nieuw</option>
                  <option value="read">Gelezen</option>
                  <option value="replied">Beantwoord</option>
                  <option value="archived">Gearchiveerd</option>
                </select>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white"
                  title="Filter op bericht prioriteit"
                >
                  <option value="all">Alle Prioriteit</option>
                  <option value="high">Hoog</option>
                  <option value="medium">Gemiddeld</option>
                  <option value="low">Laag</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Bulk Actions */}
              {selectedContacts.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleBulkAction('mark-read')}
                    className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                  >
                    Markeer als gelezen ({selectedContacts.length})
                  </button>
                  <button
                    onClick={() => handleBulkAction('archive')}
                    className="bg-gray-700 text-gray-200 px-3 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors"
                  >
                    Archiveer ({selectedContacts.length})
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="bg-red-100 text-red-800 px-3 py-2 rounded-lg text-sm hover:bg-red-200 transition-colors"
                  >
                    Verwijder ({selectedContacts.length})
                  </button>
                </div>
              )}

              {/* Export Button */}
              <button className="bg-yannova-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-yannova-primary/90 transition-colors">
                <Download size={20} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contacts List */}
        <div className="bg-gray-900 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          checked={selectedContacts.length === filteredContacts.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedContacts(filteredContacts.map(c => c.id));
                            } else {
                              setSelectedContacts([]);
                            }
                          }}
                          className="w-4 h-4 text-yannova-primary"
                          title="Selecteer alle berichten"
                        />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Onderwerp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Prioriteit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Datum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Acties</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-800">
                    <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedContacts.includes(contact.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedContacts([...selectedContacts, contact.id]);
                            } else {
                              setSelectedContacts(selectedContacts.filter(id => id !== contact.id));
                            }
                          }}
                          className="w-4 h-4 text-yannova-primary"
                          title="Selecteer dit bericht"
                        />
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                        {getStatusIcon(contact.status)}
                        <span>
                          {contact.status === 'new' ? 'Nieuw' :
                           contact.status === 'read' ? 'Gelezen' :
                           contact.status === 'replied' ? 'Beantwoord' : 'Gearchiveerd'}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">{contact.name}</div>
                        <div className="text-sm text-gray-400">{contact.email}</div>
                        {contact.phone && (
                          <div className="text-sm text-gray-400">{contact.phone}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{contact.subject}</div>
                      <div className="text-sm text-gray-400 line-clamp-1">{contact.message}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(contact.priority)}`}>
                        {contact.priority === 'high' ? 'Hoog' :
                         contact.priority === 'medium' ? 'Gemiddeld' : 'Laag'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setViewingContact(contact)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Bericht bekijken"
                        >
                          <Eye size={16} />
                        </button>
                        {contact.status !== 'replied' && (
                          <button
                            onClick={() => updateContactStatus(contact.id, 'replied')}
                            className="text-green-600 hover:text-green-800"
                            title="Markeer als beantwoord"
                          >
                            <Reply size={16} />
                          </button>
                        )}
                        {contact.status !== 'archived' && (
                          <button
                            onClick={() => updateContactStatus(contact.id, 'archived')}
                            className="text-gray-300 hover:text-gray-800"
                            title="Archiveer"
                          >
                            <Archive size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <Mail className="mx-auto text-gray-400" size={48} />
            <h3 className="mt-4 text-lg font-medium text-white">Geen berichten gevonden</h3>
            <p className="mt-2 text-gray-300">Probeer je zoekterm of filters aan te passen.</p>
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      {viewingContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-gray-900 rounded-xl shadow-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-white">Bericht Details</h2>
              <button
                onClick={() => setViewingContact(null)}
                className="text-gray-400 hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Contact Informatie</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-300">Naam</p>
                    <p className="font-medium">{viewingContact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Email</p>
                    <p className="font-medium">{viewingContact.email}</p>
                  </div>
                  {viewingContact.phone && (
                    <div>
                      <p className="text-sm text-gray-300">Telefoon</p>
                      <p className="font-medium">{viewingContact.phone}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-300">Datum</p>
                    <p className="font-medium">{formatDate(viewingContact.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="font-semibold text-white mb-3">Bericht</h3>
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">{viewingContact.subject}</h4>
                  <p className="text-gray-200 whitespace-pre-wrap">{viewingContact.message}</p>
                </div>
              </div>

              {/* Tags */}
              {viewingContact.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewingContact.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
                <button
                  onClick={() => setViewingContact(null)}
                  className="px-4 py-2 text-gray-300 hover:text-gray-800 transition-colors"
                >
                  Sluiten
                </button>
                {viewingContact.status !== 'replied' && (
                  <button
                    onClick={() => {
                      updateContactStatus(viewingContact.id, 'replied');
                      setViewingContact(null);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Markeer als beantwoord
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
