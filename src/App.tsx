import { useState, useEffect, useCallback } from 'react'
import { nepaliConverter, ConversionMode } from './utils/nepaliConverter'

function App() {
  const [romanizedText, setRomanizedText] = useState('')
  const [nepaliText, setNepaliText] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [mode, setMode] = useState<ConversionMode>('simplified')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleTextChange = useCallback((text: string) => {
    setRomanizedText(text)
    setIsTyping(text.length > 0)
    setNepaliText(nepaliConverter.convert(text, mode))
  }, [mode])

  // Re-convert when mode changes
  useEffect(() => {
    if (romanizedText) {
      setNepaliText(nepaliConverter.convert(romanizedText, mode))
    }
  }, [mode, romanizedText])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(nepaliText)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      // ignore
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 ${isDarkMode ? 'dark' : ''}`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-violet-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <header className="relative w-full header-glass backdrop-blur-xl border-b border-white/20 dark:border-slate-700/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src="/nepal-flag.svg" alt="Nepali Unicode" className="w-12 h-12 icon-glow floating-animation" />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient tracking-tight">Nepali Unicode</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Romanized to Unicode Converter</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 dark:border-slate-700/30">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Mode:</span>
              <button
                className={`mode-button px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'simplified'
                    ? 'active bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white/70 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-600 hover:scale-105'
                  }`}
                onClick={() => setMode('simplified')}
              >
                ✨ Simple
              </button>
              <button
                className={`mode-button px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'traditional'
                    ? 'active bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white/70 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-600 hover:scale-105'
                  }`}
                onClick={() => setMode('traditional')}
              >
                🎯 Traditional
              </button>
            </div>
            <button
              className="rounded-full px-4 py-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 text-slate-600 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => setIsDarkMode(d => !d)}
              aria-label="Toggle dark mode"
            >
              <span className="text-xl">{isDarkMode ? '🌙' : '☀️'}</span>
            </button>
          </div>
        </div>
      </header>
      <main className="relative max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h1 className="text-5xl sm:text-6xl font-bold text-gradient mb-6 tracking-tight">
              Transform Your Words
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl animate-pulse"></div>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Convert Romanized Nepali to beautiful Unicode script instantly.
            <br />
            <span className="font-semibold text-gradient">Simple, fast, and accurate.</span>
          </p>

          {/* Mode Explanation Card */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="mode-explanation-card bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30 shadow-xl">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${mode === 'simplified' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-slate-300 dark:bg-slate-600'} animate-pulse`}></div>
                <h3 className="text-lg font-bold">
                  {mode === 'simplified' ? '✨ Simple Mode Active' : '🎯 Traditional Mode Active'}
                </h3>
                <div className={`w-3 h-3 rounded-full ${mode === 'traditional' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-slate-300 dark:bg-slate-600'} animate-pulse`}></div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {mode === 'simplified' ? (
                  <>
                    🔸 <strong className="text-blue-600 dark:text-blue-400">Flexible typing:</strong> Both "nam" and "naam" convert to नाम
                    <br />
                    Perfect for casual typing and natural phonetic input
                  </>
                ) : (
                  <>
                    🔹 <strong className="text-purple-600 dark:text-purple-400">Precise conversion:</strong> "naam" → नाम, "nam" → नम्
                    <br />
                    Ideal for academic work and precise vowel length control
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Converter Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Card */}
          <div className="converter-card group">
            <div className="card-header">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Romanized Input</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Type in English letters</p>
                </div>
              </div>
            </div>
            <textarea
              id="romanized"
              value={romanizedText}
              onChange={e => handleTextChange(e.target.value)}
              placeholder="Type here... (e.g. namaste, dhanyabad, mero naam)"
              className="w-full h-48 p-4 border-0 rounded-xl bg-slate-50/70 dark:bg-slate-700/70 backdrop-blur-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-0 resize-none transition-all duration-300 text-lg leading-relaxed"
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <div className={`w-2 h-2 rounded-full ${isTyping ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span>{isTyping ? 'Converting...' : 'Ready to convert'}</span>
              </div>
            </div>
          </div>

          {/* Output Card */}
          <div className="converter-card group">
            <div className="card-header">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg nepali-text">अ</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Unicode Output</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Beautiful Nepali script</p>
                </div>
              </div>
            </div>
            <textarea
              id="unicode"
              value={nepaliText}
              readOnly
              placeholder="Unicode output will appear here..."
              className="w-full h-48 p-4 border-0 rounded-xl bg-slate-50/70 dark:bg-slate-700/70 backdrop-blur-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none nepali-text text-2xl leading-relaxed"
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${nepaliText ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span>{nepaliText ? `${nepaliText.length} characters` : 'Ready to convert'}</span>
                </div>
                {nepaliText && (
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <span>{nepaliText.split(/\s+/).filter(word => word.length > 0).length} words</span>
                  </div>
                )}
              </div>
              <button
                onClick={copyToClipboard}
                disabled={!nepaliText}
                className="copy-button px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
              >
                {copySuccess ? '✅ Copied!' : '📋 Copy Text'}
              </button>
            </div>
          </div>
        </div>
        {/* Examples and Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Quick Examples */}
          <div className="feature-card bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">📝</span>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Try These</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-white/60 dark:bg-slate-700/60 rounded-lg">
                <span className="font-mono text-slate-600 dark:text-slate-300">namaste</span>
                <span className="nepali-text text-lg">→ नमस्ते</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/60 dark:bg-slate-700/60 rounded-lg">
                <span className="font-mono text-slate-600 dark:text-slate-300">dhanyabad</span>
                <span className="nepali-text text-lg">→ धन्यबाद</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/60 dark:bg-slate-700/60 rounded-lg">
                <span className="font-mono text-slate-600 dark:text-slate-300">kathmandu</span>
                <span className="nepali-text text-lg">→ काठमाडौं</span>
              </div>
            </div>
          </div>

          {/* Mode Differences */}
          <div className="feature-card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">⚖️</span>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Mode Examples</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">✨ Simple Mode:</div>
                <div className="bg-white/60 dark:bg-slate-700/60 rounded-lg p-2">
                  <span className="font-mono text-slate-600 dark:text-slate-300">mero nam</span>
                  <span className="nepali-text text-lg"> → मेरो नाम</span>
                </div>
              </div>
              <div>
                <div className="font-semibold text-purple-600 dark:text-purple-400 mb-1">🎯 Traditional:</div>
                <div className="bg-white/60 dark:bg-slate-700/60 rounded-lg p-2">
                  <span className="font-mono text-slate-600 dark:text-slate-300">mero nam</span>
                  <span className="nepali-text text-lg"> → मेरो नम्</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="feature-card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">✨</span>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Features</h3>
            </div>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-green-500">●</span>
                <span>Real-time conversion</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">●</span>
                <span>Two typing modes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-500">●</span>
                <span>Dark/Light themes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500">●</span>
                <span>One-click copy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-indigo-500">●</span>
                <span>Mobile friendly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-full border border-white/20 dark:border-slate-700/30 shadow-lg">
            <span className="text-slate-600 dark:text-slate-400">Made with</span>
            <span className="text-red-500 animate-pulse text-lg">♥</span>
            <span className="text-slate-600 dark:text-slate-400">for Nepali language</span>
          </div>

          {/* Additional Info */}
          <div className="grid sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-slate-700/20">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Conversion Modes</div>
            </div>
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-slate-700/20">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">0ms</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Real-time</div>
            </div>
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-slate-700/20">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">100%</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Accurate</div>
            </div>
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-slate-700/20">
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">Free</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Always</div>
            </div>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Open source • Fast • Accurate • Privacy-focused
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
