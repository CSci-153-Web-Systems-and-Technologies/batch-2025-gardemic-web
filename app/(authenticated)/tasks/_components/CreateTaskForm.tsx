"use client"

import React, { useState, useEffect } from 'react';
import { InputField } from '@/components/InputField';
import { SelectField } from '../../_components/SelectField';
import { Task } from '@/types';

import { createClient } from '@/utils/supabase/client';

interface CreateTaskFormProps {
  onSuccess: (newTask: Task) => void;
  onCancel: () => void;
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Dropdown Data
  const [availablePlants, setAvailablePlants] = useState<{label: string, value: string}[]>([]);
  const [availableGardens, setAvailableGardens] = useState<{label: string, value: string}[]>([]);

  const [formData, setFormData] = useState({
    garden_id: '',
    plant_id: '', 
    task_type: '',
    description: '',
    start_date: '',
    end_date: '', 
  });

  const supabase = createClient();

  // Optimized Data Fetching
  useEffect(() => {
    let isMounted = true;

    const initData = async () => {
      try {

        const plantsPromise = supabase
          .from('Plant')
          .select('plant_id, name');

        // 2. Get the USER
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          console.error("User not authenticated");
          return;
        }
        if (isMounted) setUserId(user.id);

        // 3. Fetch GARDENS (Now that we have the user_id)
        const gardensPromise = supabase
          .from('gardens')
          .select('garden_id, name')
          .eq('user_id', user.id);

        // 4. Resolve both requests
        // plantsPromise has been running this whole time, minimizing the waterfall effect
        const [plantsResult, gardensResult] = await Promise.all([
          plantsPromise,
          gardensPromise
        ]);

        if (isMounted) {
          if (plantsResult.data) {
            setAvailablePlants(plantsResult.data.map((p: any) => ({
              label: p.name,
              value: p.plant_id
            })));
          }

          if (gardensResult.data) {
            setAvailableGardens(gardensResult.data.map((g: any) => ({
              label: g.name,
              value: g.garden_id
            })));
          }
        }
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    };

    initData();

    // Cleanup to prevent memory leaks if component unmounts mid-request
    return () => { isMounted = false; };
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);

    try {
      const taskPayload = {
        user_id: userId,
        garden_id: formData.garden_id,
        plant_id: formData.plant_id,
        task_type: formData.task_type,
        description: `${formData.description}`,
        start_date: formData.start_date,
        end_date: formData.end_date,
      };

      const { data, error } = await supabase
        .from('tasks')
        .insert([taskPayload])
        .select()
        .single();

      if (error) throw error;
      if (data) onSuccess(data as Task);

    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const taskTypeOptions = [
    { label: "Watering", value: 'Watering' },
    { label: "Fertilizing", value: 'Fertilizing' },
    { label: "Pruning", value: 'Pruning' },
    { label: "Health Checkup", value: 'Health Checkup' },
    { label: "General", value: 'General' }
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <SelectField
        label="Garden"
        name="garden_id"
        value={formData.garden_id}
        onChange={handleChange}
        options={availableGardens}
        required
      />
      
      <SelectField
        label="Plant"
        name="plant_id"
        value={formData.plant_id}
        onChange={handleChange}
        options={availablePlants} 
        required
      />

      <SelectField
        label="Task Type"
        name="task_type"
        value={formData.task_type}
        onChange={handleChange}
        options={taskTypeOptions}
        required
      />

      <div className="flex flex-col gap-2">
         <label className="text-sm font-medium text-gray-900">Description (optional)</label>
         <textarea
            name="description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Add any specific notes..."
            value={formData.description}
            onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
         />
      </div>

      <div className="flex gap-4">
        <InputField
          label="Start Date"
          name="start_date"
          type="date"
          className="w-1/2"
          value={formData.start_date}
          onChange={handleChange}
          required
        />
        <InputField
          label="End Date"
          name="end_date"
          type="date"
          className="w-1/2"
          value={formData.end_date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex gap-4 mt-4 pt-4">
        <button
          type="button" 
          disabled={loading}
          className="flex-1 px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition disabled:opacity-50"
          onClick={handleSubmit} 
        >
          {loading ? 'Saving...' : 'Create Task'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};