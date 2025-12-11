"use client";

import React, { useState, useEffect } from 'react';
import TaskPageHeader from '../_components/TaskPageHeader';
import Modal from '@/components/ui/modal'; 
import { CreateTaskForm } from './_components/CreateTaskForm';
import { TaskCard } from './_components/TaskCard';
import { Task } from '@/types';
import Description from '../_components/Description';

import { createClient } from '@/utils/supabase/client';
import { ActionButton } from '../_components/ActionButton';

export default function TaskPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());
  
  // New state to store plant names: { 'plant_id': 'Plant Name' }
  const [plantMap, setPlantMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const supabase = createClient();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // A. Fetch Plants (for name lookup)
        const plantPromise = supabase
          .from('plants')
          .select('plant_id, name');

        const taskPromise = supabase
          .from('tasks')
          .select('*')
          .eq('user_id', user.id)
          .neq('task_status', 'Completed') 
          .order('end_date', { ascending: true }); 

        const [plantRes, taskRes] = await Promise.all([plantPromise, taskPromise]);

        if (plantRes.error) throw plantRes.error;
        if (taskRes.error) throw taskRes.error;

        const map: Record<string, string> = {};
        plantRes.data?.forEach((p: any) => {
          map[p.plant_id] = p.name;
        });
        setPlantMap(map);

        if (taskRes.data) {
          setTasks(taskRes.data as Task[]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  const handleAddTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
    setIsModalOpen(false);
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ task_status: 'Completed' })
        .eq('task_id', taskId);

      if (error) throw error;

      // B. Visual Feedback (Turn Card Green)
      const newSet = new Set(completedTaskIds);
      newSet.add(taskId);
      setCompletedTaskIds(newSet);

      setTimeout(() => {
        setTasks((prevTasks) => prevTasks.filter((t) => t.task_id !== taskId)); 
  
        setCompletedTaskIds((prev) => {
            const updated = new Set(prev);
            updated.delete(taskId);
            return updated;
        });
      }, 3000);

    } catch (error) {
      console.error('Error completing task:', error);
      alert('Failed to mark task as complete');
    }
  };

  const getPlantName = (id: string | null) => {
    if (!id) return 'Unknown Plant';
    return plantMap[id] || 'Loading...';
  };

  return (
    <div className="min-h-screen bg-accent-white font-montserrat">
      
    <TaskPageHeader />

      <Description title='Maintenance Tasks' subtitle='Track and complete your plant care tasks'>
        <ActionButton onClick={() => setIsModalOpen(true)}>
            Add Task
        </ActionButton>
      </Description>

      <main className="p-8">
    

        {/* Task Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading tasks...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task.task_id}
                  task={task}
                  plantName={getPlantName(task.plant_id)}
                  isCompleted={completedTaskIds.has(task.task_id)}
                  onComplete={handleCompleteTask}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-20 text-gray-400 border-2 border-dashed border-gray-300 rounded-xl">
                No tasks scheduled. Click Add Task to get started.
              </div>
            )}
          </div>
        )}
      </main>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Create Maintenance Task"
      >
        <div className="mt-2 mb-4 text-sm text-gray-500 text-center">
            Schedule maintenance tasks for your plants
        </div>
        <CreateTaskForm 
            onSuccess={handleAddTask} 
            onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}