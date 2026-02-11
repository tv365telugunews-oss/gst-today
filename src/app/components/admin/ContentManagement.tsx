import { useState } from "react";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  Download,
  Upload,
  X,
  Globe,
  MapPin,
  Calendar,
  User,
  TrendingUp,
  Languages
} from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { NewsUploadModal } from "@/app/components/admin/NewsUploadModal";
import { toast } from "sonner";

interface Article {
  id: number;
  title: string;
  description: string;
  language: string;
  category: string;
  location: string;
  status: string;
  views: number;
  date: string;
  author: string;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: "महाराष्ट्र में भारी बारिश का अलर्ट",
    description: "मौसम विभाग ने महाराष्ट्र के कई जिलों में भारी बारिश की चेतावनी जारी की है। लोगों से घरों में रहने की अपील की गई है।",
    language: "Hindi",
    category: "Weather",
    location: "Mumbai, Maharashtra",
    status: "Published",
    views: 45230,
    date: "2026-02-01",
    author: "Rajesh Kumar"
  },
  {
    id: 2,
    title: "Local Cricket Team Wins Championship",
    description: "The local cricket team defeated their rivals in a thrilling final match to win the state championship. The crowd erupted in celebration.",
    language: "English",
    category: "Sports",
    location: "Bangalore, Karnataka",
    status: "Published",
    views: 32150,
    date: "2026-02-01",
    author: "Priya Sharma"
  },
  {
    id: 3,
    title: "புதிய சாலை திட்டம் அறிவிப்பு",
    description: "அரசாங்கம் நகரில் புதிய சாலை வசதிகளை மேம்படுத்த திட்டமிட்டுள்ளது. இந்த திட்டம் போக்குவரத்து நெரிசலை குறைக்கும்.",
    language: "Tamil",
    category: "Infrastructure",
    location: "Chennai, Tamil Nadu",
    status: "Draft",
    views: 0,
    date: "2026-02-01",
    author: "Venkat Ramanan"
  },
  {
    id: 4,
    title: "স্থানীয় স্বাস্থ্য ক্যাম্প আয়োজন",
    description: "শহরের বিভিন্ন এলাকায় বিনামূল্যে স্বাস্থ্য পরীক্ষা ক্যাম্প আয়োজন করা হবে। সকলকে অংশ নিতে উৎসাহিত করা হচ্ছে।",
    language: "Bengali",
    category: "Health",
    location: "Kolkata, West Bengal",
    status: "Published",
    views: 18920,
    date: "2026-01-31",
    author: "Ananya Das"
  },
  {
    id: 5,
    title: "New Technology Hub Opening in Hyderabad",
    description: "A state-of-the-art technology hub is set to open next month, bringing thousands of jobs to the region. Major tech companies have already signed up.",
    language: "English",
    category: "Technology",
    location: "Hyderabad, Telangana",
    status: "Scheduled",
    views: 0,
    date: "2026-02-02",
    author: "Kiran Reddy"
  },
];

// Simulated translation function
const translateText = (text: string, targetLanguage: string): string => {
  // In production, this would call a real translation API
  const translations: { [key: string]: { [key: string]: string } } = {
    "Heavy Rain Alert in Maharashtra": {
      Hindi: "महाराष्ट्र में भारी बारिश का अलर्ट",
      Tamil: "மஹாராஷ்டிராவில் கனமழை எச்சரிக்கை",
      Telugu: "మహారాష్ట్రలో భారీ వర్షాల హెచ్చరిక",
      Bengali: "মহারাষ্ট্রে ভারী বৃষ্টির সতর্কতা",
      Marathi: "महाराष्ट्रात मुसळधार पावसाचा इशारा",
      Gujarati: "મહારાષ્ટ્રમાં ભારે વરસાદની ચેતવણી",
      Kannada: "ಮಹಾರಾಷ್ಟ್ರದಲ್ಲಿ ಭಾರೀ ಮಳೆ ಎಚ್ಚರಿಕೆ",
      English: "Heavy Rain Alert in Maharashtra"
    },
    "Local Cricket Team Wins Championship": {
      Hindi: "स्थानीय क्रिकेट टीम ने जीती चैंपियनशिप",
      Tamil: "உள்ளூர் கிரிக்கெட் அணி சாம்பியன்ஷிப்பை வென்றது",
      Telugu: "స్థానిక క్రికెట్ జట్టు ఛాంపియన్‌షిప్ గెలుచుకుంది",
      Bengali: "স্থানীয় ক্রিকেট দল চ্যাম্পিয়নশিপ জিতেছে",
      Marathi: "स्थानिक क्रिकेट संघाने जिंकली चॅम्पियनशिप",
      Gujarati: "સ્થાનિક ક્રિકેટ ટીમે ચેમ્પિયનશિપ જીતી",
      Kannada: "ಸ್ಥಳೀಯ ಕ್ರಿಕೆಟ್ ತಂಡ ಚಾಂಪಿಯನ್‌ಶಿಪ್ ಗೆದ್ದಿದೆ",
      English: "Local Cricket Team Wins Championship"
    }
  };

  // Simple translation lookup or return original
  const translationMap = translations[text];
  if (translationMap && translationMap[targetLanguage]) {
    return translationMap[targetLanguage];
  }
  
  // If no translation available, add a prefix to show it's translated
  if (targetLanguage !== "English" && targetLanguage !== "all") {
    return `[${targetLanguage}] ${text}`;
  }
  
  return text;
};

