import AppLayout from '@/layouts/app-layout';
import { usePage, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface Activity {
  activity_id: number;
  activity_name: string;
  description?: string;
  localisation: string;
}

const emptyForm = {
  activity_name: '',
  description: '',
  localisation: '',
};

export default function Activities() {
  const { activities = [] } = usePage().props;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleOpenAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setEditId(null);
    setOpen(true);
  };

  const handleOpenEdit = (activity: Activity) => {
    setForm({
      activity_name: activity.activity_name,
      description: activity.description ?? '',
      localisation: activity.localisation,
    });
    setIsEdit(true);
    setEditId(activity.activity_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(emptyForm);
    setIsEdit(false);
    setEditId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && editId !== null) {
      router.put(`/activities/${editId}`, form, {
        onSuccess: handleClose,
      });
    } else {
      router.post('/activities', form, {
        onSuccess: handleClose,
      });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      router.delete(`/activities/${id}`);
    }
  };

  const activityList: Activity[] = Array.isArray(activities) ? activities : [];

  return (
    <AppLayout breadcrumbs={[{ title: 'Activities', href: '/activities' }]}>
      <Card className="p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Activities</h1>
          <Button onClick={handleOpenAdd}>Add Activity</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm rounded-lg">
            <thead className="bg-gray-100 dark:bg-neutral-800">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Name</th>
                <th className="px-4 py-2 text-left font-semibold">Localisation</th>
                <th className="px-4 py-2 text-left font-semibold">Description</th>
                <th className="px-4 py-2 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activityList.map((activity) => (
                <tr
                  key={activity.activity_id}
                  className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700"
                >
                  <td className="px-4 py-2">{activity.activity_name}</td>
                  <td className="px-4 py-2">{activity.localisation}</td>
                  <td className="px-4 py-2">{activity.description ?? '-'}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleOpenEdit(activity)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(activity.activity_id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Update Activity' : 'Add Activity'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="activity_name">Activity Name</Label>
              <Input
                id="activity_name"
                name="activity_name"
                value={form.activity_name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="localisation">Localisation</Label>
              <Input
                id="localisation"
                name="localisation"
                value={form.localisation}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                maxLength={200}
                className="w-full rounded border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">{isEdit ? 'Update' : 'Add'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
