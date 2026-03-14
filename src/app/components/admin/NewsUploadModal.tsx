import { useState } from "react";
import { Camera, Video, X, MapPin, CheckCircle2, Image as ImageIcon, Send, FileImage, Film, PlayCircle, Images, DollarSign, BookOpen, FileText } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

interface NewsUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { step: 1, title: "Select Type" },
  { step: 2, title: "Upload Media" },
  { step: 3, title: "Add Details" },
  { step: 4, title: "Review & Publish" },
];

const contentTypes = [
  {
    id: "standard",
    name: "Standard",
    subtitle: "Image/Video + Text",
    icon: FileImage,
    color: "from-red-50 to-pink-50",
    borderColor: "border-red-200",
    iconColor: "text-red-500",
    description: "Image or video with text description (42% media, 52% text)"
  },
  {
    id: "video-text",
    name: "Video + Text",
    subtitle: "Video with text",
    icon: Film,
    color: "from-blue-50 to-blue-50",
    borderColor: "border-gray-200",
    iconColor: "text-red-500",
    description: "Video content with accompanying text description"
  },
  {
    id: "full-video",
    name: "Full Video",
    subtitle: "100% Video",
    icon: PlayCircle,
    color: "from-gray-50 to-gray-50",
    borderColor: "border-gray-200",
    iconColor: "text-red-500",
    description: "Full screen video content without text"
  },
  {
    id: "photo-gallery",
    name: "Photo Gallery",
    subtitle: "Up to 8 photos",
    icon: Images,
    color: "from-gray-50 to-gray-50",
    borderColor: "border-gray-200",
    iconColor: "text-red-500",
    description: "Multiple images in a gallery format"
  },
  {
    id: "sponsored-ad",
    name: "Sponsored Ad",
    subtitle: "Full screen ad",
    icon: DollarSign,
    color: "from-gray-50 to-gray-50",
    borderColor: "border-gray-200",
    iconColor: "text-yellow-500",
    description: "Sponsored advertisement content"
  },
  {
    id: "ebook",
    name: "E-book",
    subtitle: "Digital e-book",
    icon: BookOpen,
    color: "from-gray-50 to-gray-50",
    borderColor: "border-gray-200",
    iconColor: "text-red-500",
    description: "Digital book or magazine content"
  },
];

