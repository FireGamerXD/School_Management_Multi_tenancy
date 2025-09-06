import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2, Plus, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Level {
  level_id: number;
  level_name: string;
  type: string;
}

const emptyForm = {
  level_name: '',
  type: 'Maternelle',
};

export default function ManageLevels() {
  const { levels = [] } = usePage().props as { levels: Level[] };
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

  const handleEdit = (level: Level) => {
    setForm({ level_name: level.level_name, type: level.type });
    setIsEdit(true);
    setEditId(level.level_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(emptyForm);
    setErrors({});
    setIsEdit(false);
    setEditId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const routeName = isEdit && editId ? route('levels.update', editId) : route('levels.store');

    const method = isEdit && editId ? 'put' : 'post';

    router[method](routeName, form, {
      onSuccess: () => {
        setLoading(false);
        handleClose();
      },
      onError: (err) => {
        setLoading(false);
        // setErrors(err);
      },
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this level?')) return;

    router.delete(route('levels.destroy', id), {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Manage Levels', href: '/levels' }]}>
      <Head title="Manage Levels" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <GraduationCap className="mr-2 text-purple-500" size={32} />
            <h1 className="text-2xl font-bold">Manage Levels</h1>
          </div>
          <Button onClick={handleOpen} className="gap-2">
            <Plus size={18} /> Add Level
          </Button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow border dark:border-gray-700">
          <table className="min-w-full bg-white dark:bg-gray-900">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="px-4 py-2 text-left">Level Name</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {levels.length > 0 ? (
                levels.map((level) => (
                  <tr key={level.level_id} className="border-t dark:border-gray-700">
                    <td className="px-4 py-2">{level.level_name}</td>
                    <td className="px-4 py-2">{level.type}</td>
                    <td className="px-4 py-2 text-center">
                      <Button size="sm" variant="outline" className="mr-2" onClick={() => handleEdit(level)}>
                        <Pencil size={18} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(level.level_id)}>
                        <Trash2 size={18} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                    No levels found.
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
              <DialogTitle>{isEdit ? 'Edit Level' : 'Add Level'}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium" htmlFor="level_name">
                  Level Name
                </label>
                <Input
                  id="level_name"
                  name="level_name"
                  type="text"
                  value={form.level_name}
                  onChange={handleChange}
                  required
                />
                {errors.level_name && <div className="text-red-500 text-xs mt-1">{errors.level_name[0]}</div>}
              </div>

              <div>
                <label className="block mb-1 font-medium" htmlFor="type">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
                  required
                >
                  <option value="Maternelle">Maternelle</option>
                  <option value="Primaire">Primaire</option>
                  <option value="Collège">Collège</option>
                  <option value="Lycée">Lycée</option>
                </select>
                {errors.type && <div className="text-red-500 text-xs mt-1">{errors.type[0]}</div>}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (isEdit ? 'Saving...' : 'Adding...') : isEdit ? 'Save Changes' : 'Add Level'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
