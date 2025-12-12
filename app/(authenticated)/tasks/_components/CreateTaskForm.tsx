"use client"

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { InputField } from '@/components/InputField';
import { SelectField } from '../../_components/SelectField';
import { Task } from '@/types';
import { createClient } from '@/utils/supabase/client';
import { notificationService } from '@/services/notificationService';

interface CreateTaskFormProps {
  onSuccess: (newTask: Task) => void;
  onCancel: () => void;
}

interface FormErrors {
  garden_id?: string;
  plant_id?: string;
  task_type?: string;
  start_date?: string;
  end_date?: string;
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onSuccess, onCancel }) => {
  const supabase = createClient();
  const today = format(new Date(), 'yyyy-MM-dd');

  // State
  const [loading, setLoading] = useState(false);
  const [fetchingPlants, setFetchingPlants] = useState(false); 
  const [userId, setUserId] = useState<string | null>(null);
  const [availablePlants, setAvailablePlants] = useState<{label: string, value: string}[]>([]);
  const [availableGardens, setAvailableGardens] = useState<{label: string, value: string}[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState({
    garden_id: '',
    plant_id: '', 
    task_type: '',
    description: '',
    start_date: '',
    end_date: '', 
  });

  // 1. Initial Load: Get User and Gardens only
  useEffect(() => {
    let isMounted = true;

    const initData = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          console.error("User not authenticated");
          return;
        }
        if (isMounted) setUserId(user.id);

        const { data: gardensData } = await supabase
          .from('gardens')
          .select('garden_id, name')
          .eq('user_id', user.id);

        if (isMounted && gardensData) {
          setAvailableGardens(gardensData.map((g: any) => ({
            label: g.name,
            value: g.garden_id
          })));
        }
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    };

    initData();

    return () => { isMounted = false; };
  }, [supabase]);

  // 2. Reactive Load: Fetch Plants when Garden changes
  useEffect(() => {
    if (!formData.garden_id) {
        setAvailablePlants([]);
        return;
    }

    const fetchGardenPlants = async () => {
        setFetchingPlants(true);
        try {
            const { data, error } = await supabase
                .from('garden_plants')
                .select(`
                    plant_id,
                    plant:plants ( name )
                `)
                .eq('garden_id', formData.garden_id);

            if (error) throw error;

            if (data) {
                const formattedPlants = data.map((item: any) => ({
                    label: item.plant?.name || "Unknown Plant",
                    value: item.plant_id
                }));
                setAvailablePlants(formattedPlants);
            }
        } catch (error) {
            console.error("Error fetching garden plants:", error);
            setAvailablePlants([]);
        } finally {
            setFetchingPlants(false);
        }
    };

    fetchGardenPlants();

  }, [formData.garden_id, supabase]);


  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.garden_id) { newErrors.garden_id = "Please select a garden"; isValid = false; }
    if (!formData.plant_id) { newErrors.plant_id = "Please select a plant"; isValid = false; }
    if (!formData.task_type) { newErrors.task_type = "Please select a task type"; isValid = false; }
    if (!formData.start_date) { newErrors.start_date = "Start date is required"; isValid = false; }
    if (!formData.end_date) { newErrors.end_date = "End date is required"; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return; 
    if (!userId) return;
    
    setLoading(true);

    try {
      const taskPayload = {
        user_id: userId,
        garden_id: formData.garden_id,
        plant_id: formData.plant_id,
        task_type: formData.task_type,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
      };

      const { data, error } = await supabase
        .from('tasks')
        .insert([taskPayload])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        const { data: { user } } = await supabase.auth.getUser();
        const username = user?.user_metadata?.full_name || "User";

        await notificationService.create({
          userId: userId,
          username: username,
          type: 'Task Creation',
          actionDetails: `created a task, ${formData.task_type}`,
          additionalInfo: `Task for ${formData.task_type} is scheduled from ${formData.start_date} to ${formData.end_date}`
        });

        onSuccess(data as Task);
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
        if (name === 'garden_id') {
            return { ...prev, garden_id: value, plant_id: '' };
        }
        return { ...prev, [name]: value };
    });

    if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
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
        error={errors.garden_id} 
      />
      
      <div className="relative">
        <SelectField
            label={fetchingPlants ? "Loading Plants..." : "Plant"}
            name="plant_id"
            value={formData.plant_id}
            onChange={handleChange}
            options={availablePlants} 
            required
            error={errors.plant_id}
            disabled={!formData.garden_id || fetchingPlants} 
        />
        {!formData.garden_id && (
            <p className="text-xs text-gray-500 mt-1 absolute right-0 top-0">Select a garden first</p>
        )}
      </div>

      <SelectField
        label="Task Type"
        name="task_type"
        value={formData.task_type}
        onChange={handleChange}
        options={taskTypeOptions}
        required
        error={errors.task_type}
      />

      <div className="flex flex-col gap-2">
         <label className="text-sm font-medium text-black">Description (optional)</label>
         <textarea
            name="description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
          min={today} 
          error={errors.start_date}
        />
        <InputField
          label="End Date"
          name="end_date"
          type="date"
          className="w-1/2"
          value={formData.end_date}
          onChange={handleChange}
          required
          min={formData.start_date || today}
          error={errors.end_date}
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