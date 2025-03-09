import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Book, BookOpen, Search, Download, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import gitaData from "../data/updated_file.json";

type ShlokaVerse = [string, string, string, string, string];

type Chapter = {
  chapter: number;
  Shloka: {
    [key: string]: ShlokaVerse;
  };
};

interface ScriptureDisplayProps {
  onVerseChange?: (chapter: string, verse: string) => void;
}

export const ScriptureDisplay = ({ onVerseChange }: ScriptureDisplayProps) => {
  const [chapter, setChapter] = useState("1");
  const [verse, setVerse] = useState("1");
  const [chapterSearch, setChapterSearch] = useState("");
  const [verseSearch, setVerseSearch] = useState("");
  const [currentVerse, setCurrentVerse] = useState({
    sanskrit: "",
    english: "",
    videoId: "",
    startPage: "",
    pdfLink: ""
  });

  const typedGitaData = gitaData as any[] as Chapter[];

  useEffect(() => {
    const selectedChapter = typedGitaData.find(c => c.chapter.toString() === chapter);
    if (selectedChapter?.Shloka?.[verse]) {
      const [sanskrit, english, startPage, videoId, pdfLink] = selectedChapter.Shloka[verse];
      setCurrentVerse({
        sanskrit,
        english,
        videoId,
        startPage, 
        pdfLink
      });
      onVerseChange?.(chapter, verse);
    }
  }, [chapter, verse, onVerseChange]);

  const filteredChapters = typedGitaData.filter(c => 
    c.chapter.toString().includes(chapterSearch)
  );

  const currentChapter = typedGitaData.find(c => c.chapter.toString() === chapter);
  const currentVerses = currentChapter?.Shloka || {};

  const filteredVerses = Object.keys(currentVerses).filter(v =>
    v.includes(verseSearch)
  );

  const handleDownloadPDF = (pdfLink: string) => {
    const link = document.createElement('a');
    link.href = pdfLink;
    link.download = pdfLink;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-[#fff7e0] to-white border-2 border-[#b8860b] shadow-lg rounded-xl h-full ">
      <div className="flex gap-4 mb-4">
        <div className="flex-1 h-[400]">
          <label className="block text-sm font-medium mb-1 flex items-center gap-2">
            <Book className="h-4 w-4" />
            Chapter
          </label>
          <Select value={chapter} onValueChange={setChapter}>
            <SelectTrigger>
              <SelectValue placeholder="Select Chapter" />
            </SelectTrigger>
            <SelectContent>
              <div className="px-2 py-1">
                <div className="flex items-center gap-2 px-2 pb-1 border-b">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search chapter..."
                    value={chapterSearch}
                    onChange={(e) => setChapterSearch(e.target.value)}
                    className="h-7"
                  />
                </div>
              </div>
              {filteredChapters.map((c) => (
                <SelectItem key={c.chapter} value={c.chapter.toString()}>
                  Chapter {c.chapter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 h-[300]">
          <label className="block text-sm font-medium mb-1 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Verse
          </label>
          <Select value={verse} onValueChange={setVerse}>
            <SelectTrigger>
              <SelectValue placeholder="Select Verse" />
            </SelectTrigger>
            <SelectContent>
              <div className="px-2 py-1">
                <div className="flex items-center gap-2 px-2 pb-1 border-b">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search verse..."
                    value={verseSearch}
                    onChange={(e) => setVerseSearch(e.target.value)}
                    className="h-7"
                  />
                </div>
              </div>
              {filteredVerses.map((v) => (
                <SelectItem key={v} value={v}>
                  Verse {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-3">
        <div className="p-3 bg-white rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Book className="h-4 w-4 text-[#8b6914]" />
            Sanskrit
          </h3>
          <p className="text-sm">{currentVerse.sanskrit}</p>
        </div>
        <div className="p-3 bg-white rounded-lg shadow-sm relative">
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={() => handleDownloadPDF(currentVerse.pdfLink)}
              className="p-1.5 hover:bg-[#fff7e0] rounded-full transition-colors"
              title="Download PDF"
            >
              <Download className="h-4 w-4 text-[#8b6914]" />
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="p-1.5 hover:bg-[#fff7e0] rounded-full transition-colors"
                  title="View PDF"
                >
                  <Eye className="h-4 w-4 text-[#8b6914]" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <div className="border-2 border-[#b8860b] rounded-lg p-4 h-[80vh]">
                  <iframe
                    src={`${currentVerse.pdfLink}`}
                    className="w-full h-full"
                    title={`Chapter ${chapter} Verse ${verse} PDF`}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-[#8b6914]" />
            English Translation
          </h3>
          <p className="text-sm pr-20">{currentVerse.english}</p>
        </div>
      </div>
    </Card>
  );
};