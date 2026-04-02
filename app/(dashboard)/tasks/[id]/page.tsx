'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { showToast } from '@/components/ui/Toast';

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<any>(null);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/tasks/${id}`).then(res => res.json()).then(setTask);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/tasks/${id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissionUrl })
    });
    if (res.ok) {
      showToast.success('Task submitted for review');
      router.push('/tasks');
    } else {
      const data = await res.json();
      showToast.error(data.error || 'Submission failed');
    }
    setLoading(false);
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
        <p className="text-gray-400 mb-4">{task.description}</p>
        <p className="text-purple-400 font-bold mb-6">Reward: {task.reward} BDT</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="url" placeholder="Link to your work (Google Drive, YouTube, etc.)" value={submissionUrl} onChange={(e) => setSubmissionUrl(e.target.value)} required />
          <Button type="submit" disabled={loading} className="w-full">{loading ? 'Submitting...' : 'Submit for Review'}</Button>
        </form>
      </Card>
    </div>
  );
}
