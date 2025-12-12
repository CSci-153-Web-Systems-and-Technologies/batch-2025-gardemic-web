import { createClient } from '@/utils/supabase/server';
import { calculateTaskMetrics } from '@/lib/utils';
import { StatCard } from './_components/StatCard';
import { TaskTypeCard } from './_components/TaskTypeCard';
import { Task } from '@/types'; 
import { AlarmClock, CheckCircle2 } from 'lucide-react';

import TaskPageHeader from '../_components/TaskPageHeader';
import Description from '../_components/Description';

export const dynamic = 'force-dynamic'; 

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('tasks')
    .select('task_id, task_type, task_status, end_date');

  if (error) {
    console.error("Error fetching tasks:", error);
  }

  const metrics = calculateTaskMetrics((data as Task[]) || []);

  return (
    <>
     <TaskPageHeader></TaskPageHeader>
     <main className="min-h-screen bg-accent-white font-montserrat">
        <div className="max-w-full space-y-8">
        <Description title='Dashboard' subtitle='Overview of your plant care schedule' />

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-10">
            <StatCard 
                title="Overdue Tasks" 
                count={metrics.overdue} 
                // Red color palette
                className="bg-red-100 border-red-300 text-red-900"
                icon={<AlarmClock className="w-12 h-12 text-red-500" />}
            />
            <StatCard 
                title="Due Today" 
                count={metrics.dueToday} 
                // Orange color palette
                className="bg-orange-100 border-orange-300 text-orange-900"
                icon={<AlarmClock className="w-12 h-12 text-orange-500" />}
            />
            <StatCard 
                title="Completed" 
                count={metrics.completed} 
                // Green color palette
                className="bg-green-50 border-green-300 text-green-900"
                icon={<CheckCircle2 className="w-12 h-12 text-green-500" />}
            />
            </section>

            {/* Bottom Row: Two Column Layout */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column: Task Types */}
            <TaskTypeCard distribution={metrics.typeDistribution} />

            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200/50 min-h-74 mr-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Recent Activity
                </h2>
                <div className="flex items-center justify-center h-64 text-gray-400 italic">
                No recent activity detected.
                </div>
            </div>
            </section>

        </div>
    </main>
 
    </>
    
  );
}