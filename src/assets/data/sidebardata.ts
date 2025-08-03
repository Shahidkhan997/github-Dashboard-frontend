import { SideBar } from '@CustomTypes/index';

export const sidebar: SideBar[] = [
  {
    text: 'Dashboard',
    icon: 'dashboard', // Material icon
    link: '/dashboard',
  },
  {
    text: 'Github',
    icon: 'folder', // You can also use 'storage' or 'source'
    link: '/repos',
  },
  {
    text: 'Profile',
    icon: 'person',
    link: '/profile',
  },
];