export function NewsUploadModal({ isOpen, onClose }: NewsUploadModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedContentType, setSelectedContentType] = useState("standard");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    language: "English",
    category: "Politics",
    status: "Draft"
  });

  if (!isOpen) return null;

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setMediaFiles([...mediaFiles, ...files]);
      toast.success(`${files.length} file(s) added`);
    }
  };

  const removeMedia = (index: number) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedContentType) {
      toast.error("Please select a content type");
      return;
    }
    if (currentStep === 2 && mediaFiles.length === 0) {
      toast.error("Please upload at least one photo or video");
      return;
    }
    if (currentStep === 3) {
      if (!formData.title || !formData.description || !formData.location) {
        toast.error("Please fill all required fields");
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      handleClose();
    }
  };

  const handleSubmit = () => {
    const statusText = formData.status === "Published" ? "published" : "saved as draft";
    toast.success(`News article ${statusText} successfully!`, {
      description: formData.status === "Published" ? "Your article is now live." : "You can publish it later.",
    });
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setMediaFiles([]);
    setFormData({
      title: "",
      description: "",
      location: "",
      language: "English",
      category: "Politics",
      status: "Draft"
    });
    onClose();
  };

  const getMediaIcon = (file: File) => {
    if (file.type.startsWith("video/")) {
      return <Video className="h-4 w-4 text-red-500" />;
    }
    return <ImageIcon className="h-4 w-4 text-blue-500" />;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
      {/* Upload Panel - relative positioning to be above backdrop */}
      <div className="relative z-10 w-full max-w-4xl bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white px-6 py-5 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">📰 Create New Article</h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2">
            {steps.map((s) => (
              <div key={s.step} className="flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      currentStep >= s.step
                        ? "bg-white text-[#D32F2F]"
                        : "bg-white/20 text-white/50"
                    }`}
                  >
                    {currentStep > s.step ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      s.step
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p className={`text-xs ${currentStep >= s.step ? "text-white" : "text-white/50"}`}>
                      {s.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Select Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upload Content</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Create and publish content with multiple format options
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Select Content Type</h4>

                {/* Content Type Grid */}
                <div className="grid grid-cols-2 gap-4 max-h-[280px] overflow-y-auto pr-2">
                  {contentTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = selectedContentType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => {
                          setSelectedContentType(type.id);
                          toast.success(`${type.name} selected`);
                        }}
                        className={`relative p-5 rounded-2xl border-2 transition-all hover:scale-105 active:scale-95 ${
                          isSelected
                            ? "border-red-400 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-red-200 dark:hover:border-red-400"
                        }`}
                      >
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Icon className={`h-10 w-10 ${type.iconColor}`} />
                          <div className="text-center">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{type.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{type.subtitle}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Scroll Indicator */}
                <div className="text-center mt-3">
                  <p className="text-xs text-gray-500">↓ Scroll down to see all 6 options ↓</p>
                </div>
              </div>

              {/* Selected Type Description */}
              {selectedContentType && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">
                      {contentTypes.find(t => t.id === selectedContentType)?.name} News:
                    </span>{" "}
                    {contentTypes.find(t => t.id === selectedContentType)?.description}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Upload Media */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {selectedContentType === 'ebook' ? 'Upload E-book' : 'Upload Photos or Videos'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedContentType === 'ebook' 
                  ? 'Upload PDF file for your e-book (required)'
                  : 'Add media to your news article (required)'
                }
              </p>

              {/* Upload Buttons */}
              {selectedContentType === 'ebook' ? (
                // E-book PDF Upload
                <label className="relative group cursor-pointer block">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleMediaChange}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-purple-300 rounded-2xl p-8 text-center bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all group-hover:border-purple-500 group-hover:scale-105">
                    <FileText className="h-16 w-16 mx-auto mb-3 text-purple-600" />
                    <p className="text-lg font-bold text-purple-700">Upload PDF E-book</p>
                    <p className="text-sm text-purple-600 mt-2">Click to select PDF file</p>
                    <p className="text-xs text-gray-500 mt-2">Supported format: PDF</p>
                  </div>
                </label>
              ) : (
                // Standard Photo/Video Uploads
                <div className="grid grid-cols-2 gap-3">
                  {/* Photo Upload */}
                  <label className="relative group cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMediaChange}
                      className="hidden"
                      multiple
                    />
                    <div className="border-2 border-dashed border-blue-300 rounded-2xl p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all group-hover:border-blue-500 group-hover:scale-105">
                      <Camera className="h-12 w-12 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm font-bold text-blue-700">Photos</p>
                      <p className="text-xs text-blue-600 mt-1">JPG, PNG</p>
                    </div>
                  </label>

                  {/* Video Upload */}
                  <label className="relative group cursor-pointer">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleMediaChange}
                      className="hidden"
                      multiple
                    />
                    <div className="border-2 border-dashed border-red-300 rounded-2xl p-6 text-center bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 transition-all group-hover:border-red-500 group-hover:scale-105">
                      <Video className="h-12 w-12 mx-auto mb-2 text-red-600" />
                      <p className="text-sm font-bold text-red-700">Videos</p>
                      <p className="text-xs text-red-600 mt-1">MP4, MOV</p>
                    </div>
                  </label>
                </div>
              )}

              {/* Selected Files */}
              {mediaFiles.length > 0 && (
                <div className="mt-6 space-y-2">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    {mediaFiles.length} file(s) selected
                  </p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {mediaFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700"
                      >
                        {getMediaIcon(file)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate dark:text-white">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={() => removeMedia(index)}
                          className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors flex-shrink-0"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Add Details */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add Article Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Language */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Language *
                  </label>
                  <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Telugu">Telugu</SelectItem>
                      <SelectItem value="Tamil">Tamil</SelectItem>
                      <SelectItem value="Bengali">Bengali</SelectItem>
                      <SelectItem value="Marathi">Marathi</SelectItem>
                      <SelectItem value="Gujarati">Gujarati</SelectItem>
                      <SelectItem value="Kannada">Kannada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Politics">Politics</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Weather">Weather</SelectItem>
                      <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Article Headline *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter a compelling headline..."
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#D32F2F] focus:ring-0 outline-none text-base bg-white dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the news story in detail..."
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#D32F2F] focus:ring-0 outline-none min-h-[150px] text-base resize-none bg-white dark:bg-gray-800 dark:text-white"
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">
                    {formData.description.length}/1000 characters
                  </span>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#D32F2F]" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, State (e.g., Mumbai, Maharashtra)"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#D32F2F] focus:ring-0 outline-none text-base bg-white dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Publish */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Review & Publish</h3>

              {/* Status Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Publication Status *
                </label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Save as Draft</SelectItem>
                    <SelectItem value="Published">Publish Now</SelectItem>
                    <SelectItem value="Scheduled">Schedule for Later</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Summary Cards */}
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Media Files</p>
                  <p className="text-base text-gray-900 dark:text-white">{mediaFiles.length} files uploaded</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Details</p>
                  <div className="space-y-1 text-sm dark:text-gray-300">
                    <p><span className="font-medium">Language:</span> {formData.language}</p>
                    <p><span className="font-medium">Category:</span> {formData.category}</p>
                    <p><span className="font-medium">Location:</span> {formData.location}</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Headline</p>
                  <p className="text-base text-gray-900 dark:text-white">{formData.title}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</p>
                  <p className="text-base text-gray-900 dark:text-white">{formData.description}</p>
                </div>
              </div>

              {/* Info Notice */}
              {formData.status === "Published" && (
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-4">
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
                    ✓ Ready to Publish
                  </p>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    This article will be published immediately and visible to all users.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex-shrink-0 p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex gap-3">
          <button
            onClick={handleBack}
            className="flex-1 py-3 px-6 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            {currentStep === 1 ? "Cancel" : "Back"}
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="flex-1 py-3 px-6 bg-[#D32F2F] text-white rounded-xl font-semibold hover:bg-[#B71C1C] transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 px-6 bg-[#D32F2F] text-white rounded-xl font-semibold hover:bg-[#B71C1C] transition-colors flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              {formData.status === "Published" ? "Publish Now" : "Save Article"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}