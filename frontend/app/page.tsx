"use client";

import { useState } from "react";

// API URL from environment variable, defaults to localhost for development
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface DataItem {
  id: number;
  name: string;
  description: string;
}

interface ApiResponse {
  items: DataItem[];
}

interface HelloResponse {
  message: string;
  source: string;
}

export default function Home() {
  const [data, setData] = useState<DataItem[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/data`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const result: ApiResponse = await response.json();
      setData(result.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchHello = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/hello?name=Next.js`);
      if (!response.ok) throw new Error("Failed to fetch hello");
      const result: HelloResponse = await response.json();
      setMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            EGREIG-VISTNES.NO
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Next.js Frontend + Flask Backend
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* API Test Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Test Flask Backend Connection
            </h2>
            <div className="flex gap-4 mb-4">
              <button
                onClick={fetchHello}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Say Hello
              </button>
              <button
                onClick={fetchData}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                Fetch Data
              </button>
            </div>

            {loading && (
              <p className="text-gray-500 dark:text-gray-400">Loading...</p>
            )}

            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                <p className="font-medium">Error connecting to backend:</p>
                <p>{error}</p>
                <p className="text-sm mt-2">
                  Make sure the Flask backend is running on {API_URL}
                </p>
              </div>
            )}

            {message && !error && (
              <div className="p-4 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-lg">
                <p className="font-medium">Response:</p>
                <p>{message}</p>
              </div>
            )}

            {data && !error && (
              <div className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
                <p className="font-medium mb-2">Data from API:</p>
                <ul className="list-disc list-inside">
                  {data.map((item) => (
                    <li key={item.id}>
                      {item.name}: {item.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Quick Start Guide */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Start
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  1. Start the Flask Backend
                </h3>
                <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm overflow-x-auto">
                  <code>
                    cd backend{"\n"}
                    pip install -r requirements.txt{"\n"}
                    python app.py
                  </code>
                </pre>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  2. Start the Next.js Frontend
                </h3>
                <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm overflow-x-auto">
                  <code>
                    cd frontend{"\n"}
                    npm install{"\n"}
                    npm run dev
                  </code>
                </pre>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  3. Deploy to Vercel
                </h3>
                <p className="mt-2">
                  The frontend is ready to deploy to Vercel. Just connect your
                  repository and set the root directory to{" "}
                  <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                    frontend
                  </code>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
