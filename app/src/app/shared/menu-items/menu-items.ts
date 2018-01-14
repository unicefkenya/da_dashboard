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
    access: 'all',
    accessibilitylink: 'teacher',
    accessibilitypadmin: 'partner-admin',
    state: 'home',
    name: 'Home',
    type: 'link',
    icon: 'dashboard'
    /*
    access: 'admin',
    accessibility: 'teacher',
    id: localStorage.getItem('schoolId'),
    state: 'home',
    name: 'Home',
    type: 'link',
    icon: 'dashboard'
    */
  },
  {
    usertype: 'partner',
    state: 'partners',
    name: 'Partners',
    type: 'sub',
    icon: 'extension',
    accessibilitypadmin: 'partner-admin',
    access: 'admin',
    children: [
      {state: 'add-partner', name: 'Add Partners'},
      {state: 'view-partners', name: 'View Partners', access:'partner-admin'}
    ]
  },
  {
    usertype: 'admin',
    state: 'counties',
    name: 'Counties',
    type: 'linkb',
    icon: 'map',
  },
  {
    usertype: 'partner',
    state: 'schools',
    accessibility: 'teacher',
    accessibilitypadmin: 'partner-admin',
    access: 'admin',
    name: 'Schools',
    type: 'sub',
    icon: 'home',
    children: [
      {state: 'add-schools', name: 'Add Schools'},
      {state: 'view-schools', name: 'View Schools', access:'partner-admin'},
      {state: 'attendance-sheets', name: 'Attendance Sheets'}
    ]
  },
  {
    usertype: 'teacher',
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
    usertype: 'teacher',
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
    usertype: 'teacher',
    state: 'promotions',
    paccess: 'teacher',
    name: 'Promote Students',
    type: 'linka',
    icon: 'group_add'
  },
  {
    usertype: 'partner',
    state: 'children',
    name: 'Children',
    access: 'admin',
    accessibilitypadmin:'partner-admin',
    type: 'sub',
    icon: 'face',
    children: [
      {state: 'add-children', name: 'Add Children'},
      {state: 'enrollments', name: 'New Enrollments', access:'partner-admin'},
      {state: 'view-children', name: 'View Children', access:'partner-admin'},
    ]
  },
  /*{
    usertype: 'partner',
    state: 'reports',
    name: 'Reports',
    access: 'admin',
    type: 'sub',
    icon: 'format_line_spacing',
    badge: [
      {type: 'purple', value: '5'}
    ],
    children: [
      {state: 'attendance', name: 'Overall Attendance'},
      {state: 'enrollments', name: 'New Enrollments'},
      {state: 'boys', name: 'Boys Attendance'},
      {state: 'girls', name: 'Girls Attendance'},
      {state: 'dropouts', name: 'Children Dropouts'},
    ]
  },*/
  {
    usertype: 'partner',
    accessibility: 'partner',
    state: 'imports',
    name: 'Import',
    type: 'link',
    icon: 'backup'
  },
  {
    usertype: 'all',
    state: 'reports',
    access: 'all',
    name: 'Settings',
    type: 'sub',
    icon: 'settings',

    children: [
      {state: 'change-password', name: 'Change Password'},
      {state: 'profile', name: 'Profile'},

    ]
  }/*,{
    usertype: 'all',
    access: 'all',
    state: 'help',
    name: 'Help',
    type: 'link',
    icon: 'local_library'
  }*/
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
