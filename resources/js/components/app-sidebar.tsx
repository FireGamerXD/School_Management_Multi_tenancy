import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
  BookOpen,
  Folder,
  LayoutGrid,
  Users,
  GraduationCap,
  UserPen,
  Layout,
} from 'lucide-react';
import AppLogo from './app-logo';

// === NAV MENUS ===
const FounderNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { title: 'Gestion d’écoles', href: '/schools', icon: GraduationCap },
  { title: 'Gestion des directeurs', href: '/assign-director', icon: UserPen },
];

const DirectorNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { title: 'Staffs', href: '/staffs', icon: Users },
  { title: 'Groups', href: '/groups', icon: LayoutGrid },
  { title: 'Students', href: '/students', icon: Users },
  { title: 'Levels', href: '/levels', icon: LayoutGrid },
];

const StaffNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { title: 'Students', href: '/students', icon: Users },
  { title: 'Sorties scolaires', href: '/activities', icon: LayoutGrid },
];

const StudentNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  // change this bellow from class details to this
  { title: 'Sortie details', href: '/students/activities', icon: LayoutGrid },
];

const UserNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
];


// === MAIN COMPONENT ===
export function AppSidebar() {
  const { auth } = usePage<SharedData>().props;
  const user = auth?.user;

  let navItems: NavItem[] = [];

  // === Determine allowed navItems based on role and tenant presence ===
  switch (user?.role) {
    case 'Founder':
      navItems = FounderNavItems;
      break;

    case 'Director':
      if (user?.tenant_id) {
        navItems = DirectorNavItems;
      } else {
        return null;
      }
      break;

    case 'Staff':
      if (user?.tenant_id) {
        navItems = StaffNavItems;
      } else {
        return null;
      }
      break;

    case 'Student':
      if (user?.tenant_id) {
        navItems = StudentNavItems;
      } else {
        return null;
      }
      break;

    case 'User':
      navItems = UserNavItems;
      break;

    default:
      return null;
  }

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

