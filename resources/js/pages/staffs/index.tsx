// Staffs.tsx
import AppLayout from '@/layouts/app-layout';
import { usePage, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const emptyForm = { first_name: '', last_name: '' , carte_national: '', phone_number: '', post_name: '' };


export default function Staffs (){
  const { staffs = [] } = usePage().props;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  // const [isEdit, setIsEdit] = useState(false);
  // const [editId, setEditId] = useState(null);


    const handleOpenAdd = () => {
        setForm(emptyForm);
        // setIsEdit(false);
        // setEditId(null);
        setOpen(true);
    };


    // const handleOpenEdit = (staff: any) => {
    //     setForm({
    //         fullname: staff.full_name,
    //         carte_national: staff.carte_national,
    //         phone_number: staff.phone_number,
    //         post_name: staff.post_name,
    //     });

    //     setIsEdit(true);
    //     setEditId(student.student_id);
    //     setOpen(true);
    // };


    const handleClose = () => {
        setOpen(false);
        setForm(emptyForm);
        // setIsEdit(false);
        // setEditId(null);
    };

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        router.post('/staffs', form, {
            onSuccess: () => {
                handleClose();
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };


    //     const handleDelete = (id: any) => {
    //     if (window.confirm('Are you sure about deleting this student?')) {
    //         router.delete(`/students/${id}`);
    //     }
    // };

    const staffList = Array.isArray(staffs) ? staffs : [];

    return (

        <AppLayout breadcrumbs={[{title: 'Staff' , href:'/staffs'}]}>

          <Card className="p-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Staffs</h1>
                    <Button onClick={handleOpenAdd}>Add Staff</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm rounded-lg">
                        <thead className="bg-gray-100 dark:bg-neutral-800">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">First Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Last Name</th>
                                <th className="px-4 py-2 text-left font-semibold">CIN</th>
                                <th className="px-4 py-2 text-left font-semibold">Phone</th>
                                <th className="px-4 py-2 text-left font-semibold">Post</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffList.map((staff: any) => (
                                <tr key={staff.staff_id} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700">
                                    <td className="px-4 py-2">{staff.first_name}</td>
                                    <td className="px-4 py-2">{staff.last_name}</td>
                                    <td className="px-4 py-2">{staff.carte_national}</td>
                                    <td className="px-4 py-2">{staff.phone_number}</td>
                                    <td className="px-4 py-2">{staff.post_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{'Add Staff'}</DialogTitle>
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
                            <Label htmlFor="carte_national">CIN</Label>
                            <Input id="carte_national" name="carte_national" value={form.carte_national} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="phone_number">Phone</Label>
                            <Input id="phone_number" name="phone_number" value={form.phone_number} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="post_name">Post</Label>
                            <Input id="post_name" name="post_name" value={form.post_name} onChange={handleChange} required />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{'Add'}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

        </AppLayout>




    )


}