export function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [viewArticle, setViewArticle] = useState<Article | null>(null);
  const [editArticle, setEditArticle] = useState<Article | null>(null);
  const [deleteArticle, setDeleteArticle] = useState<Article | null>(null);
  const [translateLanguage, setTranslateLanguage] = useState("all");

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = filterLanguage === "all" || article.language === filterLanguage;
    const matchesStatus = filterStatus === "all" || article.status === filterStatus;
    return matchesSearch && matchesLanguage && matchesStatus;
  });

  // Translate articles if a language is selected
  const translatedArticles = filteredArticles.map(article => {
    if (translateLanguage === "all") {
      return article;
    }
    return {
      ...article,
      title: translateText(article.title, translateLanguage),
      description: translateText(article.description, translateLanguage)
    };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Draft": return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "Scheduled": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleView = (article: Article) => {
    setViewArticle(article);
  };

  const handleEdit = (article: Article) => {
    setEditArticle(article);
  };

  const handleDelete = (article: Article) => {
    setDeleteArticle(article);
  };

  const confirmDelete = () => {
    toast.success(`Article "${deleteArticle?.title}" deleted successfully`);
    setDeleteArticle(null);
  };

  const saveEditedArticle = () => {
    toast.success(`Article updated successfully`, {
      description: "All changes have been saved"
    });
    setEditArticle(null);
  };

  const handleTranslateChange = (language: string) => {
    setTranslateLanguage(language);
    if (language !== "all") {
      toast.info(`Translating all news to ${language}`, {
        description: "News content is being translated in real-time"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Modal */}
      <NewsUploadModal isOpen={showUploadForm} onClose={() => setShowUploadForm(false)} />

      {/* View Article Modal */}
      {viewArticle && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setViewArticle(null)} />
          <Card className="relative w-full max-w-3xl bg-white dark:bg-[#1E1E1E] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#212121] dark:text-white mb-2">
                  {translateLanguage !== "all" ? translateText(viewArticle.title, translateLanguage) : viewArticle.title}
                </h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="text-xs">
                    <Globe size={12} className="mr-1" />
                    {viewArticle.language}
                  </Badge>
                  <Badge className={getStatusColor(viewArticle.status)}>
                    {viewArticle.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {viewArticle.category}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewArticle(null)}
                className="flex-shrink-0"
              >
                <X size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  {viewArticle.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {viewArticle.date}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={14} />
                  {viewArticle.views.toLocaleString()} views
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={14} className="text-[#D32F2F]" />
                {viewArticle.location}
              </div>

              <div className="border-t dark:border-gray-700 pt-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Article Content</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {translateLanguage !== "all" ? translateText(viewArticle.description, translateLanguage) : viewArticle.description}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t dark:border-gray-700">
              <Button
                onClick={() => {
                  setViewArticle(null);
                  setEditArticle(viewArticle);
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Edit size={18} className="mr-2" />
                Edit Article
              </Button>
              <Button
                variant="outline"
                onClick={() => setViewArticle(null)}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Article Modal */}
      {editArticle && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setEditArticle(null)} />
          <Card className="relative w-full max-w-3xl bg-white dark:bg-[#1E1E1E] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#212121] dark:text-white">Edit Article</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditArticle(null)}
              >
                <X size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <Input defaultValue={editArticle.title} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  defaultValue={editArticle.description}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#D32F2F] focus:ring-0 outline-none min-h-[150px] text-base resize-none bg-white dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <Select defaultValue={editArticle.language}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Tamil">Tamil</SelectItem>
                      <SelectItem value="Telugu">Telugu</SelectItem>
                      <SelectItem value="Bengali">Bengali</SelectItem>
                      <SelectItem value="Marathi">Marathi</SelectItem>
                      <SelectItem value="Gujarati">Gujarati</SelectItem>
                      <SelectItem value="Kannada">Kannada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <Select defaultValue={editArticle.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t dark:border-gray-700">
              <Button
                onClick={saveEditedArticle}
                className="flex-1 bg-[#D32F2F] hover:bg-[#B71C1C] text-white"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditArticle(null)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteArticle && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setDeleteArticle(null)} />
          <Card className="relative w-full max-w-md bg-white dark:bg-[#1E1E1E] p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2">
                  Delete Article
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Are you sure you want to delete "<strong>{deleteArticle.title}</strong>"? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={confirmDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteArticle(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#212121] dark:text-white">Content Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage news articles across all languages and locations</p>
        </div>
        <Button 
          className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white"
          onClick={() => setShowUploadForm(true)}
        >
          <Plus size={20} className="mr-2" />
          New Article
        </Button>
      </div>

      {/* Language Translation Selector */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Languages size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-1">
              🌐 Live Translation Engine
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Translate all news articles to any language in real-time
            </p>
          </div>
          <Select value={translateLanguage} onValueChange={handleTranslateChange}>
            <SelectTrigger className="w-48 bg-white dark:bg-gray-800 border-2 border-blue-300 dark:border-blue-700">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Original Language</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Hindi">हिंदी (Hindi)</SelectItem>
              <SelectItem value="Tamil">தமிழ் (Tamil)</SelectItem>
              <SelectItem value="Telugu">తెలుగు (Telugu)</SelectItem>
              <SelectItem value="Bengali">বাংলা (Bengali)</SelectItem>
              <SelectItem value="Marathi">मराठी (Marathi)</SelectItem>
              <SelectItem value="Gujarati">ગુજરાતી (Gujarati)</SelectItem>
              <SelectItem value="Kannada">ಕನ್ನಡ (Kannada)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {translateLanguage !== "all" && (
          <div className="mt-3 px-3 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-300 dark:border-green-700">
            <p className="text-sm text-green-800 dark:text-green-200 font-medium">
              ✓ All articles are now being displayed in {translateLanguage}
            </p>
          </div>
        )}
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Articles</p>
          <p className="text-2xl font-bold text-[#212121] dark:text-white mt-1">45,230</p>
        </Card>
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Published Today</p>
          <p className="text-2xl font-bold text-green-600 mt-1">127</p>
        </Card>
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Drafts</p>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400 mt-1">34</p>
        </Card>
        <Card className="p-4 bg-white dark:bg-[#1E1E1E] border-none shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Scheduled</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">12</p>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search articles by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterLanguage} onValueChange={setFilterLanguage}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="Hindi">Hindi</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Tamil">Tamil</SelectItem>
              <SelectItem value="Telugu">Telugu</SelectItem>
              <SelectItem value="Bengali">Bengali</SelectItem>
              <SelectItem value="Marathi">Marathi</SelectItem>
              <SelectItem value="Gujarati">Gujarati</SelectItem>
              <SelectItem value="Kannada">Kannada</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-2">
            <Filter size={20} />
            More Filters
          </Button>
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="gap-2">
            <Upload size={16} />
            Import
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download size={16} />
            Export
          </Button>
        </div>
      </Card>

      {/* Articles Table */}
      <Card className="bg-white dark:bg-[#1E1E1E] border-none shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Language
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {translatedArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-[#212121] dark:text-white">{article.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">by {article.author}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-xs">
                      {article.language}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {article.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {article.location}
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(article.status)}>
                      {article.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {article.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-blue-50 dark:hover:bg-blue-900"
                        onClick={() => handleView(mockArticles.find(a => a.id === article.id)!)}
                      >
                        <Eye size={16} className="text-blue-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-green-50 dark:hover:bg-green-900"
                        onClick={() => handleEdit(mockArticles.find(a => a.id === article.id)!)}
                      >
                        <Edit size={16} className="text-green-600" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-red-50 dark:hover:bg-red-900"
                        onClick={() => handleDelete(mockArticles.find(a => a.id === article.id)!)}
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t dark:border-gray-700 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {translatedArticles.length} of {mockArticles.length} articles
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm" className="bg-[#D32F2F] text-white">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}