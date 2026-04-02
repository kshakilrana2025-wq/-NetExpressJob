'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { showToast } from '@/components/ui/Toast';

export default function AdminTasks() {
  const [submissions, setSubmissions] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', category: 'video_creation', reward: 0 });

  useEffect(() => {
    fetch('/api/admin/tasks?submissions=true').then(res => res.json()).then(setSubmissions);
  }, []);

  const handleReview = async (id: string, action: 'approve' | 'reject') => {
    const res = await fetch('/api/admin/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissionId: id, action })
    });
    if (res.ok) {
      showToast.success(`Submission ${action}d`);
      setSubmissions(prev => prev.filter((s: any) => s._id !== id));
    }
  };

  const handleCreateTask = async () => {
    const res = await fetch('/api/admin/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    });
    if (res.ok) {
      showToast.success('Task created');
      setNewTask({ title: '', description: '', category: 'video_creation', reward: 0 });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Create New Task</h1>
        <Card>
          <div className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
            <Input placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
            <select className="bg-gray-700 p-2 rounded" value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value as any })}>
              <option value="video_creation">Video Creation</option>
              <option value="video_editing">Video Editing</option>
              <option value="photo_editing">Photo Editing</option>
              <option value="website_design">Website Design</option>
            </select>
            <Input type="number" placeholder="Reward (BDT)" value={newTask.reward} onChange={(e) => setNewTask({ ...newTask, reward: parseInt(e.target.value) })} />
          </div>
          <Button onClick={handleCreateTask} className="mt-4">Create Task</Button>
        </Card>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Pending Submissions</h2>
        <Card>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2">Task</th>
                <th>User</th>
                <th>Submission URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub: any) => (
                <tr key={sub._id} className="border-b border-gray-700">
                  <td className="py-2">{sub.task?.title}</td>
                  <td>{sub.user?.email}</td>
                  <td><a href={sub.submissionUrl} target="_blank" className="text-purple-400">Link</a></td>
                  <td>
                    <button onClick={() => handleReview(sub._id, 'approve')} className="bg-green-600 px-3 py-1 rounded mr-2">Approve</button>
                    <button onClick={() => handleReview(sub._id, 'reject')} className="bg-red-600 px-3 py-1 rounded">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
