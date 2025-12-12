import { createClient } from "@/utils/supabase/client";

export type NotificationType = 'Task Creation' | 'Garden Creation' | 'Task Reminder' | 'Auth Event' | 'Inactivity';

interface CreateNotificationParams {
  userId: string;
  username: string;
  type: NotificationType;
  actionDetails: string; // e.g., "created a task, Watering"
  additionalInfo?: string; // e.g., "Due on 2025-01-01"
}

export const notificationService = {
  
  async create(params: CreateNotificationParams) {
    const supabase = createClient();
    
    // Structure: [Username] has [action done].
    let title = `${params.username} has ${params.actionDetails}`;
    
    // Custom structure for Reminders based on requirement
    if (params.type === 'Task Reminder') {
      title = `${params.username}, a reminder for your task`;
    }

    const { error } = await supabase
      .from('notifications')
      .insert([{
        user_id: params.userId,
        type: params.type,
        title: title,
        message: params.additionalInfo || title,
        is_read: false
      }]);

    if (error) {
      console.error("Failed to create notification:", error);
    }
  },

  async markAsRead(notificationId: string) {
    const supabase = createClient();
    await supabase.from('notifications').update({ is_read: true }).eq('id', notificationId);
  }
};