'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch('/api/tasks').then(res => res.json()).then(setTasks);
    fetch('/api/tasks?submissions=true').then(res => res.json()).then(setSubmissions);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Available Tasks</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {tasks.map((task: any) => (
          <Card key={task._id}>
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-gray-400 mt-1">{task.description}</p>
            <p className="text-purple-400 font-bold mt-2">Reward: {task.reward} BDT</p>
            <Link href={`/tasks/${task._id}`} className="inline-block mt-4 bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">Submit Work</Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
