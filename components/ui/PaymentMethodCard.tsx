'use client';
import { useState } from 'react';
import { FiCopy, FiCheckCircle } from 'react-icons/fi';

export default function PaymentMethodCard({ method, number, onSelect }: { method: string; number: string; onSelect: (method: string) => void }) {
  const [copied, setCopied] = useState(false);

  const copyNumber = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-4">
      <h3 className="text-xl font-bold mb-2">{method}</h3>
      <div className="flex items-center gap-2 mb-4">
        <code className="bg-gray-700 px-3 py-1 rounded">{number}</code>
        <button onClick={copyNumber} className="text-purple-400 hover:text-purple-300">{copied ? <FiCheckCircle /> : <FiCopy />}</button>
      </div>
      <div className="text-sm text-gray-400 mb-4">
        <p className="font-semibold mb-1">Steps to send money:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Open {method} app</li>
          <li>Click "Send Money"</li>
          <li>Enter number: <span className="text-white">{number}</span></li>
          <li>Enter amount: <span className="text-white">500 BDT</span> (activation fee)</li>
          <li>Confirm and copy Transaction ID</li>
        </ol>
      </div>
      <button onClick={() => onSelect(method)} className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg transition">I have sent money</button>
    </div>
  );
}
