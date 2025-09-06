import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Users, UserCog, User } from 'lucide-react';
import React, { useState } from 'react';

interface Group {
    group_id: number;
    level_id: number;
    student_id: number;
    group_name: string;
    signing_in_date: string;
    signing_out_date: string;
}

interface School {
    tenant_id: number;
    school_name: string;
    address: string;
    contact_number: string;
    groups: Group[];
}

export default function Dashboard() {
    const {
        isFounder,
        schools,
        school,
        totalSchools,
        totalStudents,
        totalDirectors,
        totalGroups,
        totalLevels,
        auth
    } = usePage().props as any;

    const user = auth?.user;
    const [open, setOpen] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
    const handleSchoolClick = (school: School) => {
        setSelectedSchool(school);
        setOpen(true);
    };

    if (user?.role === 'Director' && !user?.tenant_id) {
        return (
            <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}> 
                <Head title="Dashboard" />
                <div className="flex items-center justify-center h-screen">
                    <h1 className="text-xl font-bold text-gray-600">
                        You are not a director of any school yet.
                    </h1>
                </div>
            </AppLayout>
        );
    }

        if (user?.role === 'User' && !user?.tenant_id) {
        return (
            <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}> 
                <Head title="Dashboard" />
                <div className="flex items-center justify-center h-screen">
                    <h1 className="text-xl font-bold text-gray-600">
                        You don't have any role yet. 
                    </h1>
                </div>
            </AppLayout>
        );
    }

    if (isFounder) {
        const safeSchools: School[] = Array.isArray(schools) ? schools : [];
        const safeGroupsCount = school?.groups?.length || 0;
        return (
            <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}> 
                <Head title="Founder Dashboard" />
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-6">All Schools Overview</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card className="p-6 text-center bg-blue-50 border-blue-200">
                            <div className="text-lg font-semibold mb-2">Total Schools</div>
                            <div className="text-3xl font-bold">{totalSchools ?? 0}</div>
                        </Card>
                        <Card className="p-6 text-center bg-green-50 border-green-200">
                            <div className="text-lg font-semibold mb-2">Total Groups</div>
                            <div className="text-3xl font-bold">{totalGroups ?? 0}</div>
                        </Card>
                        <Card className="p-6 text-center bg-purple-50 border-purple-200">
                            <div className="text-lg font-semibold mb-2">Total Directors</div>
                            <div className="text-3xl font-bold">{totalDirectors ?? 0}</div>
                        </Card>
                        <Card className="p-6 text-center bg-yellow-50 border-yellow-200">
                            <div className="text-lg font-semibold mb-2">Total Students</div>
                            <div className="text-3xl font-bold">{totalStudents ?? 0}</div>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {safeSchools.map((school: School) => (
                            <button
                                key={school.tenant_id}
                                className="text-left w-full focus:outline-none"
                                onClick={() => handleSchoolClick(school)}
                                type="button"
                            >
                                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="flex items-center mb-2">
                                        <UserCog className="mr-2 text-blue-500" />
                                        <span className="text-lg font-semibold">{school.school_name}</span>
                                    </div>
                                </Card>
                            </button>
                        ))}
                    </div>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{selectedSchool?.school_name}</DialogTitle>
                                <DialogDescription>
                                    <div className="mb-2 text-sm text-gray-600">Address: {selectedSchool?.address}</div>
                                    <div className="mb-2 text-sm text-gray-600">Contact: {selectedSchool?.contact_number}</div>
                                    <div className="font-medium mb-1">Groups:</div>
                                    <ul className="ml-4 list-disc">
                                        {selectedSchool?.groups && selectedSchool.groups.length > 0 ? (
                                            selectedSchool.groups.map((group: Group) => (
                                                <li key={group.group_id} className="text-sm mb-1">
                                                    {group.group_name} - from {group.signing_in_date} to {group.signing_out_date}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-xs text-gray-400">No groups</li>
                                        )}
                                    </ul>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose />
                        </DialogContent>
                    </Dialog>
                </div>
            </AppLayout>
        );
    }

    const safeSchool: School | undefined = school;
    const safeGroupsCount = school?.groups?.length || 0;

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}> 
            <Head title="School Dashboard" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">{safeSchool?.school_name || 'School Dashboard'}</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 text-center">
                        <Users className="mx-auto mb-2 text-blue-500" size={32} />
                        <div className="text-lg font-semibold mb-2">Total Students</div>
                        <div className="text-3xl font-bold">{totalStudents ?? 0}</div>
                    </Card>
                    <Card className="p-6 text-center">
                        <UserCog className="mx-auto mb-2 text-green-500" size={32} />
                        <div className="text-lg font-semibold mb-2">Total Groups</div>
                        <div className="text-3xl font-bold">{safeGroupsCount ?? 0}</div>
                    </Card>
                    <Card className="p-6 text-center">
                        <UserCog className="mx-auto mb-2 text-purple-500" size={32} />
                        <div className="text-lg font-semibold mb-2">Total Levels</div>
                        <div className="text-3xl font-bold">{totalLevels ?? 0}</div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
