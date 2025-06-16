import { motion } from 'framer-motion';
import { HelpCircle, Book, Keyboard, Star } from 'lucide-react';

interface HelpGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpGuide: React.FC<HelpGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const conversionExamples = [
    { romanized: 'namaste', nepali: 'नमस्ते', meaning: 'Hello/Goodbye' },
    { romanized: 'dhanyabad', nepali: 'धन्यबाद', meaning: 'Thank you' },
    { romanized: 'maaf garnuhos', nepali: 'माफ गर्नुहोस्', meaning: 'Excuse me' },
    { romanized: 'kathmandu', nepali: 'काठमाडौं', meaning: 'Kathmandu' },
    { romanized: 'nepal', nepali: 'नेपाल', meaning: 'Nepal' },
    { romanized: 'paanch', nepali: 'पाँच', meaning: 'Five' },
  ];

  const shortcuts = [
    { key: '*', output: 'ँ', description: 'Chandrabindu' },
    { key: '^', output: 'ं', description: 'Anusvara' },
    { key: 'R', output: 'ऋ', description: 'Vocalic R' },
    { key: '<text>', output: 'text', description: 'English text (unchanged)' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto
                   bg-white dark:bg-slate-800 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg
                       border-b border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Help & Guide
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 
                       dark:hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* How to Use */}
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Book className="w-5 h-5 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                How to Use
              </h3>
            </div>
            <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Type Romanized Nepali text in the left input field</li>
                <li>Watch the real-time conversion appear in the right field</li>
                <li>Use the copy button to copy the converted text</li>
                <li>Download the text as a file if needed</li>
                <li>Toggle between light and dark themes</li>
              </ol>
            </div>
          </section>

          {/* Examples */}
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-yellow-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Common Examples
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {conversionExamples.map((example, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 
                           dark:from-blue-900/20 dark:to-purple-900/20 
                           rounded-lg p-4 border border-blue-200/50 
                           dark:border-blue-700/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono bg-white dark:bg-slate-800 
                                   px-2 py-1 rounded text-blue-600 dark:text-blue-400">
                      {example.romanized}
                    </code>
                    <span className="text-sm text-gray-500 dark:text-gray-400">→</span>
                  </div>
                  <div className="text-xl font-serif text-gray-900 dark:text-white mb-1">
                    {example.nepali}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {example.meaning}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Special Characters */}
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Keyboard className="w-5 h-5 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Special Characters & Shortcuts
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 
                           bg-gray-50 dark:bg-slate-700/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <code className="text-sm font-mono bg-white dark:bg-slate-800 
                                   px-2 py-1 rounded text-red-600 dark:text-red-400">
                      {shortcut.key}
                    </code>
                    <span className="text-sm text-gray-500 dark:text-gray-400">→</span>
                    <span className="text-lg font-serif text-gray-900 dark:text-white">
                      {shortcut.output}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {shortcut.description}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section className="bg-gradient-to-r from-green-50 to-emerald-50 
                           dark:from-green-900/20 dark:to-emerald-900/20 
                           rounded-lg p-6 border border-green-200/50 
                           dark:border-green-700/50">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
              💡 Pro Tips
            </h3>
            <ul className="space-y-2 text-green-700 dark:text-green-300">
              <li>• The converter works with most common Nepali words</li>
              <li>• It handles compound consonants and vowel combinations</li>
              <li>• Numbers are automatically converted to Nepali numerals</li>
              <li>• Use proper spelling for better conversion accuracy</li>
              <li>• The app works offline once loaded</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};
