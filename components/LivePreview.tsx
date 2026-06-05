'use client'

import { useState } from 'react';
import { ExternalLink, RefreshCw, Monitor, Tablet, Smartphone, Maximize2 } from 'lucide-react';

interface LivePreviewProps {
  url: string;
  title: string;
}

const deviceWidths: Record<string, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

export default function LivePreview({ url, title }: LivePreviewProps) {
  const [iframeKey, setIframeKey] = useState(0);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-zinc-700 rounded-xl overflow-hidden bg-zinc-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-800 border-b border-zinc-700">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span className="font-medium text-zinc-300">Preview</span>
          <span className="text-zinc-600">·</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            Open in new tab
          </a>
        </div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setDevice('mobile')}
            title="Mobile view"
            className={`p-1.5 rounded transition-colors ${device === 'mobile' ? 'text-white bg-zinc-600' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Smartphone className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDevice('tablet')}
            title="Tablet view"
            className={`p-1.5 rounded transition-colors ${device === 'tablet' ? 'text-white bg-zinc-600' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Tablet className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDevice('desktop')}
            title="Desktop view"
            className={`p-1.5 rounded transition-colors ${device === 'desktop' ? 'text-white bg-zinc-600' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            onClick={() => setExpanded(e => !e)}
            title="Toggle height"
            className="p-1.5 rounded text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIframeKey(k => k + 1)}
            title="Reload"
            className="p-1.5 rounded text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* iframe */}
      <div
        className="flex justify-center overflow-hidden transition-all duration-300"
        style={{ height: expanded ? '500px' : '280px' }}
      >
        <div
          className="h-full transition-all duration-300 overflow-hidden"
          style={{ width: deviceWidths[device] }}
        >
          <iframe
            key={iframeKey}
            src={url}
            title={`Live preview of ${title}`}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>

      {/* Footer note */}
      <div className="px-3 py-1.5 bg-zinc-800/60 border-t border-zinc-700">
        <p className="text-xs text-zinc-500">
          Note: Some websites may block embedding.{' '}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            If the preview doesn&apos;t load, click &quot;Open in new tab&quot; above.
          </a>
        </p>
      </div>
    </div>
  );
}
