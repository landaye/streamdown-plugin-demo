import { useState, useEffect } from 'react'
import { Streamdown, defaultRemarkPlugins, defaultRehypePlugins } from 'streamdown-plugin'

function App() {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    const demoMarkdown = `# Welcome to Streamdown Demo

This is a **streaming** Markdown renderer built with:
- Vite + React 18
- Tailwind CSS 4
- Streamdown

## Features

- ✅ Real-time streaming markdown rendering
- ✅ Support for **bold**, *italic*, and ~~strikethrough~~ text
- ✅ Code blocks with syntax highlighting
- ✅ Lists and headings
- ✅ Links and images

## Example Code

\`\`\`javascript
function hello() {
  console.log("Hello from Streamdown!");
}
\`\`\`

## Installation

\`\`\`bash
npm install streamdown
\`\`\`

## Usage

\`\`\`javascript
import Streamdown from 'streamdown';

function App() {
  return (
    <Streamdown>
      # Hello Streamdown
      This is **markdown** content.
    </Streamdown>
  );
}
\`\`\`

Enjoy using Streamdown! 🎉`

    let index = 0;
    const interval = setInterval(() => {
      if (index < demoMarkdown.length) {
        setMarkdown(prev => prev + demoMarkdown[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="px-[120px] max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Streamdown Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Streaming Markdown Rendering with Vite + React 18 + Tailwind CSS 4
          </p>
        </header>

        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 overflow-hidden">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              Real-time Streaming Demo
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Watch Markdown render as it streams in:
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Streamdown
              shikiTheme={['github-light', 'github-dark']}>
              {markdown}
            </Streamdown>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
          <p>Built with ❤️ using Vite + React 18 + Tailwind CSS 4 + Streamdown</p>
        </footer>
      </div>
    </div>
  )
}

export default App
