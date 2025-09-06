import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router } from '@inertiajs/react';
import { Building2, Pencil, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface School {
    tenant_id : number;
    school_name : string;
    address: string;
    contact_number : string;
    created_at : string
}

const emptyForm = {school_name: '', address: '', contact_number: ''};

export default function ManageSchools() {
    const { schools = [] } = usePage().props as { schools?: School[] };
    const [open , setOpen] = useState(false);
    const [form , setForm] = useState(emptyForm);
    const [loading , setLoading] = useState(false);
    // this errors section i didnt understands it
    const [errors , setErrors] = useState<{ [key: string]: string[] }>({});
    const [isEdit , setIsEdit] = useState(false);
    // this bellow i didnt understand it
    const [editId , setEditId] = useState<number |null> (null);


    const handleOpen = () => {
        setForm(emptyForm);
        setErrors({});
        setIsEdit(false);
        setEditId(null);
        setOpen(true);
    }

    const handleOpenEdit = (school: School) => {
        setForm({
            school_name: school.school_name,
            address: school.address,
            contact_number: school.contact_number,
        });
        setErrors({});
        setIsEdit(true);
        setEditId(school.tenant_id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(emptyForm);
        setErrors({});
        setIsEdit(false);
        setEditId(null);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (isEdit && editId) {
            router.put(route('schools.update', editId), form, {
                onSuccess: () => {
                    setLoading(false);
                    handleClose();
                },
                onError: (err) => {
                    setLoading(false);
                    // setErrors(err);
                },
            });
        } else {
            router.post(route('schools.store'), form, {
                onSuccess: () => {
                    setLoading(false);
                    handleClose();
                },
                onError: (err) => {
                    setLoading(false);
                    // setErrors(err);
                },
            });
        }
    };

    return(


         <AppLayout breadcrumbs={[{ title: 'Manage Schools', href: '/schools' }]}>
            <Head title="Manage Schools" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <Building2 className="mr-2 text-blue-500" size={32} />
                        <h1 className="text-2xl font-bold">Manage Schools</h1></div><Button onClick={handleOpen} className="gap-2">
                        <Plus size={18} /> Add School
                    </Button></div><div className="overflow-x-auto rounded-lg shadow border dark:border-gray-700">
                    <table className="min-w-full bg-white dark:bg-gray-900">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                                <th className="px-4 py-2 text-left">School Name</th><th className="px-4 py-2 text-left">Address</th><th className="px-4 py-2 text-left">Contact</th><th className="px-4 py-2 text-left">Created At</th><th className="px-4 py-2 text-center">Actions</th></tr></thead><tbody>
                            {schools && schools.length > 0 ? schools.map((school) => (
                                <tr key={school.tenant_id} className="border-t dark:border-gray-700">
                                    <td className="px-4 py-2 font-medium">{school.school_name}</td><td className="px-4 py-2">{school.address}</td><td className="px-4 py-2">{school.contact_number}</td><td className="px-4 py-2">{school.created_at ? new Date(school.created_at).toLocaleDateString() : ''}</td><td className="px-4 py-2 text-center">
                                        <Button size="sm" variant="outline" className="mr-2" title="Edit" onClick={() => handleOpenEdit(school)}>
                                            <Pencil size={18} />
                                        </Button></td></tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">No schools found.</td></tr>)}
                        </tbody></table></div>{/* Add school Modal */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{isEdit ? 'Edit school' : 'Add school'}</DialogTitle></DialogHeader><form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium" htmlFor="school_name">school Name</label><input id="school_name"
                                name="school_name"
                                type="text"
                                value={form.school_name}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
                                required
                            />
                                {errors.school_name && <div className="text-red-500 text-xs mt-1">{errors.school_name[0]}</div>}
                            </div><div>
                                <label className="block mb-1 font-medium" htmlFor="address">Address</label><input id="address"
                                name="address"
                                type="text"
                                value={form.address}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
                                required/>
                                {errors.address && <div className="text-red-500 text-xs mt-1">{errors.address[0]}</div>}
                            </div><div>
                                <label className="block mb-1 font-medium" htmlFor="contact_number">Contact Number</label><input id="contact_number"
                                name="contact_number"
                                type="text"
                                value={form.contact_number}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
                                required/>
                                {errors.contact_number && <div className="text-red-500 text-xs mt-1">{errors.contact_number[0]}</div>}
                            </div><DialogFooter>
                                <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>Cancel</Button><Button type="submit" disabled={loading}>{loading ? (isEdit ? 'Saving...' : 'Adding...') : (isEdit ? 'Save Changes' : 'Add school')}</Button></DialogFooter></form></DialogContent></Dialog></div></AppLayout>);
    

}