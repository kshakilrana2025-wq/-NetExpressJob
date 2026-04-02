'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { showToast } from '@/components/ui/Toast';

export default function AdminSettings() {
  const [settings, setSettings] = useState({ activationFee: 500, paymentVerificationMode: 'manual', referralRegistrationBonus: 1, referralActivationBonus: 150 });
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    fetch('/api/admin/settings').then(res => res.json()).then(setSettings);
    fetch('/api/admin/payment-methods').then(res => res.json()).then(setPaymentMethods);
  }, []);

  const updateSettings = async () => {
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (res.ok) showToast.success('Settings updated');
  };

  const updatePaymentMethod = async (method: any) => {
    const res = await fetch('/api/admin/payment-methods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(method)
    });
    if (res.ok) showToast.success(`${method.name} updated`);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">System Settings</h1>
      <Card>
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Activation Fee (BDT)</label>
            <Input type="number" value={settings.activationFee} onChange={(e) => setSettings({ ...settings, activationFee: parseInt(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm mb-1">Payment Verification Mode</label>
            <select className="w-full bg-gray-700 p-2 rounded" value={settings.paymentVerificationMode} onChange={(e) => setSettings({ ...settings, paymentVerificationMode: e.target.value as any })}>
              <option value="manual">Manual</option>
              <option value="api">API (Auto)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Referral Registration Bonus (BDT)</label>
            <Input type="number" value={settings.referralRegistrationBonus} onChange={(e) => setSettings({ ...settings, referralRegistrationBonus: parseInt(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm mb-1">Referral Activation Bonus (BDT)</label>
            <Input type="number" value={settings.referralActivationBonus} onChange={(e) => setSettings({ ...settings, referralActivationBonus: parseInt(e.target.value) })} />
          </div>
        </div>
        <Button onClick={updateSettings} className="mt-4">Save Settings</Button>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
        {paymentMethods.map((method: any) => (
          <div key={method.name} className="border-b border-gray-700 py-4">
            <h3 className="text-lg font-semibold">{method.name}</h3>
            <div className="grid md:grid-cols-3 gap-4 mt-2">
              <Input label="Number" value={method.number} onChange={(e) => setPaymentMethods(prev => prev.map(m => m.name === method.name ? { ...m, number: e.target.value } : m))} />
              <div>
                <label className="block text-sm">Mode</label>
                <select className="w-full bg-gray-700 p-2 rounded" value={method.mode} onChange={(e) => setPaymentMethods(prev => prev.map(m => m.name === method.name ? { ...m, mode: e.target.value } : m))}>
                  <option value="sandbox">Sandbox</option>
                  <option value="live">Live</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={method.isActive} onChange={(e) => setPaymentMethods(prev => prev.map(m => m.name === method.name ? { ...m, isActive: e.target.checked } : m))} />
                  Active
                </label>
              </div>
            </div>
            <Button onClick={() => updatePaymentMethod(method)} className="mt-2">Update {method.name}</Button>
          </div>
        ))}
      </Card>
    </div>
  );
}
