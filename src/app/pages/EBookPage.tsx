import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Download, Share2, BookOpen, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, FileText, BookMarked } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { toast } from 'sonner';
import { useEBooks, EBook } from '@/app/contexts/EBookContext';

export default function EBookPage() {
  const navigate = useNavigate();
  const { getPublishedEBooks, updateEBook } = useEBooks();
  const publishedEBooks = getPublishedEBooks();
  const [selectedEbook, setSelectedEbook] = useState<EBook | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState<'flipbook' | 'pdf'>('flipbook');
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<'left' | 'right' | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Touch gesture state for pinch-to-zoom
  const [touchDistance, setTouchDistance] = useState<number | null>(null);
  const [initialZoom, setInitialZoom] = useState(100);

  const handleEbookSelect = (ebook: EBook) => {
    setSelectedEbook(ebook);
    setCurrentPage(1);
    setZoom(100);
    setViewMode(ebook.enableFlipBook ? 'flipbook' : 'pdf');
    // Increment views
    updateEBook(ebook.id, { views: ebook.views + 1 });
  };

  const handleDownload = () => {
    if (selectedEbook) {
      toast.success(`Downloading ${selectedEbook.fileName}...`);
      // In production, trigger actual download
      const link = document.createElement('a');
      link.href = selectedEbook.fileUrl;
      link.download = selectedEbook.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = () => {
    if (selectedEbook) {
      toast.success('Share link copied to clipboard!');
      // In production, implement actual sharing
    }
  };

  const handleNextPage = () => {
    if (selectedEbook && currentPage < selectedEbook.pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 25, 50));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const x1 = e.touches[0].clientX;
      const y1 = e.touches[0].clientY;
      const x2 = e.touches[1].clientX;
      const y2 = e.touches[1].clientY;
      const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      setTouchDistance(distance);
      setInitialZoom(zoom);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && touchDistance !== null) {
      const x1 = e.touches[0].clientX;
      const y1 = e.touches[0].clientY;
      const x2 = e.touches[1].clientX;
      const y2 = e.touches[1].clientY;
      const currentDistance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      const delta = currentDistance - touchDistance;
      setZoom(Math.min(Math.max(initialZoom + delta, 50), 200));
    }
  };

  const handleTouchEnd = () => {
    setTouchDistance(null);
    setInitialZoom(100);
  };

  const handlePageTurn = (direction: 'left' | 'right') => {
    if (selectedEbook) {
      setIsPageTurning(true);
      setTurnDirection(direction);
      setTimeout(() => {
        if (direction === 'left') {
          handlePrevPage();
        } else if (direction === 'right') {
          handleNextPage();
        }
        setIsPageTurning(false);
        setTurnDirection(null);
      }, 500);
    }
  };

  useEffect(() => {
    const currentRef = viewerRef.current;
    if (currentRef) {
      currentRef.addEventListener('touchstart', handleTouchStart);
      currentRef.addEventListener('touchmove', handleTouchMove);
      currentRef.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('touchstart', handleTouchStart);
        currentRef.removeEventListener('touchmove', handleTouchMove);
        currentRef.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [touchDistance, initialZoom]);

  if (selectedEbook) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#121212]">
        {/* Header */}
        <div className="bg-white dark:bg-[#1E1E1E] shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => {
                    setSelectedEbook(null);
                    setCurrentPage(1);
                    setZoom(100);
                  }}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <ArrowLeft size={18} />
                  Back to Library
                </Button>
                <div>
                  <h1 className="text-lg font-bold text-[#212121] dark:text-white">
                    {selectedEbook.title}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedEbook.category} • {selectedEbook.language}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={handleShare} variant="outline" size="sm">
                  <Share2 size={18} className="mr-2" />
                  Share
                </Button>
                <Button onClick={handleDownload} className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white" size="sm">
                  <Download size={18} className="mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Viewer */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {viewMode === 'flipbook' ? (
            // Flip Book View
            <div className="space-y-4">
              {/* Flip Book Controls */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-md p-4 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => handlePageTurn('left')}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                  >
                    <ChevronLeft size={18} className="mr-1" />
                    Previous
                  </Button>
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    Page {currentPage} of {selectedEbook.pages}
                  </span>
                  <Button
                    onClick={() => handlePageTurn('right')}
                    disabled={currentPage === selectedEbook.pages}
                    variant="outline"
                    size="sm"
                  >
                    Next
                    <ChevronRight size={18} className="ml-1" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={handleZoomOut} variant="outline" size="sm">
                    <ZoomOut size={18} />
                  </Button>
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium w-16 text-center">
                    {zoom}%
                  </span>
                  <Button onClick={handleZoomIn} variant="outline" size="sm">
                    <ZoomIn size={18} />
                  </Button>
                  <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>
                  <Button
                    onClick={() => setViewMode('pdf')}
                    variant="outline"
                    size="sm"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <FileText size={18} className="mr-2" />
                    PDF View
                  </Button>
                </div>
              </div>

              {/* Flip Book Viewer */}
              <Card className="bg-white dark:bg-[#1E1E1E] border-none shadow-lg overflow-hidden">
                <div 
                  ref={viewerRef}
                  className="relative min-h-[600px] flex items-center justify-center bg-gray-100 dark:bg-gray-900"
                  onTouchStart={handleTouchStart as any}
                  onTouchMove={handleTouchMove as any}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Simulated Flip Book Effect */}
                  <div 
                    className="relative bg-white shadow-2xl transition-transform duration-500 select-none"
                    style={{ 
                      transform: `scale(${zoom / 100})`,
                      width: '800px',
                      height: '600px'
                    }}
                  >
                    <div className="absolute inset-0 flex">
                      {/* Left Page - Tap to go back */}
                      <div 
                        className="w-1/2 border-r border-gray-300 p-8 bg-gradient-to-r from-white to-gray-50 cursor-pointer hover:bg-gray-100/50 transition-colors relative"
                        onClick={() => currentPage > 1 && handlePageTurn('left')}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <BookOpen size={64} className="text-[#D32F2F] mb-4" />
                          <p className="text-gray-600 text-center font-medium">
                            {selectedEbook.title}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">Page {currentPage * 2 - 1}</p>
                        </div>
                        {/* Page turn animation overlay */}
                        {isPageTurning && turnDirection === 'left' && (
                          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20 animate-pulse"></div>
                        )}
                        {/* Tap hint */}
                        {currentPage > 1 && (
                          <div className="absolute bottom-4 left-4 text-xs text-gray-400 flex items-center gap-1">
                            <ChevronLeft size={14} />
                            Tap to go back
                          </div>
                        )}
                      </div>
                      
                      {/* Right Page - Tap to go forward */}
                      <div 
                        className="w-1/2 p-8 bg-gradient-to-l from-white to-gray-50 cursor-pointer hover:bg-gray-100/50 transition-colors relative"
                        onClick={() => currentPage < selectedEbook.pages && handlePageTurn('right')}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <BookOpen size={64} className="text-[#D32F2F] mb-4" />
                          <p className="text-gray-600 text-center font-medium">
                            {selectedEbook.title}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">Page {currentPage * 2}</p>
                        </div>
                        {/* Page turn animation overlay */}
                        {isPageTurning && turnDirection === 'right' && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 animate-pulse"></div>
                        )}
                        {/* Tap hint */}
                        {currentPage < selectedEbook.pages && (
                          <div className="absolute bottom-4 right-4 text-xs text-gray-400 flex items-center gap-1">
                            Tap for next
                            <ChevronRight size={14} />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Shadow effect in the middle */}
                    <div className="absolute inset-y-0 left-1/2 w-1 bg-gradient-to-r from-black/10 to-transparent -translate-x-1/2 pointer-events-none"></div>
                  </div>
                  
                  {/* Info overlay */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
                    <BookMarked size={20} />
                    <span className="font-medium">Flip Book Mode • Pinch to Zoom</span>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            // Standard PDF View
            <div className="space-y-4">
              {/* PDF Controls */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-md p-4 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    PDF Mode - Scroll to navigate
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={handleZoomOut} variant="outline" size="sm">
                    <ZoomOut size={18} />
                  </Button>
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium w-16 text-center">
                    {zoom}%
                  </span>
                  <Button onClick={handleZoomIn} variant="outline" size="sm">
                    <ZoomIn size={18} />
                  </Button>
                  <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>
                  <Button
                    onClick={() => setViewMode('flipbook')}
                    variant="outline"
                    size="sm"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <BookMarked size={18} className="mr-2" />
                    Flip Book View
                  </Button>
                </div>
              </div>

              {/* PDF Viewer */}
              <Card className="bg-white dark:bg-[#1E1E1E] border-none shadow-lg overflow-hidden">
                <div 
                  ref={pdfContainerRef}
                  className="relative overflow-auto max-h-[800px]"
                  onTouchStart={handleTouchStart as any}
                  onTouchMove={handleTouchMove as any}
                  onTouchEnd={handleTouchEnd}
                  style={{ 
                    touchAction: 'pan-y pinch-zoom'
                  }}
                >
                  {/* Simulated PDF Pages - Single column, scrollable */}
                  <div 
                    className="space-y-4 p-4"
                    style={{ 
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: 'top center',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    {Array.from({ length: selectedEbook.pages }).map((_, index) => (
                      <div 
                        key={index}
                        className="bg-white shadow-lg mx-auto"
                        style={{ 
                          width: '800px',
                          height: '1000px',
                          maxWidth: '100%'
                        }}
                      >
                        <div className="flex flex-col items-center justify-center h-full border border-gray-200">
                          <FileText size={64} className="text-[#D32F2F] mb-4" />
                          <p className="text-gray-600 text-center font-medium px-8">
                            {selectedEbook.title}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">Page {index + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Info overlay */}
                  <div className="sticky bottom-8 left-1/2 -translate-x-1/2 mx-auto w-fit bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
                    <FileText size={20} />
                    <span className="font-medium">PDF Mode • Scroll & Pinch to Zoom</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  }

  // E-Book Library View
  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#121212] pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/home')}
                variant="outline"
                size="sm"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-[#212121] dark:text-white">
                  E-Book Library
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Digital publications and magazines
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* E-Books Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedEBooks.map((ebook) => (
            <Card
              key={ebook.id}
              className="bg-white dark:bg-[#1E1E1E] border-none shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => handleEbookSelect(ebook)}
            >
              {/* Cover Image */}
              <div className="relative h-80 bg-gray-200">
                <img
                  src={ebook.coverImage}
                  alt={ebook.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {ebook.enableFlipBook && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <BookOpen size={14} />
                    FLIP BOOK
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <span className="px-2 py-1 bg-[#D32F2F] text-white text-xs font-medium rounded">
                    {ebook.language}
                  </span>
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded">
                    {ebook.pages} pages
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-[#212121] dark:text-white line-clamp-2 mb-2">
                  {ebook.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                  {ebook.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{ebook.fileSize}</span>
                  <span>{ebook.category}</span>
                </div>

                <Button className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white">
                  <BookOpen size={18} className="mr-2" />
                  Read Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {publishedEBooks.length === 0 && (
          <div className="text-center py-20">
            <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-[#212121] dark:text-white mb-2">
              No E-Books Available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back later for new publications
            </p>
          </div>
        )}
      </div>
    </div>
  );
}