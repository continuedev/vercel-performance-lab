'use client';

// BAD: Barrel imports from lucide-react pull in the entire icon library (~200KB)
import { Settings, User, Bell, Search, Home } from 'lucide-react';

// BAD: Barrel import from @radix-ui pulls in extra code
import { Button } from '@radix-ui/react-button';

interface QuickActionsProps {
  userName: string;
  notificationCount: number;
}

// BAD: This component has 'use client' but doesn't use any client-side features.
// It only renders props. It could be a server component.
export function QuickActions({ userName, notificationCount }: QuickActionsProps) {
  return (
    <nav>
      <ul>
        <li><Home size={16} /> Dashboard</li>
        <li><User size={16} /> {userName}</li>
        <li><Bell size={16} /> {notificationCount} notifications</li>
        <li><Search size={16} /> Search</li>
        <li>
          <Button>
            <Settings size={16} /> Settings
          </Button>
        </li>
      </ul>
    </nav>
  );
}
