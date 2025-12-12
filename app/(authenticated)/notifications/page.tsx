"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import NotificationCard from "./_components/NotificationCard";
import Description from "../_components/Description";

interface NotificationItem {
  notif_id: string;
  type: string;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filterTag, setFilterTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) setNotifications(data);
      setLoading(false);
    };

    fetchNotifications();
  }, [supabase]);

  const filteredNotifications = notifications.filter(n => {
    const matchesTag = filterTag === "All" || n.type === filterTag;
    const matchesSearch = 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const tags = ["All", "Task Creation", "Garden Creation", "Task Reminder", "Auth Event"];

  return (
    <div className="bg-accent-white min-h-screen font-montserrat">      
      <div className="max-w-5xl mx-auto p-6">
        <Description title="Notifications" subtitle="Stay updated with your garden activities" />

        {/* Controls Section */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            {/* Tag Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                    ${filterTag === tag 
                      ? 'bg-green-800 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-1/3">
              <input 
                type="text"
                placeholder="Search notifications..."
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading updates...</div>
          ) : filteredNotifications.length === 0 ? (
            <div className="p-10 text-center text-gray-500">No notifications found.</div>
          ) : (
            filteredNotifications.map(notification => (
              <NotificationCard
                key={notification.notif_id}
                type={notification.type}
                title={notification.title}
                message={notification.message}
                createdAt={notification.created_at}
                isRead={notification.is_read}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}