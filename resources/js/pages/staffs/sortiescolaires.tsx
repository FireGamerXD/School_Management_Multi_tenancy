// import AppLayout from '@/layouts/app-layout';
// import { Head, usePage, router } from '@inertiajs/react';
// import { Building2, Pencil, Trash2, Plus } from 'lucide-react';
// import { useState } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';

// interface Sortiescolaire {
//     tenant_id : number;
//     sortie_name: string;
//     description: string;
//     localisation: string;
// }

// const emptyForm = {sortie_name: '', description: '', localisation: ''};

// export default function ManageSortiescolaire(){
//     const {sortiescolaires = []} = usePage().props as {sortiescolaires?: Sortiescolaire[]};
//     const [open , setOpen] = useState(false);
//     const [form , setForm] = useState(emptyForm);
//     const [loading , setLoading] = useState(false);
//     // this errors section i didnt understands it
//     const [errors , setErrors] = useState<{ [key: string]: string[] }>({});
//     const [isEdit , setIsEdit] = useState(false);
//         // this bellow i didnt understand it
//     const [editId , setEditId] = useState<number |null> (null);



//     const handleOpen = () => {
//         setForm(emptyForm);
//         setErrors({});
//         setIsEdit(false);
//         setEditId(null);
//         setOpen(true);
//     }


//      const handleOpenEdit = (sortiescolaire: Sortiescolaire) => {
//         setForm({
//             sortie_name: sortiescolaire.sortie_name,
//             description: sortiescolaire.description,
//             localisation: sortiescolaire.localisation,
//         });
//         setErrors({});
//         setIsEdit(true);
//         setEditId(sortiescolaire.tenant_id);
//         setOpen(true);
//     };



//     const handleClose = () => {
//         setOpen(false);
//         setForm(emptyForm);
//         setErrors({});
//         setIsEdit(false);
//         setEditId(null);
//     };
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };


//     const handleSubmit = (e: React.FormEvent) => {
//             e.preventDefault();
//             setLoading(true);
//             if (isEdit && editId) {
//                 router.put(route('sortiescolaire.update', editId), form, {
//                     onSuccess: () => {
//                         setLoading(false);
//                         handleClose();
//                     },
//                     onError: (err) => {
//                         setLoading(false);
//                         // setErrors(err);
//                     },
//                 });
//             } else {
//                 router.post(route('sortiescolaire.store'), form, {
//                     onSuccess: () => {
//                         setLoading(false);
//                         handleClose();
//                     },
//                     onError: (err) => {
//                         setLoading(false);
//                         // setErrors(err);
//                     },
//                 });
//             }
//         };

//     return(


//          <AppLayout breadcrumbs={[{ title: 'Manage Sortiescolaire', href: '/sortiescolaire' }]}>
//             <Head title="Manage Sortiescolaire" />
//             <div className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center">
//                         <Building2 className="mr-2 text-blue-500" size={32} />
//                         <h1 className="text-2xl font-bold">Manage SortieScolaire</h1></div><Button onClick={handleOpen} className="gap-2">
//                         <Plus size={18} /> Add SoriteScolaire
//                     </Button></div><div className="overflow-x-auto rounded-lg shadow border dark:border-gray-700">
//                     <table className="min-w-full bg-white dark:bg-gray-900">
//                         <thead>
//                             <tr className="bg-gray-100 dark:bg-gray-800">
//                                 <th className="px-4 py-2 text-left">Sortie Name</th><th className="px-4 py-2 text-left">Description</th><th className="px-4 py-2 text-left">Localisation</th></tr></thead><tbody>
//                             {sortiescolaires && sortiescolaires.length > 0 ? sortiescolaires.map((sortiescolaire) => (
//                                 <tr key={sortiescolaire.tenant_id} className="border-t dark:border-gray-700">
//                                     <td className="px-4 py-2 font-medium">{sortiescolaire.sortie_name}</td><td className="px-4 py-2">{sortiescolaire.description}</td><td className="px-4 py-2">{sortiescolaire.localisation}</td><td className="px-4 py-2 text-center">
//                                         <Button size="sm" variant="outline" className="mr-2" title="Edit" onClick={() => handleOpenEdit(sortiescolaire)}>
//                                             <Pencil size={18} />
//                                         </Button></td></tr>
//                             )) : (
//                                 <tr>
//                                     <td colSpan={5} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">No sorties found.</td></tr>)}
//                         </tbody></table></div>{/* Add sortie Modal */}
//                 <Dialog open={open} onOpenChange={setOpen}>
//                     <DialogContent>
//                         <DialogHeader>
//                             {/* here */}
//                             <DialogTitle>{isEdit ? 'Edit Sortie' : 'Add Sortie'}</DialogTitle></DialogHeader><form onSubmit={handleSubmit} className="space-y-4">
//                             <div>
//                                 <label className="block mb-1 font-medium" htmlFor="sortie_name">Sortie Name</label><input id="sortie_name"
//                                 name="sortie_name"
//                                 type="text"
//                                 value={form.sortie_name}
//                                 onChange={handleChange}
//                                 className="w-full rounded border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
//                                 required
//                             />
//                                 {errors.sortie_name && <div className="text-red-500 text-xs mt-1">{errors.sortie_name[0]}</div>}
//                             </div><div>
//                                 <label className="block mb-1 font-medium" htmlFor="description">description</label><input id="description"
//                                 name="description"
//                                 type="text"
//                                 value={form.description}
//                                 onChange={handleChange}
//                                 className="w-full rounded border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
//                                 required/>
//                                 {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description[0]}</div>}
//                             </div><div>
//                                 <label className="block mb-1 font-medium" htmlFor="localisation">Localisation</label><input id="localisation"
//                                 name="localisation"
//                                 type="text"
//                                 value={form.localisation}
//                                 onChange={handleChange}
//                                 className="w-full rounded border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
//                                 required/>
//                                 {errors.localisation && <div className="text-red-500 text-xs mt-1">{errors.localisation[0]}</div>}
//                             </div><DialogFooter>
//                                 <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>Cancel</Button><Button type="submit" disabled={loading}>{loading ? (isEdit ? 'Saving...' : 'Adding...') : (isEdit ? 'Save Changes' : 'Add sortie')}</Button></DialogFooter></form></DialogContent></Dialog></div></AppLayout>);
    


// }