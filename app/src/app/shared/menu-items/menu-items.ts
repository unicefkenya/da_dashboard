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
    state: 'schools',
    name: 'Schools',
    type: 'sub',
    icon: 'home',
    children: [
      {state: 'add-schools', name: 'Add Schools'},
      {state: 'view-schools', name: 'View Schools'}
    ]
  },
  {
    state: 'teachers',
    name: 'Teachers',
    type: 'sub',
    icon: 'people',
    children: [
      {state: 'add-teachers', name: 'Add Teachers'},
      {state: 'view-teachers', name: 'View Teachers'},
    ]
  },
  {
    state: 'children',
    name: 'Children',
    type: 'sub',
    icon: 'face',
    children: [
      {state: 'add-children', name: 'Add Children'},
      {state: 'enrollments', name: 'Enrollments'},
      {state: 'view-children', name: 'View Children'},
    ]
  },
  {
    state: 'reports',
    name: 'Reports',
    type: 'sub',
    icon: 'format_line_spacing',
    children: [
      {state: 'overal', name: 'Overal Summary'},
      {state: 'boys', name: 'Boys'},
      {state: 'girls', name: 'Girls'},
      {state: 'county', name: 'County Summary'},
      {state: 'schools', name: 'Listed Schools'},
      {state: 'teachers', name: 'Listed Teachers'},
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
