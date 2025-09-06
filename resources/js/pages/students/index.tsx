import AppLayout from '@/layouts/app-layout';
import { usePage, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';


const emptyForm = { first_name: '', last_name: '', email: '', phone_number: '', group_id: '' };

export default function Students() {
    const { students = [], groups = [] } = usePage().props;
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    const handleOpenAdd = () => {
        setForm(emptyForm);
        setIsEdit(false);
        setEditId(null);
        setOpen(true);
    };

    const handleOpenEdit = (student: any) => {
        setForm({
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
            phone_number: student.phone_number,
            group_id: student.group_id,
        });

        setIsEdit(true);
        setEditId(student.student_id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(emptyForm);
        setIsEdit(false);
        setEditId(null);
    };

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (isEdit && editId) {
            router.put(`/students/${editId}`, form, {
                onSuccess: handleClose,
            });
        } else {
            router.post('/students', form, {
                onSuccess: handleClose,
            });
        }
    };

    const handleDelete = (id: any) => {
        if (window.confirm('Are you sure about deleting this student?')) {
            router.delete(`/students/${id}`);
        }
    };

    const studentList = Array.isArray(students) ? students : [];
    const groupList = Array.isArray(groups) ? groups : [];

    return (
        <AppLayout breadcrumbs={[{ title: 'Students', href: '/students' }]}>
            <Card className="p-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Students</h1>
                    <Button onClick={handleOpenAdd}>Add Student</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm rounded-lg">
                        <thead className="bg-gray-100 dark:bg-neutral-800">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">First Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Last Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Email</th>
                                <th className="px-4 py-2 text-left font-semibold">Phone</th>
                                <th className="px-4 py-2 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.map((student: any) => (
                                <tr key={student.student_id} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700">
                                    <td className="px-4 py-2">{student.first_name}</td>
                                    <td className="px-4 py-2">{student.last_name}</td>
                                    <td className="px-4 py-2">{student.email}</td>
                                    <td className="px-4 py-2">{student.phone_number}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <Button size="sm" variant="outline" onClick={() => handleOpenEdit(student)}>Edit</Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(student.student_id)}>Delete</Button>
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
                        <DialogTitle>{isEdit ? 'Update Student' : 'Add Student'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="first_name">First Name</Label>
                            <Input id="first_name" name="first_name" value={form.first_name} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input id="last_name" name="last_name" value={form.last_name} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="phone_number">Phone</Label>
                            <Input id="phone_number" name="phone_number" value={form.phone_number} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium" htmlFor="group_id">Group</label>
                            <select
                                id="group_id"
                                name="group_id"
                                value={form.group_id}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
                                required
                            >
                                <option value="">Select a Group</option>
                                {groupList.map((group) => (
                                    <option key={group.group_id} value={group.group_id}>
                                        {group.group_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{isEdit ? 'Update' : 'Add'}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
