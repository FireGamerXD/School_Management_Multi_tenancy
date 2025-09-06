import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router } from '@inertiajs/react';
import { Users } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Director {
    id : number,
    name : string,
    email : string ,
    school : {tenant_id : number ; school_name: string} | null;
    is_active : boolean;
}

interface School {
    tenant_id : number;
    school_name: string;
    director : {id: number; name:string ; email:string} | null;
}

export default function AssignDirector(){
    const {Directors , Schools} = usePage().props as unknown as {Directors: Director[]; Schools: School[]};
    const [loading , setLoading] = useState(false);

    const unassignSchools = Schools.filter(s => !s.director);

    const handleAssign = (directorId: number , tenantId : number)=>{
    setLoading(true);
    router.post(route('assign-director.assign', directorId), { tenant_id: tenantId }, {
    onSuccess: () => setLoading(false),
    onError: () => setLoading(false),
    preserveScroll: true,
    });
    };

    return(
        <AppLayout breadcrumbs={[{ title: 'Assign Director', href: '/assign-director' }]}> 
            <Head title="Assign Director" />
            <div className="p-6">
            <div className="flex items-center mb-4">
            <Users className="mr-2 text-blue-500" size={32} />
            <h1 className="text-2xl font-bold">Assign Director</h1>
            </div>
            <div className="overflow-x-auto rounded-lg shadow border dark:border-gray-700">
            <table className="min-w-full bg-white dark:bg-gray-900">
            <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Assigned School</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
            </tr>
            </thead>
            <tbody>
            {Directors && Directors.length > 0 ? Directors.map((director) => (
            <tr key={director.id} className="border-t dark:border-gray-700">
            <td className="px-4 py-2 font-medium">{director.name}</td>
            <td className="px-4 py-2">{director.email}</td>
            <td className="px-4 py-2">
            {director.school ? (
            <div className="flex items-center gap-2">
            {director.school.school_name}
            <Button
            size="sm"
            variant="outline"
            onClick={() => router.post(route('assign-director.unassign', director.id))}
            >
            Unassign
            </Button>
            </div>
            ) : (
            <form
              onSubmit={e => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const tenantId = Number(formData.get('tenant_id'));
                if (tenantId) handleAssign(director.id, tenantId);
              }}
            >
              {/* CHANGE: All schools are shown in the dropdown, allowing multiple directors to be assigned to the same school. Previously, only unassigned schools appeared and assigned schools were disabled. */}
              <select
                name="tenant_id"
                className="rounded border px-2 py-1 dark:bg-gray-800 dark:border-gray-700 mr-2"
                required
                defaultValue=""
                disabled={loading || Schools.length === 0}
              >
                <option value="" disabled>Select School...</option>
                {Schools.map(school => (
                  <option
                    key={school.tenant_id}
                    value={school.tenant_id}
                  >
                    {school.school_name}
                  </option>
                ))}
              </select>
              <Button size="sm" type="submit" disabled={loading || Schools.length === 0}>Assign</Button>
            </form>
            )}
            </td>
            <td className="px-4 py-2">
            <span className={director.is_active ? "text-green-600" : "text-red-600"}>
            {director.is_active ? "Active" : "Inactive"}
            </span>
            </td>
            <td className="px-4 py-2">
            <Button
            size="sm"
            variant={director.is_active ? "destructive" : "default"}
            onClick={() => router.post(route('users.toggleActive', director.id))}
            >
            {director.is_active ? 'Deactivate' : 'Activate'}
            </Button>
            </td>
            </tr>
            )) : (
            <tr>
            <td colSpan={3} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">No directors found.</td>
            </tr>
            )}
            </tbody>
            </table>
            </div>
            </div>
        </AppLayout>
    )
    

}