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
  usertype: string;
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    usertype: 'all',
    state: 'home',
    name: 'Home',
    type: 'link',
    icon: 'dashboard'
  },
  {
    usertype: 'admin',
    state: 'partners',
    name: 'Partners',
    type: 'sub',
    icon: 'extension',
    children: [
      {state: 'add-partner', name: 'Add Partners'},
      {state: 'view-partners', name: 'View Partners'},
    ]
  },
  {
    usertype: 'admin',
    state: 'counties',
    name: 'Counties',
    type: 'link',
    icon: 'my_location'
  },
  {
    usertype: 'partners',
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
    usertype: 'schools',
    state: 'classes',
    name: 'Classes',
    type: 'sub',
    icon: 'store',
    children: [
      {state: 'add-class', name: 'Add Class'},
      {state: 'view-classes', name: 'View Classes'},
    ]
  },
  {
    usertype: 'schools',
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
    usertype: 'admin',
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
    usertype: 'partners',
    state: 'reports',
    name: 'Reports',
    type: 'sub',
    icon: 'format_line_spacing',
    badge: [
      {type: 'purple', value: '5'}
    ],
    children: [
      {state: 'attendance', name: 'Overal Attendance'},
      {state: 'enrollments', name: 'Enrollments'},
      {state: 'boys', name: 'Boys Attendance'},
      {state: 'girls', name: 'Girls Attendance'},
      {state: 'dropouts', name: 'Children Dropouts'},
    ]
  },
  {
    usertype: 'partners',
    state: 'imports',
    name: 'Import',
    type: 'link',
    icon: 'backup'
  },
  {
    usertype: 'all',
    state: 'reports',
    name: 'Settings',
    type: 'sub',
    icon: 'settings',

    children: [
      {state: 'change-password', name: 'Change Password'},
      {state: 'profile', name: 'Profile'},

    ]
  },{
    usertype: 'all',
    state: 'help',
    name: 'Help',
    type: 'extTabLink',
    icon: 'local_library'
  }
];

@Injectable()
export class MenuItems {
  getadmin(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
