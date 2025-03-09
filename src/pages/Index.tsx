import React, { useState, useEffect } from 'react';
import { ScriptureDisplay } from '../components/ScriptureDisplay';
import { GitaChatbot } from '../components/GitaChatbot';
import WelcomeLoader from '../components/WelcomeLoader';
import { Card } from "@/components/ui/card";
import { Video } from "lucide-react";
import gitaData from "../data/gita.json";

// Main page component
const Index = () => {
  const [loading, setLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState('1');
  const [currentVerse, setCurrentVerse] = useState('1');
  const [currentVerseData, setCurrentVerseData] = useState({
    sanskrit: "",
    english: "",
    videoId: "",
    startPage: "",
  });

  // Handle when loading is complete
  const handleLoadComplete = () => {
    setLoading(false);
  };

  // Initialize verse data
  useEffect(() => {
    // Set initial verse on component mount
    const initialChapter = gitaData[0];
    if (initialChapter?.Shloka?.["47"]) {
      const [sanskrit, english, startPage, videoId] = initialChapter.Shloka["47"];
      setCurrentVerseData({ sanskrit, english, videoId, startPage });
      setCurrentChapter('1');
      setCurrentVerse('47');
    }
  }, []);

  // Handle verse changes
  const handleVerseChange = (chapter, verse) => {
    setCurrentChapter(chapter);
    setCurrentVerse(verse);
    
    // Update verse data from gitaData
    const selectedChapter = gitaData.find((c) => c.chapter.toString() === chapter);
    if (selectedChapter?.Shloka?.[verse]) {
      const [sanskrit, english, startPage, videoId] = selectedChapter.Shloka[verse];
      setCurrentVerseData({ sanskrit, english, videoId, startPage });
    }
  };

  return (
    <>
      {loading ? (
        <WelcomeLoader onLoadComplete={handleLoadComplete} />
      ) : (
        <div className="min-h-screen p-3 sm:p-6"
             style={{
               background: `
                 linear-gradient(rgba(255, 224, 178, 0.3), rgba(139, 105, 20, 0.4)),
                 url('/images/gita-background.jpg')
               `,
               backgroundSize: "cover",
               backgroundPosition: "center",
               backgroundAttachment: "fixed",
               backgroundColor: "#FFE0B2", // Fallback color
             }}>
          {/* Decorative elements for visual impact */}
          <div className="fixed inset-0 z-0 opacity-30">
            <div className="absolute top-0 right-0 w-1/3 h-1/3" 
                 style={{
                   background: "radial-gradient(circle at top right, rgba(255, 215, 0, 0.3), transparent 70%)"
                 }}></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2" 
                 style={{
                   background: "radial-gradient(circle at bottom left, rgba(139, 105, 20, 0.3), transparent 70%)"
                 }}></div>
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            {/* Header with premium decorative elements */}
            <header className="text-center mb-4 sm:mb-8 relative">
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#8b6914] to-transparent"></div>
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#8b6914] to-transparent"></div>
              <div className="py-4 sm:py-6">
                {/* Responsive title size */}
                <h1 className="text-3xl sm:text-5xl font-serif text-[#8b6914] drop-shadow-lg mb-1 sm:mb-2 font-bold">
                  भगवद्गीता
                </h1>
                <p className="text-xl sm:text-2xl font-serif text-[#8b6914]/80">Bhagavad Gita Dashboard</p>
              </div>
            </header>
            
            {/* Main Dashboard with improved responsiveness */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
              {/* Scripture Display on the left (2 columns) */}
              <div className="md:col-span-2">
                <div className="backdrop-blur-sm bg-[#fff7e0]/90 p-4 sm:p-6 rounded-xl border-2 border-[#b8860b] shadow-xl mb-4 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-serif text-[#8b6914] mb-3 sm:mb-4 flex items-center">
                    <span className="hidden sm:inline-block w-8 h-0.5 bg-[#8b6914] mr-3"></span>
                    Sacred Scripture
                    <span className="hidden sm:inline-block w-8 h-0.5 bg-[#8b6914] ml-3"></span>
                  </h2>
                  <ScriptureDisplay onVerseChange={handleVerseChange} />
                </div>
                
                {/* Chatbot below Scripture Display */}
                <div className="backdrop-blur-sm bg-[#fff7e0]/90 p-4 sm:p-6 rounded-xl border-2 border-[#b8860b] shadow-xl">
                  <h2 className="text-xl sm:text-2xl font-serif text-[#8b6914] mb-3 sm:mb-4 flex items-center">
                    <span className="hidden sm:inline-block w-8 h-0.5 bg-[#8b6914] mr-3"></span>
                    Gita Guide
                    <span className="hidden sm:inline-block w-8 h-0.5 bg-[#8b6914] ml-3"></span>
                  </h2>
                  <GitaChatbot />
                </div>
              </div>
              
              {/* Video Component on the right - ENLARGED and ENHANCED */}
              <div className="flex flex-col gap-4 sm:gap-6">
                {currentVerseData.videoId && (
                  <Card className="bg-gradient-to-br from-[#fff7e0] to-white border-2 border-[#b8860b] shadow-xl rounded-xl overflow-hidden h-full">
                    <div className="p-3 sm:p-4">
                      <h2 className="text-xl sm:text-2xl font-serif text-[#8b6914] mb-3 sm:mb-4 flex items-center">
                        <span className="hidden sm:inline-block w-6 h-0.5 bg-[#8b6914] mr-3"></span>
                        Sacred Chanting
                        <span className="hidden sm:inline-block w-6 h-0.5 bg-[#8b6914] ml-3"></span>
                      </h2>
                      
                      {/* Video container with enhanced styling */}
                      <div className="relative w-full bg-black rounded-lg overflow-hidden border-2 border-[#b8860b]" 
                           style={{ 
                             aspectRatio: '16/20',
                             boxShadow: '0 10px 25px -5px rgba(139, 105, 20, 0.3)' 
                           }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-10"></div>
                        
                        {/* Decorative corners for the video */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4b760] opacity-60"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#d4b760] opacity-60"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#d4b760] opacity-60"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4b760] opacity-60"></div>
                        
                        {/* Video title with premium styling */}
                        <h3 className="absolute top-3 left-3 z-20 font-semibold flex items-center gap-2 bg-[#8b6914] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm shadow-lg">
                          <Video className="h-3 w-3 sm:h-4 sm:w-4" />
                          Chapter {currentChapter} • Verse {currentVerse}
                        </h3>
                        
                        {/* Video iframe */}
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${currentVerseData.videoId}?rel=0&showinfo=0&controls=1`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                    
                    {/* Additional informational content below video */}
                    <div className="p-3 sm:p-4 border-t border-[#d4b760]">
                      <p className="text-xs sm:text-sm text-[#8b6914]/80 italic">
                        Listen to the sacred verses being chanted in the traditional Sanskrit pronunciation. The rhythmic recitation helps in understanding the vibration and energy of the ancient text.
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
            
            {/* Footer with premium styling */}
            <footer className="mt-8 sm:mt-12 text-center text-[#8b6914]/70">
              <div className="h-0.5 bg-gradient-to-r from-transparent via-[#b8860b] to-transparent mb-4 sm:mb-6"></div>
              <p className="text-xs sm:text-sm">
                "Wherever Krishna is, wherever Arjuna is, there will surely be prosperity, victory, happiness, and sound policy."
              </p>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;