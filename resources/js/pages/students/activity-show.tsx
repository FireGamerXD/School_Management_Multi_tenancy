import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';

interface Activity {
  activity_id: number;
  activity_name: string;
  description?: string;
  localisation: string;
}

export default function ActivityShow() {
  const { activities = [] } = usePage<{ activities: Activity[] }>().props;
  const activityList: Activity[] = Array.isArray(activities) ? activities : [];

  return (
    <AppLayout breadcrumbs={[{ title: 'Activities', href: '/students/activities' }]}>
      <Card className="p-6 mt-6">
        <h1 className="text-2xl font-bold mb-4">Activities</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm rounded-lg">
            <thead className="bg-gray-100 dark:bg-neutral-800">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Name</th>
                <th className="px-4 py-2 text-left font-semibold">Localisation</th>
                <th className="px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {activityList.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                    No activities available.
                  </td>
                </tr>
              ) : (
                activityList.map((activity) => (
                  <tr
                    key={activity.activity_id}
                    className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700"
                  >
                    <td className="px-4 py-2">{activity.activity_name}</td>
                    <td className="px-4 py-2">{activity.localisation}</td>
                    <td className="px-4 py-2">{activity.description ?? '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AppLayout>
  );
}
