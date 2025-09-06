import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2, Plus, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Level {
  level_id: number;
  level_name: string;
  type: string;
}

interface Group {
  group_id: number;
  group_name: string;
  level_id: number;
  level?: Level;
}

const emptyForm = {
  group_name: '',
  level_id: '',
};

export default function ManageGroups() {
  const { groups = [], levels = [] } = usePage().props as {
    groups: Group[];
    levels: Level[];
  };

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleOpen = () => {
    setForm(emptyForm);
    setErrors({});
    setIsEdit(false);
    setEditId(null);
    setOpen(true);
  };

  const handleEdit = (group: Group) => {
    setForm({
      group_name: group.group_name,
      level_id: group.level_id.toString(),
    });
    setIsEdit(true);
    setEditId(group.group_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(emptyForm);
    setErrors({});
    setIsEdit(false);
    setEditId(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const routeName =
      isEdit && editId ? route('groups.update', editId) : route('groups.store');
    const method = isEdit && editId ? 'put' : 'post';

    router[method](routeName, form, {
      onSuccess: () => {
        setLoading(false);
        handleClose();
      },
      onError: (err) => {
        setLoading(false);
        setErrors(err);
      },
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this class?')) return;

    router.delete(route('groups.destroy', id), {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Manage Classes', href: '/groups' }]}>
      <Head title="Manage Classes" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <GraduationCap className="mr-2 text-purple-500" size={32} />
            <h1 className="text-2xl font-bold">Manage Classes</h1>
          </div>
          <Button onClick={handleOpen} className="gap-2">
            <Plus size={18} /> Add Class
          </Button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow border dark:border-gray-700">
          <table className="min-w-full bg-white dark:bg-gray-900">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="px-4 py-2 text-left">Class Name</th>
                <th className="px-4 py-2 text-left">Level</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.length > 0 ? (
                groups.map((group) => (
                  <tr key={group.group_id} className="border-t dark:border-gray-700">
                    <td className="px-4 py-2">{group.group_name}</td>
                    <td className="px-4 py-2">{group.level?.level_name || '-'}</td>
                    <td className="px-4 py-2 text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        className="mr-2"
                        onClick={() => handleEdit(group)}
                      >
                        <Pencil size={18} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(group.group_id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    No classes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEdit ? 'Edit Class' : 'Add Class'}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium" htmlFor="group_name">
                  Class Name
                </label>
                <Input
                  id="group_name"
                  name="group_name"
                  type="text"
                  value={form.group_name}
                  onChange={handleChange}
                  required
                />
                {errors.group_name && (
                  <div className="text-red-500 text-xs mt-1">{errors.group_name[0]}</div>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium" htmlFor="level_id">
                  Level
                </label>
                <select
                  id="level_id"
                  name="level_id"
                  value={form.level_id}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
                  required
                >
                  <option value="">Select a level</option>
                  {levels.map((level) => (
                    <option key={level.level_id} value={level.level_id}>
                      {level.level_name}
                    </option>
                  ))}
                </select>
                {errors.level_id && (
                  <div className="text-red-500 text-xs mt-1">{errors.level_id[0]}</div>
                )}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (isEdit ? 'Saving...' : 'Adding...') : isEdit ? 'Save Changes' : 'Add Class'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
