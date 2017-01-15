import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'home',
    name: 'Home',
    type: 'link',
    icon: 'dashboard'
  },
  {
    state: 'notifications',
    name: 'Notifications',
    type: 'sub',
    icon: 'notifications',
    badge: [
      {type: 'purple', value: '10'}
    ]
  },
  {
    state: 'reports',
    name: 'Attendance',
    type: 'link',
    icon: 'book'
  },

  {
    state: 'schools',
    name: 'Schools',
    type: 'sub',
    icon: 'home',
    children: [
      {state: 'school', name: 'Schools'},
      {state: 'teacher', name: 'Teachers'},
      {state: 'class', name: 'Classes'},
      {state: 'student', name: 'Children'}
    ]
  },
  {
    state: 'schools',
    name: 'Teachers',
    type: 'sub',
    icon: 'people',
    children: [
      {state: 'school', name: 'Schools'},
      {state: 'teacher', name: 'Teachers'},
    ]
  },
  {
    state: 'schools',
    name: 'Children',
    type: 'sub',
    icon: 'face',
    children: [
      {state: 'school', name: 'Schools'},
      {state: 'teacher', name: 'Teachers'},
    ]
  },
  {
    state: 'tables',
    name: 'Reports',
    type: 'sub',
    icon: 'format_line_spacing',
    children: [
      {state: 'fullscreen', name: 'Attendance Summary'},
      {state: 'editing', name: 'Attendance of Boys'},
      {state: 'filter', name: 'Attendance of Girls'},
      {state: 'paging', name: 'Attendance per County'},
      {state: 'sorting', name: 'Registered Schools'},
      {state: 'pinning', name: 'Registered Teachers'},
    ]
  },
  {
    state: 'charts',
    name: 'System Logs',
    type: 'link',
    icon: 'show_chart',
  },
  {
    state: 'charts',
    name: 'Activity Logs',
    type: 'link',
    icon: 'show_chart',
  },
  {
    state: 'reports',
    name: 'Settings',
    type: 'sub',
    icon: 'settings',

    children: [
      {state: 'invoice', name: 'Change Password'},
      {state: 'invoice', name: 'Profile'},

    ]
  },

  {
    state: 'help',
    name: 'Help',
    type: 'extTabLink',
    icon: 'local_library'
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
