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
    state: 'counties',
    name: 'Counties',
    type: 'link',
    icon: 'my_location'
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
    state: 'imports',
    name: 'Import',
    type: 'link',
    icon: 'backup'
  },
  {
    state: 'reports',
    name: 'Settings',
    type: 'sub',
    icon: 'settings',

    children: [
      {state: 'changepassword', name: 'Change Password'},
      {state: 'profile', name: 'Profile'},

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
