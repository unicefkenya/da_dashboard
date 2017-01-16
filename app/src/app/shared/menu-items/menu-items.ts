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
      {state: 'school', name: 'View Schools'},
      {state: 'teacher', name: 'Add Schools'},
    ]
  },
  {
    state: 'teachers',
    name: 'Teachers',
    type: 'sub',
    icon: 'people',
    children: [
      {state: 'view-teachers', name: 'View Teachers'},
    ]
  },
  {
    state: 'schools',
    name: 'Children',
    type: 'sub',
    icon: 'face',
    children: [
      {state: 'school', name: 'View Children'},
    ]
  },
  {
    state: 'tables',
    name: 'Reports',
    type: 'sub',
    icon: 'format_line_spacing',
    children: [
      {state: 'fullscreen', name: 'Overal Summary'},
      {state: 'editing', name: 'Boys'},
      {state: 'filter', name: 'Girls'},
      {state: 'paging', name: 'County Summary'},
      {state: 'sorting', name: 'Listed Schools'},
      {state: 'pinning', name: 'Listed Teachers'},
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
  },{
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
